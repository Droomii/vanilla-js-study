import State from '../../define/State';

export interface ComponentOptions<Methods = {}> {
    classNames?: string[];
    optionHandler?: (el: HTMLElement) => void;
    methods?: Methods;
    listen?: State<unknown>[];
}

type ChildNode = string | Node;
export type Children = (ChildNode | (() => ChildNode))[];
export type RenderFunc =  () => void;
export type PrepareRenderFunc =  () => Promise<undefined | RenderFunc>

function Component<Methods>(tag: keyof HTMLElementTagNameMap, options?: ComponentOptions<Methods>) {
    let count = 0;
    return (...children: Children): HTMLElementTagNameMap[typeof tag] & Methods => {
        const el = document.createElement(tag);
        let isRenderPrepared = false;
        const render: RenderFunc = () => {
            if (options) {
                const {classNames, optionHandler, methods} = options;
                if (classNames) {
                    el.className = classNames.join(' ');
                }

                optionHandler && optionHandler(el);
                methods && Object.assign(el, methods);
            }
            el.replaceChildren(...children.map(v => typeof v === 'function' ? v() : v), String(count++));
            isRenderPrepared = false;
        };

        const prepareRender: PrepareRenderFunc = async () => {
            if (isRenderPrepared) return;
            isRenderPrepared = true;
            return render;
        };

        if (options?.listen) {
            options.listen.forEach(v => v.addEffect(prepareRender));
        }

        render();

        return el as HTMLElementTagNameMap[typeof tag] & Methods;
    };
}

export default Component;