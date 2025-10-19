import { ActionIcon, Card, Group, NumberFormatter, Stack } from '@mantine/core'
import { useState, type FC } from 'react'
import NumberUtility from '../../utils/NumberUtility'
import classes from './CurrentWeatherCard.module.css'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { useLocalStorage } from '@mantine/hooks'

type Props = {
  city?: string
  curr_temp_c?: number
  description?: string
  max_temp_c?: number
  min_temp_c?: number
}

const CurrentWeahterCard: FC<Props> = ({
  city,
  curr_temp_c,
  description,
  max_temp_c,
  min_temp_c,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const [favPlaces, setFavPlaces] = useLocalStorage<string[]>({
    key: 'favPlaces',
    defaultValue: [],
  })

  const isFav = city ? favPlaces.includes(city) : false

  const toggleFav = () => {
    if (!city) return
    if (isFav) {
      setFavPlaces((prev) => prev.filter((place) => place !== city))
    } else {
      setFavPlaces((prev) => [...prev, city])
    }
  }

  return (
    <Card
      className={classes.card}
      padding="md"
      radius="lg"
      withBorder
      w={240}
      m="auto"
    >
      <ActionIcon
        className={classes.like}
        variant="default"
        radius="md"
        size={36}
        onClick={toggleFav}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isFav || isHovered ? <FaHeart /> : <FaRegHeart />}
      </ActionIcon>
      <Stack align="center">
        <h3 className={classes.cityName}>{city}</h3>
        <div className={classes.currentTemp}>
          <NumberFormatter
            value={NumberUtility.roundNumber(curr_temp_c)}
            suffix="°"
          />
        </div>
        <div className={classes.desc}>{description}</div>
        <div className="temp-range">
          <Group>
            <div className="max-temp">
              H:{' '}
              <NumberFormatter
                value={NumberUtility.roundNumber(max_temp_c)}
                suffix="°"
              />
            </div>
            <div className="min-temp">
              L:{' '}
              <NumberFormatter
                value={NumberUtility.roundNumber(min_temp_c)}
                suffix="°"
              />
            </div>
          </Group>
        </div>
      </Stack>
    </Card>
  )
}

export default CurrentWeahterCard
