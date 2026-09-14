import { useEffect, useState } from 'react';
import NotFound from '../Errors/NotFound'
import { productsApi } from '../../api/products';
import Loading from '../../components/Utilities/Loading';
import { useAlerts } from '../../Context/AlertsContext';


function ProductCard({ product }) {
    const { id, title, description, image, price, category, rating} = product;

    return (
        <div className='flex flex-col md:flex-row items-stretch justify-between gap-4' data-id={id}>

            <div className='bg-white md:w-1/3 flex justify-center items-center rounded p-10'>
                <img src={image} alt="Product Image" className='w-1/2 md:w-auto' />
            </div>



            <div className="card flex-1">

                <div className="card-header flex justify-between items-center">

                    <p className='text-indigo-500 m-0'>
                        <strong>Rating :</strong> {rating.rate} / 5 ({rating.count})
                    </p>

                    <div className="px-2.5 py-0.5 text-white text-center bg-indigo-400 rounded-2xl ">
                        {category}
                    </div>              

                </div>

                <div className="card-body flex flex-col">
            
                    <div className="card-title font-bold display-5">{title}</div>

                    <div className="card-text text-gray-600 text-2 flex-1">{description}</div>

                </div>

                <div className="card-footer flex justify-between items-center">

                    <div className="card-text text-4xl font-bold">
                        Price : {price} $
                    </div>

                    <button className="text-white py-2 px-3 bg-indigo-500 rounded-3 hover:brightness-90 focus:brightness-90 focus:outline-blue-600 transition-all">
                        Add to cart
                    </button>
                </div>

            </div>

        </div>
    )
}

export default function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { clearAlerts, pushAlert } = useAlerts();

    const query = new URLSearchParams(location.search)
    const id = parseInt( query.get('id') );
    
    useEffect(() => {
        if(!id) return (<NotFound />);

        async function load() {
            setLoading(true);
            clearAlerts();
            
            try {
                const data = await productsApi.get(id);
                
                if( data && Object.keys(data).length !== 0 ) {
                    setProduct(data)
                }else{
                    pushAlert({
                        type : "warning",
                        message : "Product not found.",
                        autoRemove : true,
                    });
                }

            } catch (error) {
                pushAlert({
                    type : "error",
                    accent : "Error",
                    message : error.message,
                    autoRemove : true,
                });
            }finally {
                setLoading(false);
            }
        }

        load();
    },[pushAlert, clearAlerts, id])

    return (
        <>
        {
            loading 
            ? <Loading />
            : !product
            ? (<NotFound />)
            : (
                <div className="max-w-7xl mx-auto">

                    <h1 className="">
                        <i className="fa-solid fa-box mr-2"></i>
                        Product Detail
                    </h1>

                    <button onClick={() => history.go(-1)}
                        className='mb-4 underline text-gray-400 hover:text-white transition-all duration-300'>
                        <i className="fa-solid fa-arrow-left-long underline"></i> go back
                    </button>
                
                    <ProductCard product={product} />
                </div>
            )
        }
        </> 
    )
}
