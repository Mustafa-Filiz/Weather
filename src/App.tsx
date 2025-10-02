import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import './App.css'

function App() {
  return (
    <MantineProvider>
      <Notifications />
      {/* Your app here */}
    </MantineProvider>
  )
}

export default App
