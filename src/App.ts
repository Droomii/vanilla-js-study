import Flex from './common/layout/flex/Flex';
import Button from './common/component/Button';
import State from './define/State';
import ListenTest from './common/component/ListenTest';

function App() {
    const bool = new State(false);
    const listenNumber = new State(0);
    const listenNumbers = Array(10).fill(0).map((v, i) => new State(i));
    const container = Flex({justify: 'center', direction: 'column', align: 'center'});
    const hel = Flex({direction: 'column'});
    const hel2 = Flex({direction: 'column'});
    const listen = ListenTest({listenBool: bool, listenNumbers, listenNumber});

    const button = Button({
        async onClick() {
            listenNumbers.forEach(v => v.set(v.value + 1));
            listenNumber.set(listenNumber.value + 1);
            bool.set(!bool.value);
        }
    })('클릭해보세요');

    return container(
        hel(
            '안녕',
            'ㅋㅋㅋ',
            hel2('sdfdf')
        ),
        listen('리슨 테스트'),
        button
    );
}

export default App;