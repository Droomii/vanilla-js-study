import Store from './store/Store';
import Watcher from './define/Watcher';

function App() {
    const {activeMenu, numbers} = Store;

    const hi = Watcher('div', {}, (el) => {
        el.replaceChildren('hi!!');
    }, {debug: 'hi'});

    const buttons = numbers.map(num => {
        const onClick = () => {
            num.set(v => v + 1);
        };



        return Watcher('button', {num}, (el, {num}) => {
            const children = [`${num}번 클릭함`, num.value < 5 ? hi() : ''].filter(v => v);
            el.replaceChildren(...children);
        }, {
            onMount: el => {
                el.addEventListener('click', onClick);
                el.style.display = 'block';
            },
            onUnmount: el => {
                el.removeEventListener('click', onClick);
            }
        });
    });

    return Watcher('div', {activeMenu}, (el, {activeMenu}) => {
        el.replaceChildren(
            `현재 path는 ${activeMenu}입니다.`,
            ...buttons.map(v => v())
        );
    }, {root: true, debug: 'root'})();
}

export default App;