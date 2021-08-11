/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosInstance } from 'axios'

const AWS_API_1 =
  process.env.NODE_ENV === 'development'
    ? '/api/aws1'
    : 'https://6zdopblbig.execute-api.us-east-1.amazonaws.com/Test'
const AWS_API_2 =
  process.env.NODE_ENV === 'development'
    ? '/api/aws2'
    : 'https://3t8fpn6j0e.execute-api.us-east-1.amazonaws.com/Test'

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

const getMetrics = () =>
  apiGet(`${AWS_API_2}/dash/metrics`)
    .then((res) => res)
    .catch((err) => err)

const getAuth = () =>
  apiGet(`${AWS_API_2}/client/authorization`)
    .then((res) => res)
    .catch((err) => err)

const sendMessage = (data: SendMessageData) =>
  apiPost(`${AWS_API_2}/messages/send`, data)
    .then((res) => res)
    .catch((err) => err)

const getContacts = () =>
  apiGet(`${AWS_API_1}/dash/recommendations`, { number: '1' })
    .then((res) => res)
    .catch((err) => err)

export { instance, setToken, sendMessage, getContacts, getAuth, getMetrics }
