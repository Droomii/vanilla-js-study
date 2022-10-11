import {ComponentOptions} from "../Component";
import Flex from "../../layout/flex/Flex";
import styles from "./LNB.scss";
import LNBElement from "./LNBElement";

export interface MenuElement {
    name: string;
    url: string;
}

interface LNBOptions extends ComponentOptions {
    menus: MenuElement[];
}

function LNB(options: LNBOptions) {
    const wrap = Flex({classNames: [styles.lnb], direction: 'column'});

    return wrap(...options.menus.map(v => LNBElement(v)));
}

export default LNB;