import Flex from './common/layout/flex/Flex';

function App() {
    const container = Flex({justify: 'center', direction: 'column', align: 'center'});
    const hel = Flex();

    const haseyo = hel('하세요');
    haseyo.saySomething('<div style="color:red">whattttttt</div>');

    return container(
        hel('안녕', 'ㅋㅋㅋ', hel('sdfdf')),
        haseyo
    );
}

export default App;