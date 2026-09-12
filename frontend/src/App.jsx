import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'  
import Home from './pages/Home/Home'
import Counter  from './pages/Counter/Counter'
import ProductsList from './pages/Products/ProductsList'
import Auth from './pages/Auth/Auth'
import Layout from './components/Layout/Layout'
import NotFound from './pages/Errors/NotFound'
import ProductDetail from './pages/Product/ProductDetail'


function AppContent() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={ <Layout /> }>
                    <Route index element={ <Home/> } />
                    <Route path="counter" element={ <Counter /> } />
                    <Route path="*" element={ <NotFound /> } />
                </Route>

                <Route path="/store" element={ <Layout /> }>
                    <Route path="login" element={ <Auth /> } />
                    <Route path="register" element={ <Auth /> } />
                    <Route path="product" element={ <ProductDetail /> } />
                    <Route path="products" element={ <ProductsList /> } />
                </Route>

            </Routes>  

        </BrowserRouter>
    )
}


export default function App() {
    return (
        <>
            <AppContent />
        </>
    )
}