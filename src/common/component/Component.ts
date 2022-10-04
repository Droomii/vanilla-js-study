import State from '../../define/State';

interface ComponentMethods {
    listen<T>(state: State<T>, effect: (val: T) => void): void;
}

export interface ComponentOptions<Methods = ComponentMethods> {
    classNames?: string[];
    optionHandler?: (el: HTMLElement) => void;
    methods?: Methods;
}

function Component<Methods>(tag: keyof HTMLElementTagNameMap, options?: ComponentOptions<Methods>) {

    return (...children: (string | Node)[]): HTMLElementTagNameMap[typeof tag] & Methods & ComponentMethods => {
        const el = document.createElement(tag);

        const listen = function<T>(state: State<T>, effect: (val: T) => void) {
            state.addEffect(effect);
        };

        Object.defineProperty(el, 'listen', {value: listen });

        if (options) {
            const {classNames, optionHandler, methods} = options;
            if (classNames) {
                el.className = classNames.join(' ');
            }

            optionHandler && optionHandler(el);
            methods && Object.assign(el, methods);
        }

        el.append(...children);
        return el as HTMLElementTagNameMap[typeof tag] & Methods & ComponentMethods;
    };
}

export default Component;