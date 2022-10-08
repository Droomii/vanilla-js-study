import State, {StateFormat} from '../../define/State';
import {Observant} from "../../define/observant";

export interface ComponentOptions<Methods = {}> {
    classNames?: string[];
    optionHandler?: (el: HTMLElement) => void;
    methods?: Methods;
    listen?: State<unknown>[];
}

type ChildNode = string | Node;
export type Children = (ChildNode | (() => ChildNode) | State<unknown> | Observant | StateFormat<unknown>)[];
export type RenderFunc =  () => void;
export type PrepareRenderFunc =  () => Promise<undefined | RenderFunc>

interface ComponentRenderer<T extends keyof HTMLElementTagNameMap, Methods> {
    (...children: Children): HTMLElementTagNameMap[T] & Methods;
}

function Component<Methods>(tag: keyof HTMLElementTagNameMap, options?: ComponentOptions<Methods>): ComponentRenderer<typeof tag, Methods> {
    let count = 0;
    return (...children) => {
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
            el.replaceChildren(...children.map(v => {
                if (typeof v === 'function') return v();
                if (v instanceof State) {
                    v.addEffect(prepareRender);
                    return v.toString();
                }

                if (typeof v === 'string') {
                    return v;
                }

                if ('states' in v) {
                    v.states.forEach(v => v.addEffect(prepareRender));
                    return v.strings.map((str, i) => str + (v.states[i] ?? '')).join('');
                }

                if ('formatFunc' in v) {
                    v.state.addEffect(prepareRender);
                    return v.formatFunc(v.state.value);
                }

                return v;
            }), String(count++));
            isRenderPrepared = false;
        };

        const prepareRender: PrepareRenderFunc = async () => {
            if (isRenderPrepared) {
                return;
            }
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