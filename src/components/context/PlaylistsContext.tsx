import * as React from 'react'
import {
  getContactsMutable,
  getPlaylists,
  getPlaylistsData,
  postPlaylists,
} from 'src/api'
import formatContactData from 'src/helpers/utils/format-contact-data'

type State = { data: any[]; isLoading: boolean }
type Action =
  | { type: 'UPDATE_PLAYLISTS_DATA'; payload: any[] }
  | { type: 'UPDATE_IS_LOADING'; payload: boolean }
type Dispatch = React.Dispatch<Action>

type ContextType = {
  state: State
  dispatch: Dispatch
  deletePlaylists: (ids: string[]) => Promise<any>
}

const PlaylistsContext = React.createContext<ContextType | null>(null)

const playlistsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_PLAYLISTS_DATA': {
      return {
        ...state,
        data: action.payload,
      }
    }
    case 'UPDATE_IS_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

const PlaylistsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(playlistsReducer, {
    data: [],
    isLoading: false,
  })

  const getPlaylistsAsync = React.useCallback(async () => {
    dispatch({ type: 'UPDATE_IS_LOADING', payload: true })
    try {
      const playlistsIds = await getPlaylists()
      const playlistsData = await getPlaylistsData(
        playlistsIds.data.map((item: string) => item)
      )

      const contactsResp: any = await Promise.all(
        playlistsData.data.map((playlist: any) => {
          const { contacts: playlistContacts } = playlist
          return playlistContacts.length > 0
            ? getContactsMutable(
                playlistContacts.map((item: any) => item.contact_id)
              )
            : null
        })
      )

      const contacts = contactsResp.map((item: any) => item && item.data)

      const playlistsWithContacts = playlistsData.data.map(
        (item: any, index) => {
          let newItem = item
          newItem.contacts = contacts[index]
            ? Object.entries(contacts[index]).map(([id, contact]) =>
                formatContactData(contact as any, id)
              )
            : []

          return newItem
        }
      )

      dispatch({
        type: 'UPDATE_PLAYLISTS_DATA',
        payload: playlistsWithContacts,
      })
    } catch (err) {
      console.log('getPlaylistsAsync err ==>', err)
    }
    dispatch({ type: 'UPDATE_IS_LOADING', payload: false })
  }, [])

  React.useEffect(() => {
    getPlaylistsAsync()
  }, [getPlaylistsAsync])

  const deletePlaylists = React.useCallback(
    (ids: string[]) =>
      postPlaylists(ids.map((item) => ({ id: item })))
        .then(() => getPlaylistsAsync())
        .catch((err) => console.log('deletePlaylists err', err)),
    [getPlaylistsAsync]
  )

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
      deletePlaylists,
    }),
    [deletePlaylists, state]
  )

  return (
    <PlaylistsContext.Provider value={value}>
      {children}
    </PlaylistsContext.Provider>
  )
}

const usePlaylists = (): ContextType => {
  const context = React.useContext(PlaylistsContext)
  if (context === null) {
    throw new Error('usePlaylists must be used within a PlaylistProvider')
  }
  return context
}

export { PlaylistsProvider, usePlaylists }
