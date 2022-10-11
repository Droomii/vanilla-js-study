import Flex from "../../common/layout/flex/Flex";
import styles from "../../App.scss";

function MainPage() {
    const container = Flex({classNames: [styles.container], direction: 'column', align: 'center'});
    const hel = Flex({direction: 'column'});

    return container(
        hel('메인메뉴 입니다.'),
    );
}

export default MainPage;