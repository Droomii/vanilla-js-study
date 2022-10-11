import Flex from "../../layout/flex/Flex";
import styles from "./LNB.scss";
import Store from "../../../store/Store";
import {MenuElement} from "./LNB";

function LNBElement({name, url}: MenuElement) {
    const {activeMenu} = Store;

    const handleClick = () => {
        window.history.pushState({}, '', `${url}`);
        activeMenu.set(url);
    };

    const wrap = Flex({
        classNames: [
            styles.menu,
            activeMenu.format(val => url === val ? styles.active : ''),
        ],
        optionHandler: el => {
            el.addEventListener('click', handleClick);
        },
    });

    return wrap(name);
}

export default LNBElement;