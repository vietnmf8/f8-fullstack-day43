import paths from "./configs/path";
import DefaultLayout from "./layouts/DefaultLayout";
import HOCDemo from "./pages/HOCDemo";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RenderPropsDemo from "./pages/RenderPropsDemo";

const routes = [
    {
        layout: DefaultLayout,
        children: [
            { path: paths.home, component: Home },
            { path: paths.login, component: Login },
            { path: paths.hocDemo, component: HOCDemo, private: true },
            { path: paths.renderPropsDemo, component: RenderPropsDemo },
        ],
    },
];

export default routes;
