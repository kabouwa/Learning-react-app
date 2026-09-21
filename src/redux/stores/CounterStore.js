import { createStore } from "redux";
import { CounterReducer } from "../Reducers/CounterReducer";


export const store = createStore(CounterReducer);

store.subscribe( () => {
    const counter = store.getState()?.counter;
    console.log(
        `Redux store subscriber say : "Counter now is ${counter}"`
    );  
});