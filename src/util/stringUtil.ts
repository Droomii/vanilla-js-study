export function toKebab(str: string) {
    return str.replace(/[A-Z]/g, '-$&'.toLowerCase());
}

export function stringifyCSS(css: Partial<CSSStyleDeclaration>) {
    return Object.entries(css).map(([attr, value]) => `${attr}: ${String(value)}`).join(';');
}
