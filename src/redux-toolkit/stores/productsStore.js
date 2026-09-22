import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/productSlice";


export const productsStore = configureStore({
    reducer : {
        products : productsSlice.reducer,
    }
});