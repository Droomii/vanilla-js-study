import Flex from '../layout/flex/Flex';
import Store from '../../store/Store';
import Button from './Button';
import State from '../../define/State';

function ListenTest(num: State<number>) {
    const flex = Flex({listen: [num]});
    let clicked = false;
    const button = Button({
        async onClick() {
            clicked = true;
            num.set(val => val + 1);
        },
    });

    return flex(() => `number : ${num} `, () => button((clicked ? '클릭됨' : '클릭해보세요')));
}

export default ListenTest;