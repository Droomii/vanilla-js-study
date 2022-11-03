import State from './State';

export interface UpdateFunction<ElementType extends keyof HTMLElementTagNameMap> {
    (): void;
    el: HTMLElementTagNameMap[ElementType] & {cleanup: () => void;};
}

interface Watchlist {
    [key: string]: State<unknown>
}

interface RenderFunction<States extends Watchlist, ElementType extends keyof HTMLElementTagNameMap> {
    (el: HTMLElementTagNameMap[ElementType], states: States): void;
}

interface WatcherOptions<States extends Watchlist, ElementType extends keyof HTMLElementTagNameMap> {
    debug: string;
    root: boolean;
    onMount: RenderFunction<States, ElementType>;
    onUnmount: RenderFunction<States, ElementType>;
}

function Watcher<States extends Watchlist, ElementType extends keyof HTMLElementTagNameMap>(
    element: ElementType,
    watchlist: States,
    render: RenderFunction<States, ElementType>, options?: Partial<WatcherOptions<States, ElementType>>): () => Node {

    const initialize = () => {
        const el: UpdateFunction<ElementType>['el'] = document.createElement(element) as UpdateFunction<ElementType>['el'];
        options?.onMount?.(el, watchlist);

        el.cleanup = () => {
            options?.debug && console.log('cleanup :', options.debug);
            options?.onUnmount?.(el, watchlist);
            el.childNodes.forEach(v => {
                (v as UpdateFunction<ElementType>['el']).cleanup?.();
            });
            Object.values(watchlist).forEach(v => v.removeListener(updateFunc));
        };

        let isRenderPrepared = false;

        const updateFunc: UpdateFunction<ElementType> = () => {
            if (isRenderPrepared) {
                return el;
            }

            isRenderPrepared = true;

            render && render(el, watchlist);

            isRenderPrepared = false;
            return el;
        };

        updateFunc.el = el;
        Object.values(watchlist).forEach(v => v.addListener(updateFunc));

        if (options?.root) {
            const observer = new MutationObserver((entries) => {
                options?.debug && console.log('child list change', options.debug);
                entries.forEach(v => {
                    v.removedNodes.forEach(v => {
                        if (v.isConnected) return;
                        (v as UpdateFunction<ElementType>['el']).cleanup?.();
                    });
                });
            });

            observer.observe(el, {childList: true, subtree: true});
        }

        updateFunc();
        return el;
    };

    return initialize;
}

export default Watcher;