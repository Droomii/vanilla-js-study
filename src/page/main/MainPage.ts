import Flex from "../../common/layout/flex/Flex";
import styles from "../../App.scss";
import Store from '../../store/Store';
import ListenTest from '../../common/component/ListenTest';

function MainPage() {
    const container = Flex({classNames: [styles.container], direction: 'column', align: 'center'});
    const hel = Flex({direction: 'column'});

    return container(
        hel('메인메뉴 입니다.'),
        ...Store.numbers.map(v => ListenTest(v))
    );
}

export default MainPage;