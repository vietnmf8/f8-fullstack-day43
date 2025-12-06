import { BrowserRouter as Router, Routes, Route } from "react-router";
import React, { Fragment } from "react";
import routes from "./routes";
import Private from "./components/Private";
import * as z from "zod";

/* Hỗ trợ hiển thị lỗi Tiếng Việt */
z.config(z.locales.vi());

function App() {
    return (
        <Router>
            <Routes>
                {routes.map((route, index) => {
                    const Layout = route.layout;
                    return (
                        <Route key={index} element={<Layout />}>
                            {route.children.map((child, index) => {
                                const Component = child.component;
                                const Wrapper = child.private
                                    ? Private
                                    : Fragment;
                                return (
                                    <Route
                                        key={index}
                                        path={child.path}
                                        element={
                                            <Wrapper>
                                                <Component />
                                            </Wrapper>
                                        }
                                    />
                                );
                            })}
                        </Route>
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
