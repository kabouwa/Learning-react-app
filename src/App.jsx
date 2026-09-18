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
import { authApi } from './api/auth'
import { LoadingProvider } from './context/LoadingContext'
import { ConfirmationModalProvider } from './context/ConfirmationModalContext'

const guestRoutes = [
    '/auth/login',
    '/auth/register'
]

function AppContent() {
    const { user, setUser } = useUser();
    const { pushAlert } = useAlerts();
    const location = useLocation();
    const navigate = useNavigate();

    // Load user
    useEffect(() => {
        async function loadUser() {
            const token = localStorage.getItem('token');
            if (!token) return;

            try{
                const data = await authApi.user();
                
                if(data?.errors){
                    pushAlert({
                        type : 'error',
                        message: data.message,
                        autoRemove: true,
                        clearAlerts: true
                    });
                }else{
                    const user = data.data;                    
                    setUser(user); 
                    pushAlert({
                        type : 'success',
                        message: "User Login in !",
                        autoRemove: true,
                        clearAlerts: true
                    });               
                }
            }catch (error) { 
                pushAlert({
                    type : 'error',
                    message: error?.message,
                    clearAlerts: true
                });
            }
        }

        loadUser();
    }, [pushAlert, setUser]);

    // Middleware
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

            <Route element={ <Layout /> }>

                {/* Public Pages */}
                <Route index element={ <Home/> } />
                <Route path="counter" element={ <Counter /> } />

                {/* Authentication */}
                <Route path="auth">
                    <Route path="login" element={ <Auth /> } />
                    <Route path="register" element={ <Auth /> } />
                </Route>

                {/* Dashboard */}
                <Route path="dashboard" >
                    <Route index element={ <Dashboard /> } />
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
            <ConfirmationModalProvider>
                <LoadingProvider>
                    <UserProvider>
                        <ThemeProvider>
                            <AlertsProvider>
                                <AppContent />
                            </AlertsProvider>
                        </ThemeProvider>
                    </UserProvider>
                </LoadingProvider>
            </ConfirmationModalProvider>
        </BrowserRouter>
    )
}