import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesSelector, productsSelector } from "../../redux-toolkit/selectors/ProductsSelector";
import { clearFilters, filterProducts, searchProducts } from "../../redux-toolkit/features/productSlice";
import { useSearchParams } from "react-router-dom";

function ProductBar() {
    // Redux Toolkit
    const dispatch = useDispatch();
    const products = useSelector(productsSelector);
    const categories = useSelector(categoriesSelector);
    
    const [showFilterModal,setShowFilterModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchInp = useRef(null);
    const minPriceInp = useRef(null);
    const maxPriceInp = useRef(null);
    const categorySelect = useRef(null);

    useEffect(() => {
        const hideFilterModal = (e) => {
            const elem = e.target;
            if(showFilterModal && !elem.closest('.filter-modal') && !elem.closest('.filter-modal-toggler')) {
                setShowFilterModal(false);
            }
        }

        document.addEventListener('click', hideFilterModal);

        return () => {
            document.removeEventListener('click',hideFilterModal);   
        } 
    },[showFilterModal]);

    const handlePriceFormat = (e) => {        
        const input = e.currentTarget;
        const fixedValue = Number(input.value);
        input.value = fixedValue > 0 ? fixedValue : 0;
    }

    const handleFilterForm = (e) => {
        e.preventDefault()
        const category = categorySelect.current.value; 
        const minPrice = parseFloat(minPriceInp.current.value.trim()); 
        let maxPrice = parseFloat(maxPriceInp.current.value.trim()); 

        if (maxPrice && maxPrice <= minPrice) {
            maxPriceInp.current.value = minPrice + 1;
            maxPrice = minPrice + 1;
        }

        setSearchParams(prev => {
            prev.delete('search');
            if (category) {
                prev.set("category", category);
            } else {
                prev.delete("category");
            }

            if (minPrice) {
                prev.set("min_price", minPrice);
            } else {
                prev.delete("min_price");
            }

            if (maxPrice) {
                prev.set("max_price", maxPrice);
            } else {
                prev.delete("max_price");
            }

            return prev;
        });
        
        dispatch( filterProducts({ category, minPrice, maxPrice }) );
    }

    const handleClearFilters = () => {
        categorySelect.current.value = '';
        minPriceInp.current.value = ''; 
        maxPriceInp.current.value = ''; 
        setSearchParams({});
        dispatch( clearFilters() );
    }

    const handleSearch = () => {
        handleClearFilters();

        const search = searchInp.current.value;
        
        setSearchParams(prev => {
            if(search) {
                return { ...prev, search }
            }else{
                prev.delete('search');
                return prev;
            }
        });
        
        dispatch( searchProducts({ search }) );
    }
    
    return(
        <>
            {products.length 
            ?(
            <div className="relative d-flex flex-col md:flex-row justify-between items-stretch gap-3">
                <div className="text-white hidden md:block w-36 px-3 py-2 bg-indigo-500 rounded-3 transition-all text-center relative z-30" defaultValue={searchParams.get('search')}>
                    <i className="fa-solid fa-magnifying-glass mr-1"></i> Search
                </div>

                <input type="search" placeholder="Search..." ref={searchInp} name="search" id="search"
                    className="form-control rounded-3 focus:shadow-0 relative z-30 py-2.5" onChange={handleSearch}
                />

                <button type="button"
                    className="filter-modal-toggler relative z-30 text-white md:w-36 px-3 py-2 bg-indigo-500 rounded-3 transition-all text-center"
                    onClick={() => {setShowFilterModal(prev => !prev)}}
                > <i className="fa-solid fa-filter"></i> Filter
                </button>

                {/* Filter Modal */}
                <div className={`filter-modal absolute z-20 top-27 md:top-13 p-3 right-0 text-dark bg-white rounded-2xl w-full
                md:w-1/2 xl:w-1/3 overflow-hidden transition-all ${(showFilterModal ? 'animate-fade-in-to-bottom' : 'scale-0')}`}>
                    <h4>
                        <i className="fa-solid fa-filter"></i> Filters  
                    </h4>
                    
                    <form className="flex flex-col md:grid grid-cols-1 md:grid-cols-2 gap-3 my-3" onSubmit={handleFilterForm} noValidate={true}>

                        <div>
                            <label htmlFor="min-price" className="form-label">Min price :</label>
                            <div className="input-group">
                                <input type="number" className="form-control" name ="min-price" id="min-price"
                                    placeholder="Min price" ref={minPriceInp} onChange={handlePriceFormat} />
                                <div className="input-group-text">$</div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="max" className="form-label">Max price :</label>
                            <div className="input-group">
                                <input type="number" className="form-control" name ="max" id="max-price"
                                    placeholder="Max price" ref={maxPriceInp} onChange={handlePriceFormat} />
                                <div className="input-group-text">$</div>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="category" className="form-label">Category :</label>
                            <select name="category" className="form-select cursor-pointer" ref={categorySelect}>
                                <option value="">Choose category</option>
                                {
                                    categories.length 
                                    ? categories.map(
                                        (category,index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        )
                                    )
                                    : null
                                }
                            </select>
                        </div>

                        <button type="submit"
                            className="text-white px-3 py-2 bg-indigo-500 rounded-3 transition-all text-center"
                        > <i className="fa-solid fa-filter"></i> Filter
                        </button>

                        <button type="button" onClick={handleClearFilters}
                            className="px-3 py-2 border-2 text-indigo-500 border-indigo-500 rounded-3 transition-all text-center"
                        > <i className="fa-solid fa-filter-circle-xmark"></i> Clear
                        </button>
                    </form>
                </div>
            </div>
            )
            : null}
        </>
        )
}


export default memo(ProductBar)