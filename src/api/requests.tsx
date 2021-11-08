import { AxiosResponse } from 'axios'
import instance from './axios-config'

const AWS_API =
  process.env.NODE_ENV === 'development'
    ? '/api/aws'
    : 'https://dev2.strata-api.cc'

const responseBody = (response: AxiosResponse) => response.data

type GetParams =
  | {
      [key: string]: string
    }
  | URLSearchParams

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
      .get(`${AWS_API}/playlists/mutable`)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  getPlaylistsData: (ids: string[]): Promise<ListData[]> => {
    const params = new URLSearchParams()
    ids.forEach((id) => params.append('id', id))

    return requests
      .get(`${AWS_API}/playlists/mutable`, params)
      .then((res) => res)
      .catch((err) => Promise.reject(err))
  },

  getContactsMessages: (id: string): Promise<any> =>
    requests
      .get(`${AWS_API}/contacts/messages`, { id })
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  getMessagesRead: (id: string): Promise<any> =>
    requests
      .get(`${AWS_API}/messages/read`, { id })
      .then((res) => res)
      .catch((err) => Promise.reject(err)),
}

const post = {
  sendMessage: (data: SendMessageData): Promise<any> =>
    requests
      .post(`${AWS_API}/messages/send`, data)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  postPlaylists: (data: Playlists): Promise<ListData[]> =>
    requests
      .post(`${AWS_API}/playlists/mutable`, data)
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

export { get, post }
