import { Card, Image, NumberFormatter, Stack, Tooltip } from '@mantine/core'
import { useEffect, useRef, type FC } from 'react'
import DateUtility from '../../utils/DateUtility'
import NumberUtility from '../../utils/NumberUtility'
import classes from './HourlyWeatherCard.module.css'

type Props = {
  description?: string
  time?: string
  temp_c?: number
  icon?: string
}

const HourlyWeatherCard: FC<Props> = ({ description, time, temp_c, icon }) => {
  const hour = DateUtility.getHour(time)
  const currHour = DateUtility.getCurrentHour()

  const currHourRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hour === currHour && currHourRef.current) {
      currHourRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    }
  }, [hour, currHour])

  return (
    <Card
      className={classes.card}
      style={
        hour === currHour
          ? { backgroundColor: 'var(--mantine-color-gray-3' }
          : {}
      }
      p="xs"
      {...(hour === currHour ? { ref: currHourRef } : {})}
    >
      <Stack align="center" gap={0}>
        <p className={classes.hour}>{hour === currHour ? 'Now' : hour} </p>
        <Card.Section>
          <Tooltip label={description}>
            <Image h={48} w="auto" fit="contain" src={icon} radius="md" />
          </Tooltip>
        </Card.Section>
        <p className={classes.temp}>
          <NumberFormatter
            value={NumberUtility.roundNumber(temp_c)}
            suffix="°"
          />
        </p>
      </Stack>
    </Card>
  )
}

export default HourlyWeatherCard
