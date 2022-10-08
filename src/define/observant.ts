import State from "./State";

export interface Observant {
    strings: TemplateStringsArray;
    states: State<unknown>[];
}

function observant(strings: TemplateStringsArray, ...states: State<unknown>[]): Observant {
    return {strings, states};
}

export default observant;