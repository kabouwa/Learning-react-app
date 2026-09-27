import { motion } from "framer-motion";
import withWeatherIcon from "./withWeatherIcon";

function HourlyWeather({ hourlyWeather, getWeatherIcon } ){
    const { hourly , hourly_units:units } = hourlyWeather;
    const { time , temperature_2m:temp, weather_code:codes } = hourly;

    return (
        <div className="flex-1 flex flex-col justify-between items-center gap-2 py-4 px-2 max-w-4xl mx-auto">
            <h1 className="display-6 text-center font-bold text-indigo-500 dark:text-indigo-400">
                    Hourly Weather
             </h1>
            
            {/* Hourly Weather Temperature */}
            
            <div className="flex flex-nowrap gap-2 md:gap-4 flex-1 py-4 px-4 mx-auto w-[calc(100vw-4rem)] md:w-full max-w-4xl overflow-x-auto rounded-xl bg-white/99 dark:bg-gray-800">
                {
                    time?.map((date, index) => (
                        <motion.div key={index} whileHover={{ y: '-7px'}} className="hover:bg-gray-200 dark:hover:bg-gray-500 min-w-20 md:min-w-30 inline-flex flex-col gap-3 justify-between items-center ring ring-indigo-500 rounded-xl p-1">
                            <p>
                                {date.split('T')[1]}
                            </p>

                            <p>
                                {getWeatherIcon(codes[index], 'bg-blue-100 text-blue-500 py-2.5 px-2 rounded-xl')}
                            </p>

                            <p className="font-bold text-xl">
                                {temp[index]} {units?.temperature_2m}
                            </p>
                        </motion.div>
                    ))
                }

            </div>

        </div>
    )
}

export default withWeatherIcon(HourlyWeather)