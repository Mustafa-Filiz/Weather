import { useState, useEffect } from 'react'

type GeoCoords = {
    latitude: number | null
    longitude: number | null
    accuracy: number | null
}

type GeoState = {
    coords: GeoCoords
    loading: boolean
    error: string | null
}

type Options = {
    enableHighAccuracy?: boolean
    timeout?: number
    maximumAge?: number
    watch?: boolean
}

export function useGeolocation(options: Options = {}): GeoState {
    const [coords, setCoords] = useState<GeoCoords>({
        latitude: null,
        longitude: null,
        accuracy: null,
    })
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!('geolocation' in navigator)) {
            setError('Geolocation API is not supported')
            setLoading(false)
            return
        }

        const onSuccess = (pos: GeolocationPosition) => {
            setCoords({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                accuracy: pos.coords.accuracy,
            })
            setError(null)
            setLoading(false)
        }

        const onError = (err: GeolocationPositionError) => {
            setError(err.message)
            setLoading(false)
        }

        let watchId: number | null = null

        if (options.watch) {
            watchId = navigator.geolocation.watchPosition(
                onSuccess,
                onError,
                options
            )
        } else {
            navigator.geolocation.getCurrentPosition(
                onSuccess,
                onError,
                options
            )
        }

        return () => {
            if (watchId !== null) navigator.geolocation.clearWatch(watchId)
        }
    }, [])

    return { coords, loading, error }
}
