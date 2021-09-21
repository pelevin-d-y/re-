import * as React from 'react'
import { get, post } from 'src/api'
import formatContactData from 'src/helpers/utils/format-contact-data'
import { useRouter } from 'next/router'
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query'

type Action =
  | { type: 'UPDATE_LIST'; payload: any }
  | { type: 'UPDATE_SELECTED_USERS'; payload: any[] }
type State = Playlist | null

type Dispatch = React.Dispatch<Action>
type ContextType = {
  state: State
  dispatch: Dispatch
  playlistQuery: UseQueryResult<ListData, unknown>
  updatePlaylist: (list: any) => void
  removeUsers: (userData: any) => Promise<any>
  addUser: (user: any) => Promise<any>
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
  const router = useRouter()
  const [state, dispatch] = React.useReducer(playlistReducer, null)

  const updatePlaylist = (list: any) => {
    dispatch({ type: 'UPDATE_LIST', payload: list })
  }

  const queryClient = useQueryClient()
  const playlistQuery = useQuery({
    queryKey: ['list/PlaylistData', { id: router.query.id }],
    queryFn: async () => {
      const [playlist] = await get.getPlaylistsData([
        router.query.id,
      ] as string[])

      const contacts = await get
        .getContactsMutable(playlist.contacts.map((item) => item.contact_id))
        .then((res) =>
          Object.entries(res).map(([id, contact]) =>
            formatContactData(contact, id)
          )
        )
      return {
        ...playlist,
        contacts,
      }
    },
    enabled: !!router.query.id,
  })

  const deleteContactsMutation = useMutation({
    mutationFn: (users: any[]) =>
      post.postPlaylists([
        {
          id: router.query.id as string,
          contacts: users.map((item) => ({
            contact_id: item.id,
            review: 2,
          })),
        },
      ]),
    onSuccess: () => {
      queryClient.invalidateQueries([
        'list/PlaylistData',
        { id: router.query.id },
      ])
    },
  })

  const removeUsers = React.useCallback(
    (users: any[]) =>
      deleteContactsMutation
        .mutateAsync(users)
        .catch((err: any) => console.log('removeUser err =>', err)),
    [deleteContactsMutation]
  )

  const addContactsMutation = useMutation({
    mutationFn: (user: any) =>
      post.postPlaylists([
        {
          id: router.query.id as string,
          contacts: [
            {
              contact_id: user.id,
              review: 1,
            },
          ],
        },
      ]),
    onSuccess: () => {
      queryClient.invalidateQueries([
        'list/PlaylistData',
        { id: router.query.id },
      ])
    },
  })

  const addUser = React.useCallback(
    (user) =>
      addContactsMutation
        .mutateAsync(user)
        .then(() => null)
        .catch((err: any) => console.log('addUser err =>', err)),
    [addContactsMutation]
  )

  const value: ContextType = React.useMemo(
    () => ({
      state,
      playlistQuery,
      dispatch,
      updatePlaylist,
      addUser,
      removeUsers,
    }),
    [state, playlistQuery, addUser, removeUsers]
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
