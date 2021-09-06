import * as React from 'react'
import {
  getContactsMutable,
  getPlaylists,
  getPlaylistsData,
  postPlaylists,
} from 'src/api'
import formatContactData from 'src/helpers/utils/format-contact-data'

type State = ListRequest[] | null

type ContextType = {
  state: State
  setState: React.Dispatch<React.SetStateAction<State>>
  deletePlaylists: (ids: string[]) => Promise<any>
}

const PlaylistsContext = React.createContext<ContextType | null>(null)

const PlaylistsProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<ListRequest[] | null>([])

  const getPlaylistsAsync = React.useCallback(async () => {
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

    const playlistsWithContacts = playlistsData.data.map((item: any, index) => {
      let newItem = item
      newItem.contacts = contacts[index]
        ? Object.entries(contacts[index]).map(([id, contact]) =>
            formatContactData(contact as any, id)
          )
        : []

      return newItem
    })

    setState(playlistsWithContacts)
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
      setState,
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
