/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosError, AxiosInstance } from 'axios'
import { logInLink } from 'src/helpers/variables'

const AWS_API =
  process.env.NODE_ENV === 'development'
    ? '/api/aws'
    : 'https://e8llia7s3h.execute-api.us-east-1.amazonaws.com/Test'

const defaultOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

// Create instance
const instance: AxiosInstance = axios.create(defaultOptions)

instance.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.isAxiosError) {
      const ae = error as AxiosError
      if (ae.response?.status === 401) {
        document.location.href = logInLink
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

const setToken = (token: string | null): void => {
  if (!token) {
    instance.defaults.headers.Authorization = undefined
  } else {
    instance.defaults.headers.Authorization = `Bearer ${token}`
  }
}

type Params =
  | {
      [key: string]: string
    }
  | URLSearchParams

const apiGet = (url: string, params?: Params): Promise<any> =>
  instance.get(url, {
    params,
  })

const apiPost = (url: string, data?: any, params?: Params): Promise<any> =>
  instance.post(url, data, {
    params,
  })

const getMetrics = () =>
  apiGet(`${AWS_API}/dash/metrics`)
    .then((res) => res)
    .catch((err) => Promise.reject(err))

const getAuth = () =>
  apiGet(`${AWS_API}/client/authorization`)
    .then((res) => res)
    .catch((err) => Promise.reject(err))

const getAuthUrl = (ids?: string[]) =>
  apiGet(`${AWS_API}/client/authorization_url`)
    .then((res) => res)
    .catch((err) => Promise.reject(err))

const getContact = () =>
  apiGet(`${AWS_API}/client/contact`)
    .then((res) => res)
    .catch((err) => Promise.reject(err))

const getRecommendations = () =>
  apiGet(`${AWS_API}/dash/recommendations`, { number: '20' })
    .then((res: RecsResponse) => res.data.recommendations)
    .catch((err) => Promise.reject(err))

const getContactsMutable = (ids: string[]) => {
  const params = new URLSearchParams()
  ids.forEach((id) => params.append('id', id))

  return apiGet(`${AWS_API}/contacts/mutable`, params)
    .then((res) => res)
    .catch((err) => Promise.reject(err))
}

const getContactsMessages = (id: string) =>
  apiGet(`${AWS_API}/contacts/messages`, { id })
    .then((res) => res)
    .catch((err) => Promise.reject(err))

const getMessagesRead = (id: string) =>
  apiGet(`${AWS_API}/messages/read`, { id })
    .then((res) => res)
    .catch((err) => Promise.reject(err))

const getPlaylists = () =>
  apiGet(`${AWS_API}/playlists`)
    .then((res: ListsRequest) => res)
    .catch((err) => Promise.reject(err))

const getPlaylistsData = (ids: string[]) => {
  const params = new URLSearchParams()
  ids.forEach((id) => params.append('id', id))

  return apiGet(`${AWS_API}/playlists`, params)
    .then((res: { data: Lists }) => res)
    .catch((err) => Promise.reject(err))
}

const sendMessage = (data: SendMessageData) =>
  apiPost(`${AWS_API}/messages/send`, data)
    .then((res) => res)
    .catch((err) => Promise.reject(err))

const postRecommendations = () =>
  apiPost(`${AWS_API}/dash/recommendations`)
    .then((res) => res)
    .catch((err) => Promise.reject(err))

const postPlaylists = (data: Playlists) =>
  apiPost(`${AWS_API}/playlists`, data)
    .then((res: ListRequest) => res)
    .catch((err) => Promise.reject(err))

const postContactsSearch = (name: string): Promise<string[]> =>
  apiPost(`${AWS_API}/contacts/search`, {
    type: 'name',
    data: name,
  })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err))

export {
  instance,
  setToken,
  sendMessage,
  getRecommendations,
  getAuth,
  getAuthUrl,
  getMetrics,
  getContact,
  getContactsMutable,
  getContactsMessages,
  postContactsSearch,
  getMessagesRead,
  getPlaylists,
  getPlaylistsData,
  postPlaylists,
  postRecommendations,
}
