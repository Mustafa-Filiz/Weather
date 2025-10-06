import { useQuery } from '@tanstack/react-query'
import { fullForecastSchema } from '../types/Forecast'
import customFetch from '../utils/customFetch'

export const getForecastData = (city: string) => {
  return customFetch(
    `/forecast.json?key=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&q=${city}&days=3&aqi=yes`,
    fullForecastSchema
  )
}

export const useGetForecastData = (city: string) => {
  const query = useQuery({
    queryKey: ['forecast', city],
    queryFn: () => getForecastData(city),
  })

  return query
}
