import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    city: {},
    currentWeather: {},
    hourlyWeather: {},
    dailyWeather: {},
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState, 
    reducers: {
        reset: () =>  initialState,

        resetCity : state => {
            state.city = {};
        },

        resetWeather: state => {
            state.currentWeather = {};
            state.hourlyWeather = {};
            state.dailyWeather = {};
        },

        setCity: (state, action) => {
            const { city } = action.payload;
            state.city = city;
        },

        setWeather: (state, action) => {
            const { currentWeather, hourlyWeather, dailyWeather } = action.payload;

            state.currentWeather = currentWeather;
            state.hourlyWeather = hourlyWeather;
            state.dailyWeather = dailyWeather;
        },
    }
});

export default weatherSlice;
export const { reset,resetCity, resetWeather, setCity, setWeather } = weatherSlice.actions;