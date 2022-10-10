import State from '../define/State';

class Store {
    readonly activeMenu = new State('아무메뉴');
    readonly numbers = Array(10).fill(0).map((v, i) => new State(i));
}

export default new Store();