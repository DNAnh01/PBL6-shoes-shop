import config from '~/config';
// layouts
import AdminDefaultLayout from '~/layouts/AdminDefaultLayout/AdminDefaultLayout';
import AdminAddProductPage from '~/pages/AdminAddProductPage';
import AdminCustomersPage from '~/pages/AdminCustomersPage';
// pages
import AdminDashboardPage from '~/pages/AdminDashboardPage';
import AdminOrdersPage from '~/pages/AdminOrdersPage';
import AdminProductsPage from '~/pages/AdminProductsPage';
import LoginPage from '~/pages/LoginPage';
import RegisterPage from '~/pages/RegisterPage';

// public routers
const publicRoutes = [
    { path: config.roures.login, component: LoginPage },
    { path: config.roures.register, component: RegisterPage },
    { path: config.roures.adminDashboard, component: AdminDashboardPage, layout: AdminDefaultLayout },
    { path: config.roures.adminProducts, component: AdminProductsPage, layout: AdminDefaultLayout },
    { path: config.roures.adminCustomers, component: AdminCustomersPage, layout: AdminDefaultLayout },
    { path: config.roures.adminOrders, component: AdminOrdersPage, layout: AdminDefaultLayout },
    { path: config.roures.adminAddProduct, component: AdminAddProductPage, layout: AdminDefaultLayout },
];
//  private routers

const privateRoutes = [];

export { publicRoutes, privateRoutes };
