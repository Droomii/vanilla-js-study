import {Children, ComponentOptions} from './Component';
import State from '../../define/State';
import Flex from '../layout/flex/Flex';

interface Options extends ComponentOptions {
    listenBool: State<boolean>;
    listenNumber: State<number>;
}

function ListenTest({listenBool, listenNumber}: Options) {
    const flex = Flex({listen: [listenBool, listenNumber]});

    return (...children: Children) => flex(`${listenBool} and ${listenNumber}`, ...children);
}

export default ListenTest;