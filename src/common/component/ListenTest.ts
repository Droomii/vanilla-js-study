import {Children, ComponentOptions} from './Component';
import State from '../../define/State';
import Flex from '../layout/flex/Flex';

interface Options extends ComponentOptions {
    listenBool: State<boolean>;
    listenNumbers: State<number>[];
}

function ListenTest({listenBool, listenNumbers}: Options) {
    const flex = Flex({listen: [listenBool, ...listenNumbers]});

    return (...children: Children) => flex(() => `${listenBool} and ${listenNumbers.at(-1)}`, ...children);
}

export default ListenTest;