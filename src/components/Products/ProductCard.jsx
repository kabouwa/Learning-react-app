import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";

export default function ProductCard({product}) {

    const {user_id, slug, name, description, price, category, image, image_url, available, created_at, updated_at} = product;

    return (
        <div className="relative rounded-xl pb-2 flex flex-col gap-2 bg-gray-100 dark:bg-gray-700/90 overflow-hidden" data-user={user_id} data-product={slug} >
            <div className="card-header p-0">

                <span className="text-sm pointer-events-none px-2 py-0.5 text-white text-center bg-indigo-400 rounded-2xl absolute top-2 right-2 transition-scale hover:scale-101">
                    {category}
                </span>        

                <div className="card-img h-full d-flex justify-center items-center">
                    <img className="w-full" src={image_url ?? '/default-image.png'} alt={name + "'s image."} />
                </div>
            </div>

            <div className="p-2.5 flex flex-col gap-2.5 flex-1">
                
                <div className="card-title font-bold text-xl">
                    {name}
                    <sup className={`text-xs ml-2 ${available ? 'text-green-500' : 'text-red-500'}`}>
                        {available ? 'Available' : 'Out of stock'}
                    </sup>
                    
                </div>

                <div className="card-text text-gray-400 text-2 flex-1 ">
                    {description.slice(0,150)}
                    {description.length > 150 ? '...' : null}
                </div>

                <div className="px-2 font-bold bg-gray-200/75 dark:bg-gray-200/25 rounded">
                    Price : {price} $
                </div>
            </div>

            <div className="px-2.5 py-1 flex gap-2">
                <button className="text-white py-1 px-3 bg-indigo-500 rounded-3 hover:brightness-90 focus:brightness-90 focus:outline-blue-600 transition-all">
                    Add to cart
                </button>
                <Link to={routes.product_show + slug} 
                    className="text-indigo-500 dark:text-white py-1 px-3 bg-gray-200/60 dark:bg-gray-500 rounded-3 hover:brightness-90 focus:brightness-90 focus:outline-blue-600 transition-all"
                >View Product
                </Link>
                
            </div>
        </div>
    )
}