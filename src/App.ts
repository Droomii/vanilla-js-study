import Flex from './common/layout/flex/Flex';

function App() {
    const container = Flex({justify: 'center', direction: 'column', align: 'center'});
    const hel = Flex();

    return container(
        hel('안녕'),
        hel('하세요')
    );
}

export default App;