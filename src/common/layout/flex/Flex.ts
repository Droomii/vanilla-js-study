import styles from "./Flex.scss";

interface FlexOptions {
    reverse: boolean;
    direction: 'row' | 'column';
    align: 'center' | 'start' | 'end';
    justify: 'center' | 'start' | 'end';
}

function Flex(options?: Partial<FlexOptions>) {
    return (...children: (string | Node)[]) => {
        const el = document.createElement('div');
        el.classList.add(styles.flex);
        options && Object.entries(options).forEach(([attr, value]) => {
            if (typeof value === 'boolean' && value) {
                el.classList.add(styles[attr]);
                return;
            }

            value && el.classList.add(styles[`${attr}-${value}`]);
        });
        el.append(...children);
        return el;
    };
}

export default Flex;