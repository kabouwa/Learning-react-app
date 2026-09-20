import { createStore } from "redux";
import { CounterReducer } from "./Reducers/CounterReducer";


export const store = createStore(CounterReducer);

store.subscribe( () => {
    console.log(store.getState());  
})