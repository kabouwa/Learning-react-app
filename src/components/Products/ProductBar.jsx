import { useEffect, useRef, useState } from "react";

export default function ProductBar({products, setFiltredProducts, categories}) {
    const searchInp = useRef(null);
    const minPriceInp = useRef(null);
    const maxPriceInp = useRef(null);
    const [showFilterModal,setShowFilterModal] = useState(false);

    // useEffect(() => {
    //     document.addEventListener('click', e => {
    //         console.log(e)
    //         setShowFilterModal(false)
    //     })
    // },[])

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
                className="text-white md:w-36 px-3 py-2 bg-indigo-500 rounded-3 transition-all text-center"
                onClick={() => {setShowFilterModal(prev => !prev)}}
            > <i className="fa-solid fa-filter"></i> Filter
            </button>
            {
                showFilterModal &&
                (<div className="filter-modal absolute z-50 top-13 p-3 right-0 text-dark bg-white rounded-2xl w-full md:w-1/2 xl:w-1/3">
                    <h4>
                        <i className="fa-solid fa-filter"></i> Filters
                    </h4>
                    
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3" onSubmit={handleFilterForm}>
                        <input type="number" className="form-control" name ="min-price" id="min-price" placeholder="Min price" ref={minPriceInp} />
                        <input type="number" className="form-control" name ="max-price" id="max-price" placeholder="Max price" ref={maxPriceInp} />

                        <select name="category" id="category" className="form-select cursor-pointer col-span-2">
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

                        <button type="submit"
                            className="text-white px-3 py-2 bg-indigo-500 rounded-3 transition-all text-center"
                        > <i className="fa-solid fa-filter"></i> Filter
                        </button>

                        <button type="button" onClick={handleClearFilters}
                            className="px-3 py-2 border-2 text-indigo-500 border-indigo-500 rounded-3 transition-all text-center"
                        > <i className="fa-solid fa-filter-circle-xmark"></i> Clear
                        </button>
                    </form>
                </div>)
            }
            

        </div>
    )
}