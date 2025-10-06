import {
  Card,
  Divider,
  Group,
  Image,
  NumberFormatter,
  RangeSlider,
  Text,
  Title,
} from '@mantine/core'
import { Fragment, type FC } from 'react'
import { FaCalendarDays } from 'react-icons/fa6'
import type { ForecastDayType } from '../../types/Forecast'
import DateUtility from '../../utils/DateUtility'
import NumberUtility from '../../utils/NumberUtility'
import classes from './ForecastCard.module.css'

type Props = {
  forecastData?: ForecastDayType[]
  currentTemp?: number
}

const ForecastCard: FC<Props> = ({ forecastData, currentTemp }) => {
  const minSliderValue = NumberUtility.roundNumber(
    NumberUtility.findMin(forecastData?.map((day) => day.day.mintemp_c))
  )
  const maxSliderValue = NumberUtility.roundNumber(
    NumberUtility.findMax(forecastData?.map((day) => day.day.maxtemp_c))
  )

  return (
    <Card
      className={classes.forecastCard}
      withBorder
      padding="md"
      radius="lg"
      my="md"
    >
      <Title order={6}>
        <FaCalendarDays /> 3 Day Forecast
      </Title>
      <Divider my="sm" />
      {forecastData?.map((day, index) => (
        <Fragment key={day.date_epoch}>
          <Group justify="space-between" gap="md">
            <Text w="15%">
              {index === 0 ? 'Today' : DateUtility.getDayName(day.date)}
            </Text>
            <Image h={32} w="10%" fit="contain" src={day.day.condition.icon} />
            <Group gap="xs" w="60%" align="center">
              <NumberFormatter
                value={NumberUtility.roundNumber(day.day.mintemp_c)}
                suffix="°"
              />
              <RangeSlider
                w="60%"
                domain={[minSliderValue, maxSliderValue]}
                defaultValue={[
                  NumberUtility.roundNumber(day.day.mintemp_c),
                  NumberUtility.roundNumber(day.day.maxtemp_c),
                ]}
                showLabelOnHover={false}
                {...(index === 0 && { marks: [{ value: currentTemp || 0 }] })}
                thumbSize={1}
                disabled
              />
              <NumberFormatter
                value={NumberUtility.roundNumber(day.day.maxtemp_c)}
                suffix="°"
              />
            </Group>
          </Group>
          {index !== forecastData.length - 1 && <Divider my="sm" />}
        </Fragment>
      ))}
    </Card>
  )
}

export default ForecastCard
