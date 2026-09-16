import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'  
import { AlertsProvider, useAlerts } from './Context/AlertsContext'
import { UserProvider, useUser } from './Context/UserContext'
import Home from './pages/Home/Home'
import Counter  from './pages/Counter/Counter'
import ProductsList from './pages/Products/ProductsList'
import ProductDetail from './pages/Products/ProductDetail'
import Auth from './pages/Auth/Auth'
import Layout from './components/Layout/Layout'
import NotFound from './pages/Errors/NotFound'
import Dashboard from './pages/Dashboard/Dashboard'
import { useEffect } from 'react'

const guestRoutes = [
    '/auth/login',
    '/auth/register',
]

function AppContent() {
    const { user, setUser } = useUser();
    const { pushAlert } = useAlerts();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if ( !user && location.pathname.startsWith('/dashboard') ) {
            pushAlert({
                type : 'warning',
                message : "You're not logged to access this page",
                autoRemove : true,
                clearAlerts : true
            })
            navigate('/auth/login', { replace : true});
        }

        if( user && guestRoutes.includes(location.pathname) ){
            navigate('/dashboard', { replace : true});
        }
    }, [location.pathname, user, navigate, pushAlert]);

    return (
            <Routes>

                <Route path="/" element={ <Layout /> }>
                    <Route index element={ <Home/> } />
                    <Route path="counter" element={ <Counter /> } />
                    <Route path="*" element={ <NotFound /> } />
                </Route>


                <Route path="/auth" element={ <Layout /> }>
                    <Route path="login" element={ <Auth /> } />
                    <Route path="register" element={ <Auth /> } />
                </Route>

                <Route path="/dashboard" element={ <Layout /> }>
                    <Route index element={ <Dashboard /> } />
                    <Route path="product" element={ <ProductDetail /> } />
                    <Route path="products" element={ <ProductsList /> } />
                </Route>


            </Routes>
    )
}


export default function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <AlertsProvider>
                    <AppContent />
                </AlertsProvider>
            </UserProvider>
        </BrowserRouter>
    )
}