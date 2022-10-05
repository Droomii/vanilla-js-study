import State from '../../define/State';

export interface ComponentOptions<Methods = {}> {
    classNames?: string[];
    optionHandler?: (el: HTMLElement) => void;
    methods?: Methods;
    listen?: State<unknown>[];
}

type ChildNode = string | Node;
export type Children = (ChildNode | (() => ChildNode))[];


function Component<Methods>(tag: keyof HTMLElementTagNameMap, options?: ComponentOptions<Methods>) {
    let count = 0;
    return (...children: Children): HTMLElementTagNameMap[typeof tag] & Methods => {
        const el = document.createElement(tag);
        let isRendering = false;
        const unlock = () => {
            isRendering = false;
        };

        const render = async () => {
            if (!isRendering) {
                isRendering = true;
                if (options) {
                    const {classNames, optionHandler, methods} = options;
                    if (classNames) {
                        el.className = classNames.join(' ');
                    }

                    optionHandler && optionHandler(el);
                    methods && Object.assign(el, methods);
                }
                el.replaceChildren(...children.map(v => typeof v === 'function' ? v() : v), String(count++));
            }

            return unlock;
        };

        if (options?.listen) {
            options.listen.forEach(v => v.addEffect(render));
        }

        render().then(unlock);

        return el as HTMLElementTagNameMap[typeof tag] & Methods;
    };
}

export default Component;