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
import { store } from "./redux/stores/CounterStore"
import { CounterStore } from './pages/Counter/CounterRedux'
import { guestRoutes, routes } from './routes/routes'
import ProtectedRoutes from './middlewares/ProtectedRoutes'

function AppContent() {
    const { user } = useUser();
    const { pushAlert } = useAlerts();
    const { loading, setLoading } = useLoading();
    const location = useLocation();
    const navigate = useNavigate();

    // Middleware
    // useEffect(() => {
    //     if (loading) return;

    //     setLoading(true);

    //     if ( !user && location.pathname.startsWith('/dashboard') ) {
    //         pushAlert({
    //             type : 'warning',
    //             message : "You're not logged to access this page",
    //             autoRemove : true,
    //             clearAlerts : true
    //         });

    //         navigate(
    //             routes.login,
    //             { 
    //                 replace : true,
    //                 state : {
    //                     from: location
    //                 }
    //             }
    //         );
    //     }

    //     if( user && guestRoutes.includes(location.pathname) ){
    //         navigate(
    //             location?.state?.from?.pathname || routes.dashboard, 
    //             { replace : true}
    //         );
    //     }

    //     setLoading(false);

    // }, [location.pathname, user, navigate, pushAlert, loading, location, setLoading]);

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

                {/* Dashboard Protected */}
                <Route element={ <ProtectedRoutes /> }>
                    <Route path="dashboard" >
                        <Route index element={ <Dashboard /> } />
                        <Route path="account/information" element={ <Account /> } />
                        <Route path="account/edit" element={ <Account /> } />
                        <Route path="products" element={ <ProductsList /> } />
                        <Route path="products/:slug" element={ <ProductDetail /> } />
                    </Route>
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