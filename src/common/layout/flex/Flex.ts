import styles from "./Flex.scss";
import Component, {ComponentOptions} from '../../component/Component';

interface IFlexOptions extends ComponentOptions {
    reverse?: boolean;
    direction?: 'row' | 'column';
    align?: 'center' | 'start' | 'end';
    justify?: 'center' | 'start' | 'end';
}

function Flex(options?: IFlexOptions) {
    const flexClasses: string[] = [];

    options && Object.entries(options).forEach(([attr, value]) => {
        if (typeof value === 'boolean' && value) {
            flexClasses.push(styles[attr]);
            return;
        }

        value && flexClasses.push(styles[`${attr}-${value}`]);

    });

    return Component('div', {
        ...options,
        classNames: [...options?.classNames || [], styles.flex, ...flexClasses],
    });
}

export default Flex;