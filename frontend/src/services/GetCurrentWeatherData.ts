import { useQuery } from '@tanstack/react-query'
import { currentWeatherSchema } from '../types/Forecast'
import customFetch from '../utils/customFetch'

export const getCurrentWeatherData = (city: string) => {
  return customFetch(
    `/current?city=${encodeURIComponent(city)}`,
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
