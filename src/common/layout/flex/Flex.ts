import styles from "./Flex.scss";
import Component, {ComponentOptions} from '../../component/Component';

interface IFlexOptions extends ComponentOptions {
    reverse?: boolean;
    direction?: 'row' | 'column';
    align?: 'center' | 'start' | 'end';
    justify?: 'center' | 'start' | 'end';
}

function Flex(options?: IFlexOptions) {
    const render = Component('div', {
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
        }
    });

    const saySomething = (something: string) => {
        console.log(something);
    };

    return Object.assign(render, {saySomething});
}

export default Flex;