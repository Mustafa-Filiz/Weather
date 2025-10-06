import { z } from 'zod'

export const locationSchema = z.object({
  name: z.string(),
  region: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
  tz_id: z.string(),
  localtime_epoch: z.number(),
  localtime: z.string(),
})

export const conditionSchema = z.object({
  text: z.string(),
  icon: z.string(),
  code: z.number(),
})

export const airQualitySchema = z.object({
  co: z.number(),
  no2: z.number(),
  o3: z.number(),
  so2: z.number(),
  pm2_5: z.number(),
  pm10: z.number(),
  'us-epa-index': z.number(),
  'gb-defra-index': z.number(),
})

export const currentSchema = z.object({
  last_updated_epoch: z.number(),
  last_updated: z.string(),
  temp_c: z.number(),
  is_day: z.number(),
  condition: conditionSchema,
  feelslike_c: z.number(),
  air_quality: airQualitySchema,
})

export const daySchema = z.object({
  maxtemp_c: z.number(),
  mintemp_c: z.number(),
  avgtemp_c: z.number(),
  condition: conditionSchema,
})

export const hourSchema = z.object({
  time_epoch: z.number(),
  time: z.string(),
  temp_c: z.number(),
  is_day: z.number(),
  condition: conditionSchema,
  feelslike_c: z.number(),
})

export const forecastDaySchema = z.object({
  date: z.string(),
  date_epoch: z.number(),
  day: daySchema,
  hour: z.array(hourSchema),
})

export const forecastSchema = z.object({
  forecastday: z.array(forecastDaySchema),
})

export const fullForecastSchema = z.object({
  location: locationSchema,
  current: currentSchema,
  forecast: forecastSchema,
})

export const currentWeatherSchema = fullForecastSchema.omit({ forecast: true })

export type ForecastType = z.infer<typeof fullForecastSchema> | null
export type ForecastDayType = z.infer<typeof forecastDaySchema>
export type CurrentWeatherType = z.infer<typeof currentWeatherSchema> | null
export type HourType = z.infer<typeof hourSchema>
