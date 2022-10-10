import Flex from './common/layout/flex/Flex';
import ListenTest from './common/component/ListenTest';
import Store from './store/Store';
import Layout from "./common/component/layout/Layout";
import styles from "./App.scss";

function App() {
    const container = Flex({classNames: [styles.container], direction: 'column', align: 'center'});
    const hel = Flex({direction: 'column'});
    const hel2 = Flex({direction: 'column'});
    const layout = Layout();

    return (
        layout(
            container(
                hel(
                    '안녕',
                    'ㅋㅋㅋ',
                    hel2('sdfdf'),
                ),
                ...Store.numbers.map(v => ListenTest(v)),
            ),
        )
    );
}

export default App;