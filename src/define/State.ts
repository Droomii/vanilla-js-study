import {PrepareRenderFunc} from '../common/component/Component';

const isFunction = <T>(val: T | ((val: T) => T)): val is (val: T) => T => {
    return typeof val === 'function';
};

export interface StateFormat<T> {
    formatFunc: (val: T) => string | Node;
    state: State<T>;
    render(): string | Node;
    toString(): string;
}

class State<T> {
    private _listeners: PrepareRenderFunc[] = [];
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
            console.warn('DOM lead detected.');
        }
        this._listeners = this._listeners.filter(v => v.el.isConnected);
        Promise.all(this._listeners.map(v => v()))
            .then(v => v.forEach(v => v && v()));
    }

    get value() {
        return this._value;
    }

    addListener(...effects: PrepareRenderFunc[]) {
        effects.forEach(v => {
            if (this._listeners.includes(v)) return;
            this._listeners.push(v);
        });
    }

    removeListener(effect: PrepareRenderFunc) {
        const idx = this._listeners.indexOf(effect);
        if (idx > -1) {
            this._listeners.splice(idx, 1);
        }
    }

    toString() {
        return this._toString(this._value);
    }

    format(formatFunc: (val: T) => string | Node): StateFormat<T> {
        return {
            state: this,
            formatFunc,
            render: () => formatFunc(this._value),
            toString: () => String(formatFunc(this._value))
        };
    }
}

export default State;