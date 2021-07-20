/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosInstance } from 'axios'

const defaultOptions = {
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

const apiPost = (url: string, data: any, params?: Params): Promise<any> =>
  instance.post(url, data, {
    params,
  })

const sendMessage = async (data: SendMessageData) => {
  const resp = await apiPost('/api/aws2/messages/send', data)
  return resp
}

export { instance, setToken, apiGet, apiPost, sendMessage }
