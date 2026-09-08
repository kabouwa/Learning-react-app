import { useEffect, useState } from "react"
import ProductCard from "../../components/Products/ProductCard"
import { productsApi, categoriesApi} from "../../api/products"
import { ApiError } from "../../api/client";
import Alerts from "../../components/Alerts/Alerts";
import Loading from "../../components/Loading/Loading";
import ProductBar    from "../../components/Products/ProductBar";

export default function ProductsList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filtredProducts,setFiltredProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [alerts,setAlerts] = useState([]);
    // const [cart,setCart] = useState([]);

    useEffect(() => {
        async function load() {
            setLoading(true);
            
            try{
                let data = await productsApi.list();   
                setProducts(data)
                setFiltredProducts(data)

                data = await categoriesApi.list();                 
                setCategories(data)
            }catch (error) { 
                    setAlerts(prev => [
                        ...prev,
                        {
                            type : "error",
                            accent : "Error",
                            message : error instanceof ApiError ?  "You're offline. Check you internet connection." : "Unable to connect with server.",
                        }

                    ].slice(-1))
            } finally {
                setLoading(false)
            }
        }

        load(); 
    },[])

    useEffect(() => {
        if(loading) return;

        if(!filtredProducts.length) {
            setAlerts(prev => [
                ...prev,
                {
                    type : "info",
                    message : "No product founded.",
                    autoRemove : false,
                }
            ].slice(-1))
            
        }else{
            setAlerts([])
        }
    },[filtredProducts, loading])
   

    return(
        <>
        <h1 className="display-5 fw-bold mb-4">Discover Products</h1>

        <ProductBar products={products} setFiltredProducts={setFiltredProducts} categories={categories} />

        {
            filtredProducts.length
            ? <p className="mt-4 text-gray-400">{filtredProducts.length} product(s) founded.</p>
            : null
        }
        

        <Alerts alerts={alerts} />

        {
            loading 
            ? <Loading /> 
            : (
                <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 
                    gap-3 my-6"> 
                    {/* overflow-auto overflow-y-auto h-[calc(100vh-250px)]"> */}
                    {
                        filtredProducts.map(
                            (product,index) => <ProductCard key={index} product={product} />
                        )
                    }
                </div>
            )
        }
        </>
    )
}