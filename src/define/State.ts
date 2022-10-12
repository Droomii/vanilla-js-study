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
    private _effects: PrepareRenderFunc[] = [];
    constructor(
        private _value: T,
        private _toString = (val: T) => String(val)
    ) {
    }

    set(val: T | ((val: T) => T)) {
        const value = isFunction(val) ? val(this._value) : val;

        if (this._value === value) return;
        this._value = value;
        this._effects = this._effects.filter(v => v.el.isConnected);
        Promise.all(this._effects.map(v => v()))
            .then(v => v.forEach(v => v && v()));
    }

    get value() {
        return this._value;
    }

    addEffect(...effects: PrepareRenderFunc[]) {
        effects.forEach(v => {
            if (this._effects.includes(v)) return;
            this._effects.push(v);
        });
    }

    removeEffect(effect: PrepareRenderFunc) {
        const idx = this._effects.indexOf(effect);
        if (idx > -1) {
            this._effects.splice(idx, 1);
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