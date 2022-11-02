import State from './State';

export interface RenderFunction {
    (): void;
    el: HTMLElement & {cleanup: () => void;};
}

interface Watchlist {
    [key: string]: State<unknown>
}

interface WatcherOptions {
    debug: string;
    root: boolean;
}

function Watcher<States extends Watchlist, ElementType extends keyof HTMLElementTagNameMap>(
    element: ElementType,
    watchlist: States,
    render: (el: HTMLElementTagNameMap[ElementType], states: States) => void, options?: Partial<WatcherOptions>): Node {
    const el = document.createElement(element) as HTMLElementTagNameMap[ElementType] & {cleanup: () => void;};
    el.cleanup = () => {
        console.log('cleanup', el);
        Object.values(watchlist).forEach(v => v.removeListener(renderFunc));
    };

    let isRenderPrepared = false;

    const renderFunc: RenderFunction = () => {
        if (isRenderPrepared) {
            return el;
        }

        isRenderPrepared = true;

        render && render(el, watchlist);

        isRenderPrepared = false;
        return el;
    };

    renderFunc.el = el;
    Object.values(watchlist).forEach(v => v.addListener(renderFunc));

    if (options?.root) {
        const observer = new MutationObserver((entries) => {
            options?.debug && console.log('debug', options.debug);
            entries.forEach(v => {
                v.removedNodes.forEach(v => {
                    if (v.isConnected) return;
                    (v as unknown as {cleanup: () => void}).cleanup?.();
                });
            });
        });

        observer.observe(el, {childList: true, subtree: true});
    }

    renderFunc();
    return el;
}

export default Watcher;