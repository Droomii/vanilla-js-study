import {PrepareRenderFunc} from '../common/component/Component';

const isFunction = <T>(val: T | ((val: T) => T)): val is (val: T) => T => {
    return typeof val === 'function';
};

export interface StateFormat<T> {
    formatFunc: (val: T) => string;
    state: State<T>;
}

class State<T> {
    private readonly _effects: PrepareRenderFunc[] = [];
    constructor(
        private _value: T,
        private _toString = (val: T) => String(val)
    ) {}

    set(val: T | ((val: T) => T)) {
        const value = isFunction(val) ? val(this._value) : val;

        if (this._value === value) return;
        this._value = value;
        Promise.all(this._effects.map(v => v()))
            .then(v => v.forEach(v => v && v()));
    }

    get value() {
        return this._value;
    }

    addEffect(...effects: PrepareRenderFunc[]) {
        this._effects.push(...effects);
    }

    toString() {
        return this._toString(this._value);
    }

    format(formatFunc: (val: T) => string): StateFormat<T> {
        return {state: this, formatFunc};
    }
}

export default State;