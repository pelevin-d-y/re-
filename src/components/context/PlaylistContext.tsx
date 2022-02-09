import * as React from 'react'
import { get, post } from 'src/api'
import formatContactData from 'src/helpers/utils/format-contact-data'
import chunk from 'lodash/chunk'

type Action =
  | { type: 'UPDATE_LIST'; payload: any }
  | { type: 'UPDATE_SELECTED_USERS'; payload: any[] }
type State = ListData | null

type Dispatch = React.Dispatch<Action>
type ContextType = {
  state: State
  dispatch: Dispatch
  getPlaylistData: (listId: string) => void
  removeUsers: (
    listId: string,
    userData: (RecommendationUser | FormattedContact)[]
  ) => Promise<any>
  addUsers: (
    listId: string,
    users: (RecommendationUser | FormattedContact)[]
  ) => Promise<any>
}

const PlaylistContext = React.createContext<ContextType | null>(null)

const playlistReducer = (state: State, action: any): State => {
  switch (action.type) {
    case 'UPDATE_LIST': {
      return action.payload
    }
    default: {
      return state
    }
  }
}

const PlaylistProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(playlistReducer, null)
  const getPlaylistData = React.useCallback(async (listId) => {
    try {
      const playlist = await get.getPlaylistsData([listId] as string[])
      const newPlaylist = { ...playlist[0] }

      if (newPlaylist?.contacts && newPlaylist?.contacts?.length > 0) {
        const contactsChunks = chunk(newPlaylist.contacts, 70)

        const requests = contactsChunks.map((contactChunk) => {
          return get.getContactsMutable(
            contactChunk.map((item) => item.contact_id)
          )
        })
        const contactsResp = await Promise.all(requests)
        const convertedContactsRespToObj = contactsResp.reduce((acc, item) => {
          return { ...acc, ...item }
        })

        newPlaylist.contacts = Object.entries(convertedContactsRespToObj).map(
          ([id, contact]) => formatContactData(contact, id)
        )
      }

      dispatch({ type: 'UPDATE_LIST', payload: newPlaylist })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('getPlaylistData err =>', err)
    }
  }, [])

  const removeUsers = React.useCallback(
    (listId, users: (RecommendationUser | FormattedContact)[]) =>
      post
        .postPlaylists([
          {
            playlist_id: listId,
            contacts: users.map((item) => ({
              contact_id: item.contact_id,
              review: 2,
            })),
          },
        ])
        .catch((err: any) => console.log('removeUser err =>', err)),
    []
  )

  const addUsers = React.useCallback(
    (listId: string, users: (RecommendationUser | FormattedContact)[]) => {
      const contacts = users.map((item) => ({
        contact_id: item?.contact_id,
        review: 1,
      }))

      return post
        .postPlaylists([
          {
            playlist_id: listId,
            contacts,
          },
        ])
        .catch((err: any) => console.log('addUser err =>', err))
    },
    []
  )

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
      getPlaylistData,
      addUsers,
      removeUsers,
    }),
    [state, getPlaylistData, addUsers, removeUsers]
  )

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  )
}

const usePlaylist = (): ContextType => {
  const context = React.useContext(PlaylistContext)
  if (context === null) {
    throw new Error('usePlaylist must be used within a PlaylistProvider')
  }
  return context
}

export { PlaylistProvider, usePlaylist }
