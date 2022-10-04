import Flex from './common/layout/flex/Flex';
import Button from './common/component/Button';
import State from './define/State';

function App() {
    const bool = new State(false);
    const container = Flex({justify: 'center', direction: 'column', align: 'center'});
    const hel = Flex();
    const haseyo = hel('하세요');
    haseyo.listen(bool, (val) => {
        haseyo.innerText = val ? '트루' : '폴스';
    });

    const button = Button({
        onClick() {
            bool.set(!bool.value);
        }
    })('클릭해보세요');

    return container(
        hel('안녕', 'ㅋㅋㅋ', hel('sdfdf')),
        haseyo,
        button
    );
}

export default App;