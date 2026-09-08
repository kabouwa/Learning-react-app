import { useEffect, useRef, useState } from "react";

export default function ProductBar({products, setFiltredProducts, categories}) {
    const searchInp = useRef(null);
    const minPriceInp = useRef(null);
    const maxPriceInp = useRef(null);
    const [showFilterModal,setShowFilterModal] = useState(false);

    useEffect(() => {
        const hideFilterModal = (e) => {
            const elem = e.target;
            if(showFilterModal && !elem.closest('.filter-modal') && !elem.closest('.filter-modal-toggler')) {
                setShowFilterModal(false);
                console.log('Hidden success')
            }else{
                console.log('no valid clic')
            }
        }

        document.addEventListener('click', hideFilterModal);
        document.addEventListener('scroll', hideFilterModal);

        return () => {
            document.removeEventListener('click',hideFilterModal);   
            document.removeEventListener('scroll',hideFilterModal);   
        } 
    },[showFilterModal])

    const handlePriceFormat = (e) => {
        const input = e.currentTarget;
        const fixedValue = Number(input.value);
        input.value = fixedValue > 0 ? fixedValue : 0
    }

    const handleSearch = (e) => {
        e.preventDefault();

        const search = searchInp.current.value.trim().toLowerCase();

        setFiltredProducts([
            ...products
        ].filter(
            product => product.title.toLowerCase().includes(search)  
                || product.description.toLowerCase().includes(search)
        ))
    }

    const handleFilterForm = (e) => {
        e.preventDefault()
        const category = document.querySelector('#category').value;
        const minPrice = parseFloat(minPriceInp.current.value.trim()); 
        const maxPrice = parseFloat(maxPriceInp.current.value.trim()); 

        // ========= category filter :
        setFiltredProducts([
            ...products
        ].filter(
            product => product.category.includes(category)  
        ));
        
        // ========= Min price filter : 
        if (minPrice) {
            setFiltredProducts(prev => [
                ...prev
            ].filter(
                product => parseFloat(product.price) >= minPrice
            ));
        }
        
        // ========= Max price filter :
        if (maxPrice > minPrice) {
            setFiltredProducts(prev => [
                ...prev
            ].filter(
                product => product.price <= maxPrice  
            ));
        }else if (maxPrice) {
            maxPriceInp.current.value = minPrice + 1
        }
    }

    const handleClearFilters = () => {
        setFiltredProducts([...products])
    }

    return (
        <div className="relative d-flex flex-col md:flex-row justify-between items-stretch gap-3">
            <div className="text-white hidden md:block w-36 px-3 py-2 bg-indigo-500 rounded-3 transition-all text-center">
                <i className="fa-solid fa-magnifying-glass mr-1"></i> Search
            </div>

            <input type="search" placeholder="Search..." ref={searchInp} name="search" id="search"
                className="form-control rounded-3 focus:shadow-0" onChange={handleSearch}
            />

            <button type="button"
                className="filter-modal-toggler text-white md:w-36 px-3 py-2 bg-indigo-500 rounded-3 transition-all text-center"
                onClick={() => {setShowFilterModal(prev => !prev)}}
            > <i className="fa-solid fa-filter"></i> Filter
            </button>

            {/* Filter Modal */}
            <div className={`filter-modal absolute z-50 top-13 p-3 right-0 text-dark bg-white rounded-2xl w-full 
            md:w-1/2 xl:w-1/3 overflow-hidden transition-all${!showFilterModal ? ' scale-0' : ''}`}>
                <h4>
                    <i className="fa-solid fa-filter"></i> Filters  
                </h4>
                
                <form className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3" onSubmit={handleFilterForm}>

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
                        <select name="category" id="category" className="form-select cursor-pointer">
                            <option value="">Choose category</option>
                            {
                                categories.map(
                                    (category,index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    )
                                )
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
}