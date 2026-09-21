import { useEffect, useState } from "react"
import ProductCard from "../../components/Products/ProductCard"
import { productsApi } from "../../api/products"
import ProductBar from "../../components/Products/ProductBar";
import { useAlerts } from "../../context/AlertsContext";
import { useLoading } from "../../context/LoadingContext";

export default function ProductsList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filtredProducts,setFiltredProducts] = useState([]);
    const { loading, setLoading } = useLoading();
    const { clearAlerts, pushAlert } = useAlerts()

    useEffect(() => {
        async function loadProducts() {
            setLoading(true);
            
            try{
                let response = await productsApi.list();                   
                setProducts(response.data);
                setFiltredProducts(response.data);

                response = await productsApi.categories();                                            
                setCategories(response.data);

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
        if (!loading) loadProducts(); 
        
    },[pushAlert, setLoading, loading]);

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
        <div className="max-w-7xl mx-auto">
            <h1 className="mb-4 text-center">Manage Products</h1>

            <ProductBar products={products} setFiltredProducts={setFiltredProducts} categories={categories} />

            {
                !loading && filtredProducts.length
                ? <p className="mt-4">{filtredProducts.length} product(s) founded.</p>
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
                                product => <ProductCard key={product.slug} product={product} />
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