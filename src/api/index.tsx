import axios, { AxiosInstance } from 'axios'

const defaultOptions = {
  baseURL: 'https://6zdopblbig.execute-api.us-east-1.amazonaws.com/Test',
  headers: {
    'Content-Type': 'application/json',
  },
}

// Create instance
const instance: AxiosInstance = axios.create(defaultOptions)

const setToken = (token: string | null): void => {
  if (!token) {
    instance.defaults.headers.Authorization = undefined
  } else {
    instance.defaults.headers.Authorization = `Bearer ${token}`
  }
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
