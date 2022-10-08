import Component, {ComponentOptions} from './Component';

interface Options extends ComponentOptions {
    onClick?(e: MouseEvent): void;
}

function Button(options?: Options) {
    return Component('button', {
        ...options,
        optionHandler(el) {
            if (options) {
                const {onClick} = options;
                onClick && el.addEventListener('click', onClick);
            }
        }
    });
}

export default Button;