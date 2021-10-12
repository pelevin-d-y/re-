import * as React from 'react'
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query'
import { deletePlaylist } from 'src/api/mutations'
import { getPlaylistsDataQuery, getPlaylistsIdsQuery } from 'src/api/queries'

type State = { data: any[] }
type Action = { type: 'UPDATE_PLAYLISTS_DATA'; payload: any[] }
type Dispatch = React.Dispatch<Action>

type ContextType = {
  state: State
  dispatch: Dispatch
  deletePlaylists: (ids: string[]) => void
  query: UseQueryResult<ListData[] | undefined, unknown>
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
    default: {
      return state
    }
  }
}

const PlaylistsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(playlistsReducer, {
    data: [],
  })
  const queryClient = useQueryClient()

  const { data: playlistsIds } = useQuery(getPlaylistsIdsQuery())

  const isPlaylistsIds = !!(playlistsIds && playlistsIds.length > 0)
  const playlistsQuery = useQuery(
    getPlaylistsDataQuery(playlistsIds, isPlaylistsIds)
  )

  const deletePlaylistMutation = useMutation({
    ...deletePlaylist(),
    onSuccess: () => queryClient.invalidateQueries(['PlaylistsData']),
  })

  const deletePlaylists = React.useCallback(
    (ids) => deletePlaylistMutation.mutateAsync(ids),
    [deletePlaylistMutation]
  )

  const value: ContextType = React.useMemo(
    () => ({
      state,
      dispatch,
      deletePlaylists,
      query: playlistsQuery,
    }),
    [deletePlaylists, playlistsQuery, state]
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
