import Layout from "./common/component/layout/Layout";
import MainPage from "./page/main/MainPage";
import Router from "./page/Router";
import Menu1 from "./page/menu1/Menu1";
import Menu2 from "./page/menu2/Menu2";

function App() {
    const layout = Layout();
    const router = Router({
        '/main': MainPage,
        '/menu1': Menu1,
        '/menu2': Menu2
    });

    return (
        layout(router)
    );
}

export default App;