export const citySelector = (state) => state.weather.city;
export const currentWeatherSelector = ({ weather }) => weather.currentWeather;
export const hourlyWeatherSelector = ({ weather }) => weather.hourlyWeather;
export const dailyWeatherSelector  = ({ weather }) => weather.dailyWeather;

export const weatherIsSet = ({ weather }) => {
    const { currentWeather:curr, hourlyWeather:hour, dailyWeather:dail } = weather;

    return (!curr || !hour || !dail)
        ? false
        : (Object.values(curr).length && Object.values(hour).length && Object.values(dail).length )
        ? true
        : false
}