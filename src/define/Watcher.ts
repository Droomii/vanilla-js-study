import State from './State';

export interface RenderFunction {
    (): void;
    el: HTMLElement;
}

function Watcher<States extends Record<string, State<unknown>>, ElementType extends keyof HTMLElementTagNameMap>(
    element: ElementType,
    watchlist: States,
    render: (el: HTMLElementTagNameMap[ElementType], states: States) => void): Node {
    const el = document.createElement(element);
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

    renderFunc();
    return el;
}

export default Watcher;