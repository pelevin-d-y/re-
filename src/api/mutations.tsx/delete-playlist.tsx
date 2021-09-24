import { UseMutationOptions } from 'react-query'
import { post } from '../requests'

const deletePlaylist = (): UseMutationOptions<ListData[], any, string[]> => ({
  mutationFn: (ids: string[]) =>
    post.postPlaylists(ids.map((item) => ({ id: item }))),
  mutationKey: 'deletePlaylistMutation',
})

export default deletePlaylist
