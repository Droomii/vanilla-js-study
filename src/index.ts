import styles from './style.module.scss';

function component() {
    const element: HTMLDivElement = document.createElement('div');

    element.innerHTML = 'Hello World';
    element.className = styles.component;
    return element;
}

document.body.appendChild(component());
