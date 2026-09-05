import { useState } from 'react'
import './App.css'  
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Counter  from './pages/Counter/Counter'


export default function App() {
    const [activeTab,setActiveTab] = useState(localStorage.getItem('tab') ?? 'home')

    const setActiveTabHandler = (value) => {
        localStorage.setItem('tab',value)
        setActiveTab(value)
    } 

    return (
        <>
            <Header setActiveTab={setActiveTabHandler} />

            <section className="flex-1">
                {
                    activeTab === 'home' ? <Home />
                    : activeTab === 'counter' ? <Counter />
                    : <Home />
                } 
            </section>

            <Footer />
        </>
    )
}