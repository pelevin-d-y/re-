import { UseQueryOptions } from 'react-query'
import { get } from '../requests'

const getPlaylistsIdsQuery = (): UseQueryOptions<string[]> => ({
  queryKey: ['PlaylistsIds'],
  queryFn: () => get.getPlaylistsIds(),
})

export default getPlaylistsIdsQuery
