import { ZodError, z } from 'zod'
import { errorNotification } from './notifications'

type RequestOptions = {
  params?: Record<string, string>
  init?: RequestInit
}

// class ApiResponseValidationError extends Error {
//   constructor(public validationErrors: ZodError) {
//     super('API response validation failed')
//   }
// }

async function customFetch<T>(
  url: string,
  responseSchema: z.ZodType<T>,
  options?: RequestOptions
): Promise<z.infer<typeof responseSchema>> {
  try {
    let finalUrl = `${import.meta.env.VITE_BASE_API_URL}${url}`

    if (options?.params) {
      const params = new URLSearchParams(options.params).toString()
      finalUrl += `?${params}`
    }

    const response = await fetch(finalUrl, {
      ...options?.init,
      credentials: 'include',
    })

    const data = await response.json()

    if (!response.ok) {
      errorNotification('Please try again later')
    }

    const validatedData = responseSchema.parse(data)

    return validatedData as z.infer<typeof responseSchema>
  } catch (error) {
    console.error(error)
    errorNotification('Please try again later')
    if (error instanceof ZodError) {
      console.error(error.format())
      // throw new ApiResponseValidationError(error)
    }
    // if (error instanceof Error) {
    //   throw new Error(error.message)
    // }
  }

  throw new Error('Unknown error')
}

export default customFetch
