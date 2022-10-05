import {PrepareRenderFunc} from '../common/component/Component';

class State<T> {
    private readonly _effects: PrepareRenderFunc[] = [];

    constructor(private _value: T) {
    }

    set(val: T) {
        if (this._value === val) return;
        this._value = val;
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
        return String(this._value);
    }
}

export default State;