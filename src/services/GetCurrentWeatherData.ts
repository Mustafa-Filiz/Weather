import { useQuery } from '@tanstack/react-query'
import { currentWeatherSchema } from '../types/Forecast'
import customFetch from '../utils/customFetch'

export const getCurrentWeatherData = (city: string) => {
  return customFetch(
    `/current.json?key=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&q=${city}&aqi=yes`,
    currentWeatherSchema
  )
}

export const useGetCurrentWeatherData = (city: string) => {
  const query = useQuery({
    queryKey: ['current', city],
    queryFn: () => getCurrentWeatherData(city),
  })

  return query
}
