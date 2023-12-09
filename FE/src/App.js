import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './states/store';
import { publicRoutes } from './routes';
import { Fragment } from 'react';
import { CartProvider } from './contexts/CartContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgetPassPage from './pages/ForgerPassPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import ServicePage from './pages/ServicePage';
import PayPage from './pages/PayPage';
import ProfilePage from './pages/ProfilePage';
import HotTrendPage from './pages/HotTrendPage';

import 'react-toastify/dist/ReactToastify.css';
import OrderPage from './pages/OrderPage';

function App() {
    return (
        <Router>
            <Provider store={store}>
                <CartProvider>
                    <div className="App">
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/forgetpassword" element={<ForgetPassPage />} />
                            <Route path="/" element={<HomePage />} />
                            <Route path="/product" element={<ProductPage />} />
                            <Route path="/product/:id" element={<AboutPage />} />
                            <Route path="/hot" element={<HotTrendPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/service" element={<ServicePage />} />
                            <Route path="/pay" element={<PayPage />} />
                            <Route path="/order" element={<OrderPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
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
