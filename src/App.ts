import Store from './store/Store';
import Watcher from './define/Watcher';

function App() {
    const {activeMenu, numbers} = Store;

    const buttons = numbers.map(num => {
        const onClick = () => {
            num.set(v => v + 1);
        };

        const hi = Watcher('div', {}, (el) => {
            el.replaceChildren(num.value < 3 ? 'hi!!' : '');
        }, {debug: 'hi'});

        return Watcher('button', {num}, (el, {num}) => {
            const children = [`${num}번 클릭함`, num.value < 5 ? hi : ''].filter(v => v);
            el.replaceChildren(...children);
            el.style.display = 'block';
            el.addEventListener('click', onClick);
        });
    });

    return Watcher('div', {activeMenu}, (el, {activeMenu}) => {
        el.replaceChildren(
            `현재 path는 ${activeMenu}입니다.`,
            ...buttons
        );
    }, {root: true, debug: 'root'});
}

export default App;