import { Cloud, CloudFog, CloudLightning, CloudRainWind, CloudSun, CloudSunRain,Sun } from "lucide-react";

export default function withWeatherIcon(OriginalComponent) {


    const newComponent = (props) => {

        const getWeatherIcon = (weatherCode, classes, size = 50) => {
            const w = weatherCode;
            let Icon = Cloud;

            if ( [0].includes(w)         ) Icon = Sun;
            if ( [1, 2].includes(w)      ) Icon = CloudSun;
            if ( [3].includes(w)         ) Icon = Cloud;
            if ( [45, 48].includes(w)    ) Icon = CloudFog;
            if ( [51, 53, 55].includes(w)) Icon = CloudSunRain;
            if ( [61, 63, 65].includes(w)) Icon = CloudRainWind;
            if ( [71, 73, 75].includes(w)) Icon = CloudSunRain;
            if ( [95, 96, 99].includes(w)) Icon = CloudLightning;

            return <Icon size={size} className={classes} />
        }

        return <OriginalComponent getWeatherIcon={getWeatherIcon} {...props} />

    }

    return newComponent;
}