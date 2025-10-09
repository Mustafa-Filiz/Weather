import { useCallback, useEffect } from 'react'
import { useGeolocation } from './useGeolocation'
import { useURLParams } from './useURLParams'

export const useSearchParam = () => {
  const {
    coords: { latitude, longitude },
  } = useGeolocation({ watch: false })

  const coords = latitude && longitude ? `${latitude},${longitude}` : undefined

  const { getParam, setParams } = useURLParams({
    ...(coords && { initialValues: { search: coords } }),
    replace: true,
  })

  const search = getParam('search') || ''

  const setSearch = useCallback(
    (newValue: string) => setParams({ search: newValue }),
    [setParams]
  )

  useEffect(() => {
    if (!coords) return
    setSearch(coords)
  }, [coords, setSearch])

  return { search, setSearch }
}
