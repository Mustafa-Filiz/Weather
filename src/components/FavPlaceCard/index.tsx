import { Box, Card, Group, NumberFormatter, Text } from '@mantine/core'
import { type FC } from 'react'
import classes from './FavPlaceCard.module.css'
import { useGetCurrentWeatherData } from '../../services/GetCurrentWeatherData'
import DateUtility from '../../utils/DateUtility'
import NumberUtility from '../../utils/NumberUtility'

type Props = {
  city: string
}

const FavPlaceCard: FC<Props> = ({ city }) => {
  const { data: weatherData } = useGetCurrentWeatherData(city)

  return (
    <Card withBorder p="xs" radius="lg">
      <Group justify="space-between" mb="xs" align="flex-start">
        <Box>
          <Text className={classes.cityName}>{weatherData?.location.name}</Text>
          <Text className={classes.time}>
            {DateUtility.displayTime(weatherData?.location.localtime)}
          </Text>
        </Box>
        <Text className={classes.temperature}>
          <NumberFormatter
            value={NumberUtility.roundNumber(weatherData?.current.temp_c)}
            suffix="°"
          />
        </Text>
      </Group>
      <Group justify="space-between" align="flex-start">
        <Text className={classes.description}>
          {weatherData?.current.condition.text}
        </Text>
        <Group gap="xs">
          <Text className={classes.max_temp}>
            H: <NumberFormatter value={25} suffix="°" />
          </Text>
          <Text className={classes.min_temp}>
            L: <NumberFormatter value={15} suffix="°" />
          </Text>
        </Group>
      </Group>
    </Card>
  )
}

export default FavPlaceCard
