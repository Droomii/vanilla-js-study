import {ComponentRenderer} from "../Component";
import Flex from "../../layout/flex/Flex";
import styles from "./Layout.scss";
import LNB from "../lnb/LNB";

function Layout(): ComponentRenderer<'div', {}> {
    const body = Flex({classNames: [styles.layout]});
    const content = Flex({classNames: [styles.content]});
    const lnb = LNB({
        menus: [
            {name: '메인', url: '/main'},
            {name: '메뉴1', url: '/menu1'},
            {name: '메뉴2', url: '/menu2'},
        ],
    });

    return (...children) => body(
        lnb,
        content(...children),
    );
}

export default Layout;