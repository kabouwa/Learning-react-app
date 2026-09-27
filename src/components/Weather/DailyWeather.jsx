import Divider from "../Utilities/Divider";
import StatCard from "../Cards/StatCard";
import { motion } from "framer-motion";
import withWeatherIcon from "./withWeatherIcon";
import { Droplets } from "lucide-react";

function DailyWeather({ dailyWeather, getWeatherIcon } ){
    const { daily , daily_units:units } = dailyWeather;
    const { time , temperature_2m_min:min_temp, temperature_2m_max:max_temp, precipitation_sum:sum_precip, weather_code:codes } = daily;

    return (
        <div className="flex-1 flex flex-col justify-between items-center gap-4 py-4 px-2 w-full max-w-4xl mx-auto">
            <h1 className="display-4 text-center font-bold mb-8">
                    Weather Of This Week
             </h1>
            
            {/* Daily Weather Temperature */}
            
            <div className="flex-1 py-4 px-4 mx-auto rounded-xl bg-white/99 flex flex-col gap-2.5 dark:bg-gray-800 w-full rounded-xl">
                {
                    time?.map((date, index) => (
                        <motion.div key={index} whileHover={{ y: '-7px'}} key={index} className="flex gap-3 justify-between items-center hover:bg-gray-200 dark:hover:bg-gray-500 ring ring-indigo-500 rounded-xl px-5    ">
                            <p className="font-bold">
                                {date}
                            </p>

                            <div className="grid grid-cols-4 items-center gap-2">
                                <p className="mr-auto">
                                    {sum_precip.slice(0,2)} {units.precipitation_sum}
                                    <Droplets className="inline" />
                                </p>

                                <div className="">
                                    {getWeatherIcon(codes[index], 'mx-auto', 40)}
                                </div>
                                

                                <p className="font-medium text-xl grid grid-cols-3 col-span-2">
                                    <span>{min_temp[index]} °</span>
                                    <span className="text-center">—</span>
                                    <span>{max_temp[index]} °</span>  
                                </p>

                            </div>

                        </motion.div>
                    ))
                }

            </div>

        </div>
    )
}

export default withWeatherIcon(DailyWeather);