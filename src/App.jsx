import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'  
import { AlertsProvider, useAlerts } from './context/AlertsContext'
import { UserProvider, useUser } from './context/UserContext'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home/Home'
import Counter  from './pages/Counter/Counter'
import ProductsList from './pages/Products/ProductsList'
import ProductDetail from './pages/Products/ProductDetail'
import Auth from './pages/Auth/Auth'
import Layout from './components/Layout/Layout'
import NotFound from './pages/Errors/NotFound'
import Dashboard from './pages/Dashboard/Dashboard'
import { useEffect } from 'react'
import { LoadingProvider, useLoading } from './context/LoadingContext'
import { ConfirmationModalProvider } from './context/ConfirmationModalContext'
import Account from './pages/Account/Account'
import { Provider } from 'react-redux'
import { store } from './stores/CounterStore'
import { CounterStore } from './pages/Counter/CounterRedux'

const guestRoutes = [
    '/auth/login',
    '/auth/register'
]

function AppContent() {
    const { user } = useUser();
    const { pushAlert } = useAlerts();
    const { loading } = useLoading();
    const location = useLocation();
    const navigate = useNavigate();

    // Middleware
    useEffect(() => {
        if (loading) return;
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
    }, [location.pathname, user, navigate, pushAlert, loading]);

    return (
        <Routes>

            <Route element={ <Layout /> }>

                {/* Public Pages */}
                <Route index element={ <Home/> } />
                <Route path="counter" element={ <CounterStore /> } />

                {/* Authentication */}
                <Route path="auth">
                    <Route path="login" element={ <Auth /> } />
                    <Route path="register" element={ <Auth /> } />
                </Route>

                {/* Dashboard */}
                <Route path="dashboard" >
                    <Route index element={ <Dashboard /> } />
                    <Route path="account/information" element={ <Account /> } />
                    <Route path="account/edit" element={ <Account /> } />
                    <Route path="product" element={ <ProductDetail /> } />
                    <Route path="products" element={ <ProductsList /> } />
                </Route>


                <Route path="*" element={ <NotFound /> } />
            </Route>

        </Routes>
    )
}


export default function App() {
    return (
        <BrowserRouter>

            <Provider store={store} >

            <ConfirmationModalProvider>
                <ThemeProvider>
                    <LoadingProvider>
                        <AlertsProvider>
                            <UserProvider>
                                <AppContent />
                            </UserProvider>
                        </AlertsProvider>
                    </LoadingProvider>
                </ThemeProvider>
            </ConfirmationModalProvider>

            </Provider>

        </BrowserRouter>
    )
}