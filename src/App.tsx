import {
  AppShell,
  Autocomplete,
  Burger,
  Button,
  Flex,
  Group,
  MantineProvider,
  Text,
  Title,
  Typography,
} from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import './App.css'
import type { ForecastType } from './types/Forecast'
import { useEffect, useState } from 'react'
import { getForecastData } from './services/GetForecastData'
import ThemeToggleButton from './components/ThemeToggleButton'
import { useGeolocation } from './hooks/useGeolocation'
import { theme } from './utils/theme'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import HourlyWeatherCard from './components/HourlyWeatherCard'
import CurrentWeahterCard from './components/CurrentWeatherCard'

function App() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

  const [forecastData, setForecastData] = useState<ForecastType>(null)
  console.log('🚀 ~ App ~ forecastData:', forecastData)

  const {
    coords: { latitude, longitude },
    loading,
    error,
  } = useGeolocation({ watch: false })

  const form = useForm({
    initialValues: {
      searchValue: '',
    },
  })

  const getForecastAndSetState = (searchVal: string) => {
    getForecastData(searchVal).then((res) => setForecastData(res))
  }

  const handleSubmit = form.onSubmit((values: typeof form.values) => {
    getForecastAndSetState(values.searchValue)
  })

  useEffect(() => {
    if (latitude && longitude) {
      getForecastAndSetState(`${latitude},${longitude}`)
    }
  }, [latitude, longitude])

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error</div>
  }

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
            <Title order={3}>Weather App</Title>
            <form onSubmit={handleSubmit}>
              <Autocomplete
                key={form.key('searchValue')}
                {...form.getInputProps('searchValue')}
                placeholder="Search"
              />
            </form>
            <ThemeToggleButton is_day={forecastData?.current.is_day} />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          You can collapse the Navbar both on desktop and mobile. After sm
          breakpoint, the navbar is no longer offset by padding in the main
          element and it takes the full width of the screen when opened.
        </AppShell.Navbar>
        <AppShell.Main>
          <CurrentWeahterCard
            city={forecastData?.location.name}
            curr_temp_c={forecastData?.current.temp_c}
            description={forecastData?.current.condition.text}
            max_temp_c={forecastData?.forecast.forecastday[0].day.maxtemp_c}
            min_temp_c={forecastData?.forecast.forecastday[0].day.mintemp_c}
          />
          <Flex className="hourly-forecast-area" gap="sm" wrap="wrap" mt="md">
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
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  )
}

export default App
