import LoginPage from '../pages/login';
import Dashboard from "../pages/dashboard"
import ManageUser from "../pages/manage-user"
import ManageProduct from '../pages/manage-product';
import ManageOrder from '../pages/manage-order';
import NotFoundPage from '../pages/not-found'

export const routes = [
    { path: '/', element: LoginPage, isWrapLayout: false },
    { path: '/login', element: LoginPage, isWrapLayout: false },
    { path: '/dashboard', element: Dashboard, isWrapLayout: true },
    { path: '/manage-user', element: ManageUser, isWrapLayout: true },
    { path: '/manage-product', element: ManageProduct, isWrapLayout: true },
    { path: '/manage-order', element: ManageOrder, isWrapLayout: true },
    { path: '*', element: NotFoundPage, isWrapLayout: false },
]