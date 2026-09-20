const INITIAL_STATE = {counter : 0}

export const INCREMENT = 'state-increment';
export const DECREMENT = 'state-decrement';
export const CUSTOM = 'state-custom';

export const CounterReducer = (state = INITIAL_STATE, action) => {
    const prev = state.counter;
    const value = action.value;

    switch(action.type){
        case INCREMENT:
            return {
                ...state,
                counter : prev + value
            }
        
        case DECREMENT:
            return {
                ...state,
                counter : prev - value
            };

        case CUSTOM:
            return {
                ...state,
                counter : value
            };

        default :
            return state;
    }
}