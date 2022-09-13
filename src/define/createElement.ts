
interface Node<T extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap> {
    type: T;
    props: Partial<HTMLElementTagNameMap[T]>;
    children: Node[];
}

export function h<T extends keyof HTMLElementTagNameMap>(
    type: T,
    props: Partial<HTMLElementTagNameMap[T]>, ...children: Node[]): Node<T> {
    return { type, props, children: children.flat() };
}

export function createElement(node: ReturnType<typeof h>) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);

    Object.entries(node.props)
        .filter(([, value]) => value)
        .forEach(([attr, value]) => $el.setAttribute(attr, value));

    node.children.map(createElement)
        .forEach(child => $el.appendChild(child));
    return $el;
}