/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosInstance } from 'axios'

const AWS_API_1 =
  process.env.NODE_ENV === 'development'
    ? '/api/aws1'
    : 'https://6zdopblbig.execute-api.us-east-1.amazonaws.com/Test'
const AWS_API_2 =
  process.env.NODE_ENV === 'development'
    ? '/api/aws2'
    : 'https://7qq5n63vjg.execute-api.us-east-1.amazonaws.com/Test'

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
  const response = await apiPost(`${AWS_API_2}/messages/send`, data)
  return response
}

const getContacts = async () => {
  const response = await apiGet(
    `${AWS_API_1}/recommendations?client=Thor_Ernstsson&number=20`
  )
  return response
}

export { instance, setToken, apiGet, apiPost, sendMessage, getContacts }
