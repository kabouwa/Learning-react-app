import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/productSlice";
import weatherSlice from "../features/weatherSlice";

export const reduxStore = configureStore({
    reducer : {
        products : productsSlice.reducer,
        weather : weatherSlice.reducer
    }
});