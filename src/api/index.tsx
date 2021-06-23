import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const defaultOptions = {
  baseURL: 'https://6zdopblbig.execute-api.us-east-1.amazonaws.com/Test',
  headers: {
    'Content-Type': 'application/json',
  },
}

// Create instance
const instance: AxiosInstance = axios.create(defaultOptions)

const setToken = (): void => {
  instance.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      const newConfig = config
      const token = localStorage.getItem('token')
      newConfig.headers.Authorization = token ? `Bearer ${token}` : ''
      return newConfig
    }
  )
}

type Params = {
  [key: string]: string
}

const apiGet = (url: string, params?: Params): Promise<any> =>
  instance.get(url, {
    params,
  })

const apiPost = (url: string, params: Params): Promise<any> =>
  instance.get(url, {
    params,
  })

export { instance, setToken, apiGet, apiPost }
