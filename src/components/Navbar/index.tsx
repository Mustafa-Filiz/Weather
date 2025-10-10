import { Autocomplete, Stack } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import FavPlaceCard from '../FavPlaceCard'
import { useForm } from '@mantine/form'
import { useSearchParams } from 'react-router'

const Navbar = () => {
  const [_, setSearch] = useSearchParams()

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
    setSearch({ search: values.searchValue })
    setHistoryItems((prev) =>
      [
        values.searchValue,
        ...prev.filter((item) => item !== values.searchValue),
      ].slice(0, 10)
    )
    form.setValues({ searchValue: '' })
  })

  const handleOptionSubmit = (value: string) => {
    setSearch({ search: value })
    setHistoryItems((prev) =>
      [value, ...prev.filter((item) => item !== value)].slice(0, 10)
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          key={form.key('searchValue')}
          {...form.getInputProps('searchValue')}
          onOptionSubmit={handleOptionSubmit}
          clearable
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
    </div>
  )
}

export default Navbar
