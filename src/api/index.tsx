/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { logInLink } from 'src/helpers/variables'

const AWS_API =
  process.env.NODE_ENV === 'development'
    ? '/api/aws'
    : 'https://3t8fpn6j0e.execute-api.us-east-1.amazonaws.com/Test'

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
    delete instance.defaults.headers.Authorization
  } else {
    instance.defaults.headers.Authorization = `Bearer ${token}`
  }
}

type GetParams =
  | {
      [key: string]: string
    }
  | URLSearchParams

const responseBody = (response: AxiosResponse) => response.data

const requests = {
  get: (url: string, params?: GetParams) =>
    instance
      .get(url, {
        params,
      })
      .then(responseBody),
  post: (url: string, body: any) => instance.post(url, body).then(responseBody),
  put: (url: string, body: Record<string, unknown>) =>
    instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
}

const get = {
  getMetrics: (): Promise<Record<string, unknown>> =>
    requests
      .get(`${AWS_API}/dash/metrics`)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  getAuth: (): Promise<Record<string, unknown>> =>
    requests
      .get(`${AWS_API}/client/authorization`)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  getAuthUrl: (): Promise<Record<string, string>> =>
    requests
      .get(`${AWS_API}/client/authorization_url`)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  getContact: (): Promise<GetContactResp> =>
    requests
      .get(`${AWS_API}/client/contact`)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  getRecommendations: (): Promise<RecommendationUser[]> =>
    requests
      .get(`${AWS_API}/dash/recommendations`, { number: '20' })
      .then((res) => res.recommendations)
      .catch((err) => Promise.reject(err)),

  getContactsMutable: (ids: string[]): Promise<GetContactResp[]> => {
    const params = new URLSearchParams()
    ids.forEach((id) => params.append('id', id))
    return requests
      .get(`${AWS_API}/contacts/mutable`, params)
      .then((res) => res)
      .catch((err) => Promise.reject(err))
  },

  getPlaylistsIds: (): Promise<string[]> =>
    requests
      .get(`${AWS_API}/playlists`)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  getPlaylistsData: (ids: string[]): Promise<ListData[]> => {
    const params = new URLSearchParams()
    ids.forEach((id) => params.append('id', id))

    return requests
      .get(`${AWS_API}/playlists`, params)
      .then((res) => res)
      .catch((err) => Promise.reject(err))
  },

  getContactsMessages: (id: string): Promise<any> =>
    requests
      .get(`${AWS_API}/contacts/messages`, { id })
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  getMessagesRead: (id: string) =>
    requests
      .get(`${AWS_API}/messages/read`, { id })
      .then((res) => res)
      .catch((err) => Promise.reject(err)),
}

const post = {
  sendMessage: (data: SendMessageData) =>
    requests
      .post(`${AWS_API}/messages/send`, data)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  postPlaylists: (data: Playlists): Promise<ListData[]> =>
    requests
      .post(`${AWS_API}/playlists`, data)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  postContactsSearch: (name: string): Promise<string[]> =>
    requests
      .post(`${AWS_API}/contacts/search`, {
        type: 'name',
        data: name,
      })
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  postRecommendations: () =>
    requests
      .post(`${AWS_API}/dash/recommendations`, {})
      .then((res) => res)
      .catch((err) => Promise.reject(err)),
}

export { instance, setToken, get, post }
