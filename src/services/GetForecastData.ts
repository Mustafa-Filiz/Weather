import { fullForecastSchema } from '../types/Forecast'
import customFetch from '../utils/customFetch'

export const getForecastData = (city: string) => {
    return customFetch(
        `/forecast.json?key=${
            import.meta.env.VITE_WEATHER_API_KEY
        }&q=${city}&days=3`,
        fullForecastSchema
    )
}
