import styles from "./Flex.scss";
import Component, {ComponentOptions} from '../../component/Component';

interface IFlexOptions extends ComponentOptions {
    reverse?: boolean;
    direction?: 'row' | 'column';
    align?: 'center' | 'start' | 'end';
    justify?: 'center' | 'start' | 'end';
}

interface IFlexMethods {
    saySomething(something: string): void;
}

function Flex(options?: IFlexOptions) {
    return Component<IFlexMethods>('div', {
        ...options,
        classNames: [...options?.classNames || [], styles.flex],
        optionHandler: (el) => {
            options && Object.entries(options).forEach(([attr, value]) => {
                if (typeof value === 'boolean' && value) {
                    el.classList.add(styles[attr]);
                    return;
                }

                value && el.classList.add(styles[`${attr}-${value}`]);
            });
        },
        methods: {
            saySomething(this: HTMLDivElement, something: string) {
                this.innerHTML = something;
            }
        }
    });
}

export default Flex;