class State<T> {
    private readonly _effects: (() => Promise<() => void>)[] = [];

    constructor(private _value: T) {
    }

    set(val: T) {
        if (this._value === val) return;
        this._value = val;
        Promise.all(this._effects.map(v => v()))
            .then(v => v.map(v => v()));
    }

    get value() {
        return this._value;
    }

    addEffect(...effects: (() => Promise<() => void>)[]) {
        this._effects.push(...effects);
    }

    toString() {
        return String(this._value);
    }
}

export default State;