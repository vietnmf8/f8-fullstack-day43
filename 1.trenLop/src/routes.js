import paths from "./configs/path";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RenderProps from "./pages/RenderProps";

const routes = [
    {
        layout: DefaultLayout,
        children: [
            { path: paths.home, component: Home },
            { path: paths.login, component: Login },
            { path: paths.renderProps, component: RenderProps },
            { path: paths.profile, component: Profile, private: true },
        ],
    },
];

export default routes;
