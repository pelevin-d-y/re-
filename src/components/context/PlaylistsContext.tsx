import * as React from 'react'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query'
import { get, post } from 'src/api'

type State = { data: any[] }
type Action = { type: 'UPDATE_PLAYLISTS_DATA'; payload: any[] }
type Dispatch = React.Dispatch<Action>

type ContextType = {
  state: State
  dispatch: Dispatch
  deletePlaylists: (ids: string[]) => void
  deletePlaylistMutation: UseMutationResult<
    ListData[],
    unknown,
    string[],
    unknown
  >
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

  const { data: playlistsIds } = useQuery({
    queryKey: ['PlaylistsIds'],
    queryFn: get.getPlaylistsIds,
  })

  const isPlaylistsIds = !!(playlistsIds && playlistsIds.length > 0)

  const playlistsQuery = useQuery({
    queryKey: ['PlaylistsData', { ids: playlistsIds }],
    queryFn: () => {
      if (isPlaylistsIds) {
        return get.getPlaylistsData(
          (playlistsIds as string[]).map((item: string) => item)
        )
      }
      return undefined
    },
    enabled: isPlaylistsIds,
  })

  const deletePlaylistMutation = useMutation({
    mutationFn: (ids: string[]) =>
      post.postPlaylists(ids.map((item) => ({ id: item }))),
    onSuccess: () =>
      queryClient.invalidateQueries(['PlaylistsData', { ids: playlistsIds }]),
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
      deletePlaylistMutation,
      query: playlistsQuery,
    }),
    [deletePlaylistMutation, deletePlaylists, playlistsQuery, state]
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
