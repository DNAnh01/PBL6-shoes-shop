import config from '~/config';

import AdminDefaultLayout from '~/layouts/AdminDefaultLayout/AdminDefaultLayout';
import AboutPage from '~/pages/AboutPage';
import AdminAddProductPage from '~/pages/AdminAddProductPage';
import AdminCustomersPage from '~/pages/AdminCustomersPage';
import AdminDashboardPage from '~/pages/AdminDashboardPage';
import AdminOrdersPage from '~/pages/AdminOrdersPage';
import AdminProductsPage from '~/pages/AdminProductsPage';
import CartPage from '~/pages/CartPage';
import ForgetPassPage from '~/pages/ForgerPassPage';
import HomePage from '~/pages/HomePage';
import HotTrendPage from '~/pages/HotTrendPage';
import LoginPage from '~/pages/LoginPage';
import OrderPage from '~/pages/OrderPage';
import PayPage from '~/pages/PayPage';
import ProductPage from '~/pages/ProductPage';
import ProfilePage from '~/pages/ProfilePage';
import RegisterPage from '~/pages/RegisterPage';
import ServicePage from '~/pages/ServicePage';

// public routers
const publicRoutes = [
    // code Anhs
    { path: config.roures.login, component: LoginPage },
    { path: config.roures.register, component: RegisterPage },
    { path: config.roures.adminDashboard, component: AdminDashboardPage, layout: AdminDefaultLayout },
    { path: config.roures.adminProducts, component: AdminProductsPage, layout: AdminDefaultLayout },
    { path: config.roures.adminCustomers, component: AdminCustomersPage, layout: AdminDefaultLayout },
    { path: config.roures.adminOrders, component: AdminOrdersPage, layout: AdminDefaultLayout },
    { path: config.roures.adminAddProduct, component: AdminAddProductPage, layout: AdminDefaultLayout },
    // code 2 fen FE
    { path: config.roures.forgetPass, component: ForgetPassPage },
    { path: config.roures.home, component: HomePage },
    { path: config.roures.product, component: ProductPage },
    { path: config.roures.about, component: AboutPage },
    { path: config.roures.hotTrend, component: HotTrendPage },
    { path: config.roures.cart, component: CartPage },
    { path: config.roures.service, component: ServicePage },
    { path: config.roures.pay, component: PayPage },
    { path: config.roures.order, component: OrderPage },
    { path: config.roures.profile, component: ProfilePage },
];
//  private routers

const privateRoutes = [];

export { publicRoutes, privateRoutes };
