import { Card, Image, NumberFormatter, Stack, Tooltip } from '@mantine/core'
import { type FC } from 'react'
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

  return (
    <Card className={classes.card} p="xs">
      <Stack align="center" gap={0}>
        <p className={classes.hour}>{hour}</p>
        <Card.Section>
          <Tooltip label={description}>
            <Image h={48} w="auto" fit="contain" src={icon} radius="md" />
          </Tooltip>
        </Card.Section>
        <p className={classes.temp}>
          <NumberFormatter
            value={NumberUtility.roundNumber(temp_c)}
            suffix="°C"
          />
        </p>
      </Stack>
    </Card>
  )
}

export default HourlyWeatherCard
