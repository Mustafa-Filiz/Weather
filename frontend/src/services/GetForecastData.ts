import { useQuery } from '@tanstack/react-query'
import { fullForecastSchema } from '../types/Forecast'
import customFetch from '../utils/customFetch'
import { useSearchParams } from 'react-router'

export const getForecastData = async (city?: string) => {
  const response = await customFetch(
    `/forecast.json?key=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&q=${city}&days=3&aqi=yes`,
    fullForecastSchema
  )

  return response
}

export const useGetForecastData = () => {
  const [search] = useSearchParams()

  const query = useQuery({
    queryKey: ['forecast', search.get('search')],
    queryFn: () => getForecastData(search.get('search') || ''),
    enabled: !!search.get('search'),
  })

  return query
}
