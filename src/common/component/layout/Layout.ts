import {ComponentRenderer} from "../Component";
import Flex from "../../layout/flex/Flex";
import styles from "./Layout.scss";
import LNB from "../lnb/LNB";

function Layout(): ComponentRenderer<'div', {}> {
    const body = Flex({classNames: [styles.layout]});
    const content = Flex({classNames: [styles.content]});
    const lnb = LNB({menus: ['메인', '메뉴', '아무메뉴']});

    return (...children) => body(
        lnb,
        content(...children),
    );
}

export default Layout;