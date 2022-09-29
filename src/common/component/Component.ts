export interface ComponentOptions {
    classNames?: string[];
    optionHandler?: (el: HTMLElement) => void;
}

function Component<O = unknown>(tag: keyof HTMLElementTagNameMap, options?: ComponentOptions & O) {

    return (...children: (string | Node)[]) => {
        const el = document.createElement(tag);

        if (options) {
            const {classNames, optionHandler} = options;
            if (classNames) {
                el.className = classNames.join(' ');
            }

            optionHandler && optionHandler(el);
        }

        el.append(...children);
        return el;
    };
}

export default Component;