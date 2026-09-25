import { useEffect, useState } from "react"
import ProductCard from "../../components/Products/ProductCard"
import { productsApi } from "../../api/products"
import ProductBar from "../../components/Products/ProductBar";
import { useAlerts } from "../../context/AlertsContext";
import { useLoading } from "../../context/LoadingContext";
import { useDispatch, useSelector } from "react-redux";
import { filtredProductsSelector, productsSelector } from "../../redux-toolkit/selectors/ProductsSelector";
import { setCategories, setProducts } from "../../redux-toolkit/features/productSlice";
import { motion } from "framer-motion";
import { useUser } from "../../context/UserContext";

function Loading({ classes = '' }) {
    return <motion.div transition={{ ease: 'easeInOut', repeat: Infinity, duration: 1 }} animate={{ scaleX: [0,1] }} className={"bg-gray-300/20 h-full origin-left " + classes} />
}

function ProductsLoading({ cards = 1}) {
    return (
        <>
        { Array.from({ length: cards}, (_, i) => (
                <div key={i} className="relative flex flex-col gap-2 overflow-hidden rounded-xl bg-gray-100 pb-2 dark:bg-gray-700/90">
                    <div className="absolute top-2 right-2 z-10 h-5 w-14 overflow-hidden rounded-2xl bg-indigo-400">
                        <Loading />
                    </div>

                    <div className="h-112 bg-gray-300/10">
                        <Loading />
                    </div>

                    <div className="flex-1 p-2.5">
                        {Array.from({ length: 3 }, (_, i) => (
                            <div key={i} className={`my-2 overflow-hidden rounded bg-gray-300/10 ${ i === 1 ? "h-14" : "h-6" }`}>
                                <Loading />
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2 px-2.5 py-1">
                        <button className="h-8 w-30 overflow-hidden rounded-3 bg-indigo-500 text-white transition-[filter] hover:brightness-90 focus:brightness-90 focus:outline-blue-600">
                            <Loading />
                        </button>

                        <button className="h-8 w-30 overflow-hidden rounded-3 bg-gray-200/60 text-indigo-500 transition-[filter] hover:brightness-90 focus:brightness-90 focus:outline-blue-600 dark:bg-gray-500 dark:text-white">
                            <Loading />
                        </button>
                    </div>
                </div>
            ))    
        }
        </>
    )
}

export default function ProductsList() {
    // React Context;
    const { clearAlerts, pushAlert } = useAlerts();
    const { user } = useUser();

    // Redux Toolkit
    const products = useSelector(productsSelector);
    const filtredProducts = useSelector(filtredProductsSelector);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProducts() {
            setLoading(true);
            
            try{
                let response = await productsApi.list();
                dispatch( setProducts({products : response.data}) )            

                response = await productsApi.categories();
                dispatch( setCategories({categories : response.data}) )                                                 

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
        
        if (user && !products.length) {
            loadProducts(); 
        } else { 
            setLoading(false);
        } 
        
    },[user]);


    // Auto Alert No product founded (DB/FILTERED)
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
    }, [filtredProducts, loading, pushAlert, clearAlerts]);
   
    return(
        <div className="max-w-7xl mx-auto">
            <h1 className="mb-4 text-center">Manage Products</h1>

            <ProductBar />

            {
                !loading && filtredProducts.length
                ? <p className="mt-4">{filtredProducts.length} product(s) founded.</p>
                : null
            }


            <motion.div transition={{ ease : 'easeInOut' }} initial={{ opacity : 0 }} animate={{ opacity : 1 }} className="animate-fade-in grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 my-6"> 

                {
                    !loading && filtredProducts.length
                    ? filtredProducts.map(
                        product => <ProductCard key={product.slug} product={product} />
                    )
                    : ( <p className="text-center text-gray-400 col-span-4 text-sm">No product founded.</p> )
                }

                {
                    loading && <ProductsLoading cards={8} />
                }

            </motion.div>
        </div>
    )
} 