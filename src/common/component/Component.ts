import State, {StateFormat} from '../../define/State';
import {Observant} from "../../define/observant";

export interface ComponentOptions<Methods = {}> {
    classNames?: (string | StateFormat<unknown>)[];
    onRender?: (el: HTMLElement) => void;
    onMount?: (el: HTMLElement) => void;
    onUnmount?: (el: HTMLElement) => void;
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

type DestroyableElement<T extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[T] & {cleanup: () => void}

export interface ComponentRenderer<T extends keyof HTMLElementTagNameMap, Methods> {
    (...children: Children): DestroyableElement<T> & Methods
}

function Component<T extends keyof HTMLElementTagNameMap, Methods>(tag: T, options?: ComponentOptions<Methods>): ComponentRenderer<typeof tag, Methods> {
    const debug = options?.debug ?? '';

    return (...children) => {
        const el: DestroyableElement<T> = document.createElement(tag) as DestroyableElement<T>;
        const onUnmount = options?.onUnmount;
        el.cleanup = () => {
            debug && console.log('destroy', debug);
            listeningStates.forEach(v => v.removeListener(prepareRender));
            children.forEach(v => (v as DestroyableElement<T>).cleanup?.());
            onUnmount && onUnmount(el);
        };

        const listeningStates = new Set<State<unknown>>();
        let isRenderPrepared = false;

        const render: RenderFunc = () => {
            debug && console.log('render', debug);
            if (options) {
                const {classNames, onRender, methods, onMount, onUnmount} = options;
                if (classNames) {
                    el.className = classNames
                        .filter(v => v)
                        .map(v => {
                            if (typeof v !== 'string') {
                                v.state.addListener(prepareRender);
                                listeningStates.add(v.state);
                            }
                            return String(v);
                        })
                        .filter(v => v).join(' ');
                }
                !el.isConnected && onMount && onMount(el);
                onRender && onRender(el);
                debug && el.classList.add(`debug-${debug}`);
                methods && Object.assign(el, methods);
            }
            el.replaceChildren(...children.map(v => {
                if (typeof v === 'function') return v();
                if (v instanceof State) {
                    listeningStates.add(v);
                    v.addListener(prepareRender);
                    return v.toString();
                }

                if (typeof v === 'string') {
                    return v;
                }

                if ('states' in v) {
                    v.states.forEach(v => {
                        listeningStates.add(v);
                        v.addListener(prepareRender);
                    });
                    return v.strings.map((str, i) => str + (v.states[i] ?? '')).join('');
                }

                if ('formatFunc' in v) {
                    listeningStates.add(v.state);
                    v.state.addListener(prepareRender);
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

                v.addListener(prepareRender);
            });
        }

        render();
        const observer = new MutationObserver((mutation) => {
            mutation.forEach(v => {
                v.removedNodes.forEach(v => {
                    (v as DestroyableElement<T>).cleanup?.();
                });
            });
        });

        options?.root && observer.observe(el, {subtree: true, childList: true});
        return el as DestroyableElement<T> & Methods;
    };
}

export default Component;