import {
  AppShell,
  Burger,
  Card,
  Flex,
  Group,
  Loader,
  Title,
} from '@mantine/core'
import './App.css'
import { useGetForecastData } from './services/GetForecastData'
import ThemeToggleButton from './components/ThemeToggleButton'
import { useDisclosure } from '@mantine/hooks'
import HourlyWeatherCard from './components/HourlyWeatherCard'
import CurrentWeahterCard from './components/CurrentWeatherCard'
import ForecastCard from './components/ForecastCard'
import AqiCard from './components/AqiCard'
import Navbar from './components/Navbar'
import { useSearchParams } from 'react-router'
import { useGeolocation } from './hooks/useGeolocation'
import { useEffect } from 'react'

function App() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

  const {
    coords: { latitude, longitude },
  } = useGeolocation({ watch: false })

  const coords = latitude && longitude ? `${latitude},${longitude}` : null

  const [_, setSearch] = useSearchParams()

  const { data: forecastData, isLoading } = useGetForecastData()

  useEffect(() => {
    if (!coords) return

    setSearch({ search: coords })
  }, [coords])

  return (
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
          <Title order={2} flex={1}>
            Weather App
          </Title>
          <ThemeToggleButton is_day={forecastData?.current.is_day} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main className="mantine-main">
        {isLoading ? (
          <Loader color="blue" type="dots" className="loader" />
        ) : (
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
        )}
      </AppShell.Main>
    </AppShell>
  )
}

export default App
