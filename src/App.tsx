import { Button, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import './App.css'
import type { Forecast } from './types/Forecast';
import {  useEffect, useState } from 'react';
import { getForecastData } from './services/GetForecastData';
import ThemeToggleButton from './components/ThemeToggleButton';
import { useGeolocation } from './hooks/useGeolocation';


function App() {

  const [forecastData, setForecastData] = useState<Forecast>(null);
  console.log("🚀 ~ App ~ forecastData:", forecastData)

  const {coords:{latitude, longitude, accuracy}, loading, error} = useGeolocation({watch:false})
  console.log("🚀 ~ App ~ accuracy:", accuracy)

  useEffect(() => {
    if (latitude && longitude) {
      getForecastData(`${latitude},${longitude}`).then(res => setForecastData(res))
    }
  },[latitude, longitude])

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <MantineProvider>
      <Notifications />
      {/* <Button onClick={() => {
        getForecastData('Ingolstadt').then(data => {
          setForecastData(data);

        });
      }}>
        Ingolstadt Weather  
      </Button> */}
      <ThemeToggleButton is_day={1} />
    </MantineProvider>
  )
}

export default App
