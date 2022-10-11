import State from '../define/State';

class Store {
    readonly activeMenu = new State(location.pathname);
    readonly numbers = Array(10).fill(0).map((v, i) => new State(i));
    constructor() {
    }
}

export default new Store();