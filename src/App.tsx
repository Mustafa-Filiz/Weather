import {
  AppShell,
  Autocomplete,
  Burger,
  Card,
  Flex,
  Group,
  MantineProvider,
  Stack,
  Title,
} from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import './App.css'
import { useGetForecastData } from './services/GetForecastData'
import ThemeToggleButton from './components/ThemeToggleButton'
import { useGeolocation } from './hooks/useGeolocation'
import { theme } from './utils/theme'
import { useDisclosure, useLocalStorage } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import HourlyWeatherCard from './components/HourlyWeatherCard'
import CurrentWeahterCard from './components/CurrentWeatherCard'
import ForecastCard from './components/ForecastCard'
import { useEffect, useState } from 'react'

import FavPlaceCard from './components/FavPlaceCard'
import AqiCard from './components/AqiCard'

function App() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

  const [searchVal, setSearchVal] = useState('')

  const {
    coords: { latitude, longitude },
  } = useGeolocation({ watch: false })

  const coords = latitude && longitude ? `${latitude},${longitude}` : undefined
  const { data: forecastData } = useGetForecastData(searchVal)

  const [historyItems, setHistoryItems] = useLocalStorage<string[]>({
    key: 'history',
    defaultValue: [],
  })
  const [favPlaces] = useLocalStorage<string[]>({
    key: 'favPlaces',
    defaultValue: [],
  })

  const form = useForm({
    initialValues: {
      searchValue: '',
    },
  })

  const handleSubmit = form.onSubmit((values: typeof form.values) => {
    setSearchVal(values.searchValue)
    setHistoryItems((prev) =>
      [
        values.searchValue,
        ...prev.filter((item) => item !== values.searchValue),
      ].slice(0, 10)
    )
    form.setValues({ searchValue: '' })
  })

  useEffect(() => {
    if (!coords) return

    setSearchVal(coords)
  }, [coords])

  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <AppShell
        padding="md"
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: {
            mobile: !mobileOpened,
            desktop: !desktopOpened,
          },
        }}
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <Title order={2}>Weather App</Title>

            <ThemeToggleButton is_day={forecastData?.current.is_day} />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <form onSubmit={handleSubmit}>
            <Autocomplete
              key={form.key('searchValue')}
              {...form.getInputProps('searchValue')}
              placeholder="Search"
              data={historyItems}
              radius="lg"
            />
          </form>

          <Stack mt="md" gap="md">
            {favPlaces.map((place, index) => (
              <FavPlaceCard key={index} city={place} />
            ))}
          </Stack>
        </AppShell.Navbar>
        <AppShell.Main>
          <div className="main-content">
            <CurrentWeahterCard
              city={forecastData?.location.name}
              curr_temp_c={forecastData?.current.temp_c}
              description={forecastData?.current.condition.text}
              max_temp_c={forecastData?.forecast.forecastday[0].day.maxtemp_c}
              min_temp_c={forecastData?.forecast.forecastday[0].day.mintemp_c}
            />
            <Card withBorder radius="lg" p={0} my="md">
              <Flex className="hourly-forecast-area" gap="sm" wrap="wrap">
                {forecastData
                  ? forecastData.forecast.forecastday[0].hour.map((data) => (
                      <HourlyWeatherCard
                        key={data.time_epoch}
                        time={data.time}
                        description={data.condition.text}
                        icon={data.condition.icon}
                        temp_c={data.temp_c}
                      />
                    ))
                  : null}
              </Flex>
            </Card>
            <Group grow align="stretch">
              <ForecastCard
                forecastData={forecastData?.forecast.forecastday}
                currentTemp={forecastData?.current.temp_c}
              />
              <AqiCard
                aqi_index={forecastData?.current.air_quality['us-epa-index']}
              />
            </Group>
          </div>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  )
}

export default App
