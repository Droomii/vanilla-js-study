import styles from './index.scss';
import {createElement, h} from './define/createElement';

const el = createElement(
    h('div', {}, '하이'
    )
);

document.body.appendChild(el);
