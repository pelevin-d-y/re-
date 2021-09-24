import { UseQueryOptions } from 'react-query'
import { get } from '../requests'

const getPlaylistsDataQuery = (
  playlistsIds: string[] | undefined,
  isEnabled: boolean
): UseQueryOptions<ListData[]> => ({
  queryKey: ['PlaylistsData'],
  queryFn: () =>
    typeof playlistsIds === 'undefined'
      ? Promise.reject(new Error('Invalid playlistsIds'))
      : get.getPlaylistsData(playlistsIds.map((item) => item)),
  enabled: isEnabled,
})

export default getPlaylistsDataQuery
