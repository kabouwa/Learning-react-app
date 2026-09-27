import { Clock, Cloud, CloudFog, CloudLightning, CloudRain, CloudRainWind, CloudSun, CloudSunRain, Droplets, Gauge, MapPin, Sun, Sunrise, Sunset, Thermometer, Wind } from "lucide-react";
import Divider from "../Utilities/Divider";
import StatCard from "../Cards/StatCard";
import { motion } from "framer-motion";

export default function TodayWeather({ currentWeather, city } ){
    const { current:curr , current_units:units, daily } = currentWeather;
    const { properties:cProps } = city;


    const getGreeting = () => {
        const hour = new Date().getHours();
        const temp = curr?.temperature_2m;
        const cityName = cProps?.name;

        // Extreme temp
        if (temp >= 35) return "It's Scorching";
        if (temp <= 5) return "It's Freezing";

        // Grreting by time
        if (hour >= 5 && hour < 12) return "Good Morning " + cityName;
        if (hour >= 12 && hour < 17) return "Good Afternoon " + cityName;
        if (hour >= 17 && hour < 21) return "Good Evening " + cityName;
        return "Good Night " + cityName;
    }
    
    const getWeatherIcon = (size = 200) => {
        const w = curr?.weather_code;
        let Icon = Cloud;

        if ( [0].includes(w)         ) Icon = Sun;
        if ( [1, 2].includes(w)      ) Icon = CloudSun;
        if ( [3].includes(w)         ) Icon = Cloud;
        if ( [45, 48].includes(w)    ) Icon = CloudFog;
        if ( [51, 53, 55].includes(w)) Icon = CloudSunRain;
        if ( [61, 63, 65].includes(w)) Icon = CloudRainWind;
        if ( [71, 73, 75].includes(w)) Icon = CloudSunRain;
        if ( [95, 96, 99].includes(w)) Icon = CloudLightning;

        return <Icon size={size} />
    }


    return (
        <div className="flex-1 flex flex-col justify-between items-center gap-4 py-4 px-2 max-w-4xl mx-auto">

            {/* City Information */}
            <div>
                <h1 className="display-4 text-indigo-500 dark:text-indigo-400 text-center font-bold mb-8">
                    Today Weather
                </h1>

                <p className="m-0 text-xl text-center display-6">
                    {cProps?.name}, {cProps?.country_code?.toUpperCase()} <MapPin className="inline-block m-0 mb-2" />
                </p>

                <motion.p whileHover={{ scale : 1.03 }} className="m-0 text-sm bg-white/30 rounded text-center py-0.5 my-1">
                    {city.date.toString()} <Clock size={20} strokeWidth={0.8} className="inline-block m-0 mb-1" />
                </motion.p>
            </div>

            {/* Weather Icon */}
            <motion.div transition={{repeat: Infinity, ease: 'easeInOut', duration: 3}} animate={{ y: ['20px', '-20px', '20px']}} className="my-4">
                {getWeatherIcon()}
            </motion.div>  

            {/* Weather Temperature */}
            <div>
                <p className="display-4">
                    {curr?.temperature_2m} {units?.temperature_2m} 
                    <Thermometer size={50} className="inline-block text-4xl mb-2 ml-3 text-yellow-500" />
                </p>
                <p className="text-center  text-gray-400 dark:text-gray-300">
                    {getGreeting(20)} !
                </p>
                <Divider />
            </div>

            {/* Sunrise And Sunset */}
            <div className="flex gap-2 md:gap-0 self-stretch ">
                <StatCard icon={Sunrise} label='Sunrise' color="text-slate-500" bg="bg-slate-100" classes="flex-1"
                    value={daily?.sunrise[0]?.split('T')[1]} />

                {/* <Spline size={240} className="hidden md:inline-block rotate-45" /> */}

                <StatCard icon={Sunset} label='Sunset' color="text-slate-500" bg="bg-slate-100" classes="flex-1"
                    value={daily?.sunset[0]?.split('T')[1]} />
            </div>

            {/* Weather Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <StatCard icon={CloudRain} label='Precipitation' color="text-blue-500" bg="bg-blue-100" 
                    value={curr?.precipitation + ' ' + units?.precipitation} />

                <StatCard icon={Droplets} label='Humidity' color="text-cyan-500" bg="bg-cyan-100"
                    value={curr?.relative_humidity_2m + ' ' + units?.relative_humidity_2m} />

                <StatCard icon={Wind} label='Wind Speed' color="text-purple-500" bg="bg-purple-100"
                    value={curr?.wind_speed_10m + ' ' + units?.wind_speed_10m} />

                <StatCard icon={Gauge} label='Pressure' color="text-yellow-500" bg="bg-yellow-100"
                    value={curr?.pressure_msl + ' ' + units?.pressure_msl} />
            </div>

            
        </div>
    )
}