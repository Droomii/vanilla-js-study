import MainPage from "./main/MainPage";
import Store from "../store/Store";

function Router(pages: Record<string, () => HTMLDivElement>) {
    const select = (val: string) => (pages[val] ?? MainPage)();

    return Store.activeMenu.format(select);
}

export default Router;