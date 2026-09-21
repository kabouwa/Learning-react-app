import { CUSTOM, DECREMENT, INCREMENT } from "../Reducers/CounterReducer";


export const onIncrement = value => ({
    type : INCREMENT,
    payload : {
        value : value
    }
});


export const onDecrement = value => ({
    type : DECREMENT,
    payload : {
        value : value
    }
});


export const onCustom = value => ({
    type : CUSTOM,
    payload : {
        value : value
    }
});