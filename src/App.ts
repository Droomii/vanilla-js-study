import Store from './store/Store';
import Watcher from './define/Watcher';

function App() {
    const {activeMenu, numbers} = Store;



    const buttons = numbers.map(num => {
        const onClick = () => {
            num.set(v => v + 1);
        };

        return Watcher('button', {num}, (el, {num}) => {
            el.innerHTML = `${num}번 클릭함`;
            el.style.display = 'block';
            el.addEventListener('click', onClick);
            console.log('render');
        });
    });

    return Watcher('div', {activeMenu}, (el, {activeMenu}) => {
        el.replaceChildren(
            `현재 path는 ${activeMenu}입니다.`,
            ...buttons
        );
    });
}

export default App;