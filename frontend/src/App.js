import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './states/store';
import { publicRoutes } from './routes';
import { Fragment } from 'react';
import { CartProvider } from './api/user/CartContext';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <Provider store={store}>
                <CartProvider>
                    <div className="App">
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;
                                let Layout = Fragment;
                                if (route.layout) {
                                    Layout = route.layout;
                                }

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </div>
                </CartProvider>
            </Provider>
        </Router>
    );
}

export default App;
