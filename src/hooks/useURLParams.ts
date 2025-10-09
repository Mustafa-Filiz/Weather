import { useCallback, useEffect, useState } from 'react'

type Params = Record<string, string>
interface Options {
  initialValues?: Params
  replace?: boolean
}

const getURLParams = (): Params => {
  const searchParams = new URLSearchParams(window.location.search)
  const params: Params = {}
  searchParams.forEach((value, key) => {
    params[key] = value
  })
  return params
}

export const useURLParams = (options?: Options) => {
  const { initialValues = {}, replace = false } = options || {}

  const [params, setParamsState] = useState<Params>(() => getURLParams())

  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      const searchParams = new URLSearchParams(window.location.search)
      let needUpdate = false
      Object.entries(initialValues).forEach(([key, value]) => {
        if (!searchParams.has(key)) {
          searchParams.set(key, value)
          needUpdate = true
        }
      })
      if (needUpdate) {
        const newUrl =
          window.location.pathname +
          (searchParams.toString() ? `?${searchParams.toString()}` : '')
        if (replace) {
          window.history.replaceState(null, '', newUrl)
        } else {
          window.history.pushState(null, '', newUrl)
        }
        setParamsState(getURLParams())
      }
    }
  }, [])

  useEffect(() => {
    const handler = () => setParamsState(getURLParams())
    window.addEventListener('popstate', handler)
    window.addEventListener('pushstate', handler)
    window.addEventListener('replacestate', handler)
    return () => {
      window.removeEventListener('popstate', handler)
      window.removeEventListener('pushstate', handler)
      window.removeEventListener('replacestate', handler)
    }
  }, [])

  const setParams = useCallback(
    (newParams: Partial<Params>, setOptions?: { replace?: boolean }) => {
      const searchParams = new URLSearchParams(window.location.search)
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          searchParams.delete(key)
        } else {
          searchParams.set(key, value)
        }
      })
      const newUrl =
        window.location.pathname +
        (searchParams.toString() ? `?${searchParams.toString()}` : '')
      if (setOptions?.replace) {
        window.history.replaceState(null, '', newUrl)
      } else {
        window.history.pushState(null, '', newUrl)
      }
      setParamsState(getURLParams())
    },
    []
  )

  const getParam = useCallback((key: string) => params[key] ?? null, [params])

  return { params, getParam, setParams }
}
