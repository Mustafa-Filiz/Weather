import { Card, Slider, Text, Title } from '@mantine/core'
import classes from './AqiCard.module.css'
import type { FC } from 'react'
import { AIR_QUALITY_INDEX } from '../../constants/airQualityIndex'

type Props = {
  aqi_index?: number
}

const AqiCard: FC<Props> = ({ aqi_index }) => {
  return (
    <Card withBorder radius="lg">
      <Title order={6}>Air Quality</Title>
      <Text className={classes.description}>
        {aqi_index ? AIR_QUALITY_INDEX[aqi_index - 1] : 'N/A'}
      </Text>
      <Slider
        classNames={{
          bar: classes.bar,
          thumb: classes.thumb,
        }}
        domain={[1, 6]}
        value={10}
        showLabelOnHover={false}
        marks={[
          {
            value: aqi_index || 0,
          },
        ]}
      />
    </Card>
  )
}

export default AqiCard
