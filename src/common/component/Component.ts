import State, {StateFormat} from '../../define/State';
import {Observant} from "../../define/observant";

export interface ComponentOptions<Methods = {}> {
    classNames?: (string | StateFormat<unknown>)[];
    optionHandler?: (el: HTMLElement) => void;
    methods?: Methods;
    listen?: State<unknown>[];
    debug?: string;
    root?: boolean;
}

type ChildNode = string | Node;
export type Child = ChildNode | (() => ChildNode) | State<unknown> | Observant | StateFormat<unknown>
export type Children = Child[];
export type RenderFunc =  () => void;
export interface PrepareRenderFunc<T extends HTMLElement = HTMLElement> {
    (): Promise<undefined | RenderFunc>
    el: T;
}

type DestroyableElement<T extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[T] & {destroy: () => void}

export interface ComponentRenderer<T extends keyof HTMLElementTagNameMap, Methods> {
    (...children: Children): DestroyableElement<T> & Methods
}

function Component<T extends keyof HTMLElementTagNameMap, Methods>(tag: T, options?: ComponentOptions<Methods>): ComponentRenderer<typeof tag, Methods> {
    const debug = options?.debug ?? '';

    return (...children) => {
        const el: DestroyableElement<T> = document.createElement(tag) as DestroyableElement<T>;
        el.destroy = () => {
            states.forEach(v => v.removeEffect(prepareRender));
            children.forEach(v => (v as DestroyableElement<T>).destroy?.());
        };

        const states = new Set<State<unknown>>();
        let isRenderPrepared = false;

        const render: RenderFunc = () => {
            if (options) {
                const {classNames, optionHandler, methods} = options;
                if (classNames) {
                    el.className = classNames
                        .filter(v => v)
                        .map(v => {
                            if (typeof v !== 'string') {
                                v.state.addEffect(prepareRender);
                                states.add(v.state);
                            }
                            return String(v);
                        })
                        .filter(v => v).join(' ');
                }

                optionHandler && optionHandler(el);
                methods && Object.assign(el, methods);
            }
            el.replaceChildren(...children.map(v => {
                if (typeof v === 'function') return v();
                if (v instanceof State) {
                    states.add(v);
                    v.addEffect(prepareRender);
                    return v.toString();
                }

                if (typeof v === 'string') {
                    return v;
                }

                if ('states' in v) {
                    v.states.forEach(v => {
                        states.add(v);
                        v.addEffect(prepareRender);
                    });
                    return v.strings.map((str, i) => str + (v.states[i] ?? '')).join('');
                }

                if ('formatFunc' in v) {
                    states.add(v.state);
                    v.state.addEffect(prepareRender);
                    return v.formatFunc(v.state.value);
                }

                return v;
            }));
            isRenderPrepared = false;
        };

        const prepareRender: PrepareRenderFunc<typeof el> = async () => {
            if (isRenderPrepared) {
                return;
            }
            isRenderPrepared = true;
            return render;
        };

        prepareRender.el = el;

        if (options?.listen) {

            options.listen.forEach(v => {

                v.addEffect(prepareRender);
            });
        }

        render();
        const observer = new MutationObserver((a, b) => {
            a.forEach(v => {
                v.removedNodes.forEach(v => {
                    (v as DestroyableElement<T>).destroy?.();
                });
            });
        });

        options?.root && observer.observe(el, {subtree: true, childList: true});
        return el as DestroyableElement<T> & Methods;
    };
}

export default Component;