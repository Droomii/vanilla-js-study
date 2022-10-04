class State<T> {
    private readonly _effects: ((val: T) => void)[] = [];
    constructor(private _value: T) {
    }

    set(val: T) {
        if (this._value === val) return;
        this._value = val;
        this._effects.forEach(v => v(val));
    }

    get value() {
        return this._value;
    }

    addEffect(...effects: ((val: T) => void)[]) {
        this._effects.push(...effects);
    }
}

export default State;