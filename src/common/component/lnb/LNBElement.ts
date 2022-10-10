import Flex from "../../layout/flex/Flex";
import styles from "./LNB.scss";
import Store from "../../../store/Store";

function LNBElement(menuName: string) {
    const {activeMenu} = Store;
    const wrap = Flex({
        classNames: [
            styles.menu,
            activeMenu.format(val => menuName === val ? styles.active : '')
        ],
        optionHandler: el => {
            el.addEventListener('click', () => {
                activeMenu.set(menuName);
            });
        },
    });

    return wrap(menuName);
}

export default LNBElement;