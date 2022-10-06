import Flex from './common/layout/flex/Flex';
import Button from './common/component/Button';
import State from './define/State';
import ListenTest from './common/component/ListenTest';
import Store from './store/Store';

function App() {
    const bool = new State(false);
    const listenNumbers = Array(10).fill(0).map((v, i) => new State(i));
    const container = Flex({justify: 'center', direction: 'column', align: 'center'});
    const hel = Flex({direction: 'column'});
    const hel2 = Flex({direction: 'column'});

    return container(
        hel(
            '안녕',
            'ㅋㅋㅋ',
            hel2('sdfdf')
        ),
        ...Store.numbers.map(v => ListenTest(v))
    );
}

export default App;