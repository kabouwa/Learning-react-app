import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products : [],
    filtredProducts : [],
    categories : [],
};

const productsSlice = createSlice({
    name : 'products',
    initialState,
    reducers : {
        clearProducts : () => initialState,

        setProducts : (state, action) => {
            const {products} = action.payload;
            state.products = products;
            state.filtredProducts = products;
        },

        setCategories : (state, action) => {
            const {categories} = action.payload;
            state.categories = categories;
        },

        searchProducts : (state, action) => {
            const { search } = action.payload;
            state.filtredProducts = state.products
                .filter(
                    product => product.name.toLowerCase().includes(search?.trim()?.toLowerCase())  
                        || product.description.toLowerCase().includes(search?.trim()?.toLowerCase())
                )
        },

        filterProducts : (state, action) => {
            const { category, minPrice, maxPrice } = action.payload;

            // ========= category filter :
            state.filtredProducts = state.products
                .filter( product =>  category ? (product.category === category) : true );


            // ========= Min price filter : 
            if (minPrice) {
                state.filtredProducts = state.filtredProducts
                    .filter(product => parseFloat(product.price) >= minPrice);
            }

            // ========= Max price filter : 
            if (maxPrice) {
                state.filtredProducts = state.filtredProducts
                    .filter(product => parseFloat(product.price) <= maxPrice);
            }
        },

        clearFilters : state => {
            state.filtredProducts = state.products;
        }
    }
})

export default productsSlice;

export const { clearProducts, setProducts, setCategories, searchProducts, filterProducts, clearFilters } = productsSlice.actions;