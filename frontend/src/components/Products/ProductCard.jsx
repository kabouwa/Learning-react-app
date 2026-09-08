
export default function ProductCard({product}) {

    const {id,title,category,price,description,image} = product;

    const slug = text => text .toLowerCase().replace(/[.,\-\s&';]+/g, '-').replace(/^-|-$/g, '');

    return (
        <div className="card relative" style={{backgroundColor : "#f3f3f3"}} data-slug={slug(title)} data-product-id={id}>
            <div className="card-header h-80">
                <div className="px-2.5 py-0.5 text-white text-center bg-indigo-400 rounded-2xl absolute right-3">
                    {category}
                </div>              
                <div className="card-img mt-3 h-full d-flex justify-center items-center">
                    <img className="max-h-66" src={image} alt={'Product Image No: ' + id} />
                </div>
            </div>

            <div className="card-body flex flex-col">
                

                <div className="card-title font-bold text-xl">{title}</div>

                <div className="card-text text-gray-400 text-2 flex-1">
                    {description.slice(0,150)}
                    {description.length > 150 ? '...' : null}
                </div>

                <div className="card-text font-bold bg-gray-200/25 rounded">
                    Price : {price} $
                </div>
            </div>

            <div className="card-footer ">
                <button className="text-white py-2 px-3 bg-indigo-500 rounded-3 hover:brightness-90 focus:brightness-90 focus:outline-blue-600 transition-all">
                    Add to cart
                </button>
            </div>
        </div>
    )
}