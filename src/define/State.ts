import {UpdateFunction} from './Watcher';

const isFunction = <T>(val: T | ((val: T) => T)): val is (val: T) => T => {
    return typeof val === 'function';
};

class State<T> {
    private _listeners: UpdateFunction<any>[] = [];

    constructor(
        private _value: T,
        private _toString = (val: T) => String(val)
    ) {
    }

    set(val: T | ((val: T) => T)) {
        const value = isFunction(val) ? val(this._value) : val;

        if (this._value === value) return;
        this._value = value;
        if (this._listeners.some(v => !v.el.isConnected)) {
            console.warn('DOM leak detected.');
        }
        this._listeners = this._listeners.filter(v => v.el.isConnected);
        Promise.all(this._listeners.map(v => v()));
    }

    get value() {
        return this._value;
    }

    addListener(...effects: UpdateFunction<any>[]) {
        effects.forEach(v => {
            if (this._listeners.includes(v)) return;
            this._listeners.push(v);
        });
    }

    removeListener(effect: UpdateFunction<any>) {
        const idx = this._listeners.indexOf(effect);
        if (idx > -1) {
            this._listeners.splice(idx, 1);
        }
    }

    toString() {
        return this._toString(this._value);
    }
}

export default State;