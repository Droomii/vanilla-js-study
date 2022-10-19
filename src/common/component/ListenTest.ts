import Flex from '../layout/flex/Flex';
import Button from './Button';
import State from '../../define/State';

function ListenTest(num: State<number>) {
    let clicked = new State(false);
    const flex = Flex({listen: {clicked, num}});
    const button = Button({
        onClick() {
            clicked.set(true);
            num.set(val => val + 1);
        },
    });

    return flex(
        num.format(val => `number : ${val}`),
        button(clicked.format(val => val ? '클릭됨' : '클릭해보세요'))
    );
}

export default ListenTest;