import {Children, ComponentOptions} from './Component';
import State from '../../define/State';
import Flex from '../layout/flex/Flex';

interface Options extends ComponentOptions {
    listenBool: State<boolean>;
    listenNumbers: State<number>[];
    listenNumber: State<number>;
}

function ListenTest({listenBool, listenNumbers, listenNumber}: Options) {
    const flex = Flex({listen: [listenBool, listenNumber, ...listenNumbers]});

    return (...children: Children) => flex(() => `${listenBool} and ${listenNumber}`, ...children);
}

export default ListenTest;