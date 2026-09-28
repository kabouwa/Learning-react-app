import { motion } from "framer-motion"
import CitySearch from "../../components/Weather/CitySearch"
import { useEffect, useState } from "react"
import LoadingSvg from "../../components/Utilities/LoadingSvg";
import { useAlerts } from "../../context/AlertsContext";
import { weatherApi } from './../../api/weather';
import TodayWeather from "../../components/Weather/TodayWeather";
import HourlyWeather from "../../components/Weather/HourlyWeather";
import DailyWeather from "../../components/Weather/DailyWeather";
import { useSelector, useDispatch } from "react-redux";
import { citySelector, weatherIsSet } from "../../redux-toolkit/selectors/weatherSelector";
import { resetWeather, setWeather } from "../../redux-toolkit/features/weatherSlice";

export default function Weather() {
    const { pushAlert } = useAlerts();
    const [loading, setLoading] = useState(false);

    const city = useSelector(citySelector);
    const weatherAvailable = useSelector(weatherIsSet);
    const dispatch = useDispatch();


    const prepareHourlyWeather = data => {
        const { hourly: { time, temperature_2m:temp, precipitation_probability:precip, weather_code:codes } } = data;
        
        console.log(time);
        
        // find current time in data (comparing hour of weather with current hour) if hours is 23 index is 24 the next day
        const now = new Date().getHours();
        const sliceTime = now === 23 
            ? time[24] 
            : time.find( date => + date.match(/T(\d+):/)[1] > now);
        
        // locate index of current time in data
        const index = time.indexOf(sliceTime);
        
        return {
            ...data,
            hourly: {
                ...data.hourly,
                time:           time.slice(index,  index + 25),                     
                temperature_2m: temp.slice(index,  index + 25), 
                weather_code:   codes.slice(index, index + 25), 
                precipitation_probability : precip.slice(index,  index + 25),                        
            }
        } 
    }
    
    useEffect(() => {
        async function loadCityWeather() {
            dispatch( resetWeather() );
            setLoading(true);

            try {
                const { properties: { lat, lon } } = city;

                // Get Current Weather
                const currentWeatherData = await weatherApi.current(lat, lon);
                // Get Hourly Weather
                const hourlyWeatherData = await weatherApi.hourly(lat, lon);
                // Get Daily Weather
                const dailyWeatherData = await weatherApi.daily(lat, lon);  


                const { daily: {time} } = dailyWeatherData;

                dispatch( setWeather({
                    currentWeather: currentWeatherData,
                    hourlyWeather: prepareHourlyWeather(hourlyWeatherData),
                    dailyWeather: {
                        ...dailyWeatherData,
                        daily: {
                            ...dailyWeatherData.daily,
                            time: time.map(date => new Date(date).toLocaleDateString('en-US', { weekday: 'short' }))    
                        }
                    }
                }));

            } catch (error) {
                pushAlert({
                    type : "error",
                    accent : "Error",
                    message : error.message,
                    autoRemove : true
                });
            }finally {
                setLoading(false)
            }
        }

        if (Object.values(city).length) loadCityWeather();  
        
    }, [city]);

    return (
        <motion.div transition={{ ease : 'easeInOut' }} initial={{ opacity : 0 }} animate={{ opacity : 1 }} className="max-w-7xl mx-auto">
            <h1 className="display-4 text-center font-bold mb-8">
                Explore Weather
            </h1>

            <CitySearch setLoading={setLoading} />

            <div className="bg-white/80 dark:bg-gray-700 min-h-120 mx-1 my-4 rounded flex flex-col items-stretch justify-center overflow-x-hidden relative">

                
                <div className="flex items-center justify-center">
                    <LoadingSvg hidden={!loading} classes="mx-auto" />
                </div>

                {
                    !Object.values(city).length && !loading &&
                    (<p className="text-gray-400 dark:text-gray-500 text-center">Search and select a city to start !</p>)
                }

                {
                    weatherAvailable
                    ? (
                        <>
                            <TodayWeather />
                            <HourlyWeather />
                            <DailyWeather />
                        </>
                    ) : ''
                }

                

            </div>

        </motion.div>
    )
}
