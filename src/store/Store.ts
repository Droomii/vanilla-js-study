import State from '../define/State';

class Store {
    readonly numberState = new State(1);
    readonly numbers = Array(10).fill(0).map((v, i) => new State(i));
}

export default new Store();