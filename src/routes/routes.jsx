import { House, LayoutDashboard, LogIn, Store, Timer, UserRoundPlus } from 'lucide-react';


export const routes = {
    home            : '/',
    counter         : '/counter',

    login           : '/auth/login',
    register        : '/auth/register',

    dashboard       : '/dashboard',

    products        : '/dashboard/products',
    product_show    : '/dashboard/products/',

    account         : '/dashboard/account/information',
    accountUpdate   : '/dashboard/account/edit', 
};
const { home, counter, dashboard, products, login, register } = routes;


export const navItems =  [
    {title: 'Home',         link: home,       position: 'top',     icon: <House />},
    {title: 'Counter',      link: counter,    position: 'top',     icon: <Timer />},
    {title: 'Dashboard',    link: dashboard,  position: 'top',     icon: <LayoutDashboard />},
    {title: 'Products',     link: products,   position: 'top',     icon: <Store />, active : '/dashboard/products/'},
    {title: 'Login',        link: login,      position: 'bottom',  icon: <LogIn />},
    {title: 'Register',     link: register,   position: 'bottom',  icon: <UserRoundPlus />},
];

export const guestRoutes = [
    login, register
];