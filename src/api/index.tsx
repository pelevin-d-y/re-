/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosInstance } from 'axios'
import { logInLink, LS_ID_TOKEN } from 'src/helpers/variables'

const AWS_API =
  process.env.NODE_ENV === 'development'
    ? '/api/aws'
    : 'https://3t8fpn6j0e.execute-api.us-east-1.amazonaws.com/Test'

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// Create instance
const instance: AxiosInstance = axios.create(defaultOptions)

instance.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response.status === 401) {
      document.location.href = logInLink
    }
    return error
  }
)

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
  apiGet(`${AWS_API}/dash/metrics`)
    .then((res) => res)
    .catch((err) => err)

const getAuth = () =>
  apiGet(`${AWS_API}/client/authorization`)
    .then((res) => res)
    .catch((err) => err)

const getContact = () =>
  apiGet(`${AWS_API}/client/contact`)
    .then((res) => res)
    .catch((err) => err)

const getRecommendations = () =>
  apiGet(`${AWS_API}/dash/recommendations`, { number: '20' })
    .then((res) => res)
    .catch((err) => err)

const getContactsMutable = () =>
  apiGet(`${AWS_API}/contacts/mutable`, {
    id: '00000000-0000-0000-0000-000000000000',
  })
    .then((res) => res)
    .catch((err) => err)

const getContactsSearch = (email: string, name?: string) =>
  apiGet(`${AWS_API}/contacts/search`, { email: email || '', name: name || '' })
    .then((res) => res)
    .catch((err) => err)

const getMessagesRead = (id: string) =>
  apiGet(`${AWS_API}/messages/read`, { id })
    .then((res) => res)
    .catch((err) => err)

const sendMessage = (data: SendMessageData) =>
  apiPost(`${AWS_API}/messages/send`, data)
    .then((res) => res)
    .catch((err) => err)

const postClientContact = (data: any) =>
  apiPost(`${AWS_API}/contacts/mutable`, data)
    .then((res) => res)
    .catch((err) => err)

export {
  instance,
  setToken,
  sendMessage,
  getRecommendations,
  getAuth,
  getMetrics,
  getContact,
  getContactsMutable,
  getContactsSearch,
  getMessagesRead,
  postClientContact,
}
