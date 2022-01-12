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

  getAuthUrl: (emails: string[]): Promise<Record<string, string>> => {
    const params = new URLSearchParams()
    emails.forEach((email) => params.append('email', email))
    return requests
      .get(`${AWS_API}/client/authorization_url`, params)
      .then((res) => res)
      .catch((err) => Promise.reject(err))
  },

  getContact: (): Promise<ContactMutable[]> =>
    requests
      .get(`${AWS_API}/client/contact`)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  getRecommendations: (): Promise<RecommendationUser[]> =>
    requests
      .get(`${AWS_API}/dash/recommendations`, { number: '20' })
      .then((res) => res.recommendations)
      .catch((err) => Promise.reject(err)),

  getContactsMutable: (
    ids?: string[]
  ): Promise<{ string: ContactMutable[] }> => {
    const params = new URLSearchParams()
    const croppedIds = ids?.slice(0, 10)
    croppedIds?.forEach((id) => params.append('id', id))

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
  getPinnedContacts: (): Promise<any> =>
    requests
      .get(`${AWS_API}/dash/pinned`)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),
}

const post = {
  sendMessage: (data: SendMessageData): Promise<any> =>
    requests
      .post(`${AWS_API}/messages/send`, data)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  postContactsMutable: (data: {
    [key: string]: { type: string; data: string | string[]; review: number }[]
  }): Promise<any> =>
    requests
      .post(`${AWS_API}/contacts/mutable`, data)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  postPlaylists: (data: Playlists): Promise<ListData[]> =>
    requests
      .post(`${AWS_API}/playlists/mutable`, data)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  postCreatePlaylist: (data: CreatePlaylist[]): Promise<ListData[]> =>
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

  postContact: (data: any): Promise<any> =>
    requests
      .post(`${AWS_API}/client/contact`, data)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  postClientDeauthorization: (data: string) =>
    requests
      .post(`${AWS_API}/client/deauthorization`, data)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  postRecommendations: (data: Record<string, unknown>): Promise<any> =>
    requests
      .post(`${AWS_API}/dash/recommendations`, data)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),

  postPinnedContacts: (data: any): Promise<any> =>
    requests
      .post(`${AWS_API}/dash/recommendations`, data)
      .then((res) => res)
      .catch((err) => Promise.reject(err)),
}

const apiHelpers = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  updateMutableData: async (
    id: string,
    newVal: ContactMutable,
    prevVal?: ContactMutable
  ) => {
    try {
      if (prevVal) {
        const body = {
          [id]: [
            newVal,
            {
              ...prevVal,
              review: 2,
            },
          ],
        }

        return await post.postContactsMutable(body)
      }
      return await post.postContactsMutable({ [id]: [newVal] })
    } catch (err) {
      console.warn('updateMutableData ==>', err)
      return Promise.reject(err)
    }
  },
}

export { get, post, apiHelpers }
