import { CloudSun, House, LayoutDashboard, LogIn, Store, Timer, UserRoundPlus } from 'lucide-react';


export const routes = {
    home            : '/',
    counter         : '/counter',
    Weather         : '/weather',

    login           : '/auth/login',
    register        : '/auth/register',

    dashboard       : '/dashboard',

    products        : '/dashboard/products',
    product_show    : '/dashboard/products/',

    account         : '/dashboard/account/information',
    accountUpdate   : '/dashboard/account/edit',

    
};
const { home, counter, Weather, dashboard, products, login, register } = routes;


export const navItems =  [
    {title: 'Home',         link: home,       position: 'top',     Icon: House },
    {title: 'Weather',      link: Weather,    position: 'top',     Icon: CloudSun },
    {title: 'Counter',      link: counter,    position: 'top',     Icon: Timer },
    {title: 'Dashboard',    link: dashboard,  position: 'top',     Icon: LayoutDashboard },
    {title: 'Products',     link: products,   position: 'top',     Icon: Store , active : '/dashboard/products/'},
    {title: 'Login',        link: login,      position: 'bottom',  Icon: LogIn },
    {title: 'Register',     link: register,   position: 'bottom',  Icon: UserRoundPlus },
];

export const guestRoutes = [
    login, register
];