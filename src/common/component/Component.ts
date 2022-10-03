export interface ComponentOptions<Methods = {}> {
    classNames?: string[];
    optionHandler?: (el: HTMLElement) => void;
    methods?: Methods;
}

function Component<Methods>(tag: keyof HTMLElementTagNameMap, options?: ComponentOptions<Methods>) {

    return (...children: (string | Node)[]): HTMLElementTagNameMap[typeof tag] & Methods => {
        const el = document.createElement(tag);

        if (options) {
            const {classNames, optionHandler, methods} = options;
            if (classNames) {
                el.className = classNames.join(' ');
            }

            optionHandler && optionHandler(el);
            methods && Object.assign(el, methods);
        }

        el.append(...children);
        return el as HTMLElementTagNameMap[typeof tag] & Methods;
    };
}

export default Component;