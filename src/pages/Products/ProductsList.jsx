import { useEffect, useState } from "react"
import ProductCard from "../../components/Products/ProductCard"
import { productsApi } from "../../api/products"
import Loading from "../../components/Utilities/Loading";
import ProductBar from "../../components/Products/ProductBar";
import { useAlerts } from "../../Context/AlertsContext";

export default function ProductsList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filtredProducts,setFiltredProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const { clearAlerts, pushAlert } = useAlerts()

    useEffect(() => {
        async function load() {
            setLoading(true);
            
            try{
                let data = await productsApi.list();   
                setProducts(data);
                setFiltredProducts(data);

                data = await productsApi.categories();            
                setCategories(data);
            }catch (error) { 
                pushAlert({
                    type : "error",
                    accent : "Error",
                    message : error.message,
                    autoRemove : false
                });
            } finally {
                setLoading(false);
            }
        }

        load(); 
    },[pushAlert]);

    useEffect(() => {
        if(loading) return;

        if(!filtredProducts.length) {
            pushAlert({
                type : "info",
                message : "No product founded.",
                autoRemove : true,
                clearAlerts : true
            });
            
        }else{
            clearAlerts()
        }
    },[filtredProducts, loading, pushAlert, clearAlerts]);
   

    return(
        <div className="max-w-7xl mx-auto overflow-hidden">
            <h1 className="mb-4 text-center">Discover Products</h1>

            <ProductBar products={products} setFiltredProducts={setFiltredProducts} categories={categories} />

            {
                !loading && filtredProducts.length
                ? <p className="mt-4 text-gray-400">{filtredProducts.length} product(s) founded.</p>
                : null
            }

            {
                !loading 
                ? (
                    <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 
                        gap-3 my-6"> 
                        {
                            filtredProducts.length
                            ? filtredProducts.map(
                                product => <ProductCard key={product.id} product={product} />
                            )
                            : ( <p className="text-center text-gray-400 col-span-4 text-2xl">No product founded.</p> )
                        }
                    </div>
                )
                : ''
            }
        </div>
    )
}