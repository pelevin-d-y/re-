import { UseQueryOptions } from 'react-query'
import formatContactData from 'src/helpers/utils/format-contact-data'
import { get } from '../requests'

const getPlaylistDataQuery = (
  id: string | undefined,
  isEnabled: boolean
): UseQueryOptions<
  | {
      playlist: ListData
      contacts?: FormattedContacts[]
    }
  | undefined
> => ({
  queryKey: ['list/PlaylistData', { id }],
  queryFn: async () => {
    try {
      const [playlist] = await get.getPlaylistsData([id] as string[])

      let contacts: FormattedContacts[] | [] = []
      if (playlist.contacts.length > 0) {
        contacts = await get
          .getContactsMutable(playlist.contacts.map((item) => item.contact_id))
          .then((res) =>
            Object.entries(res).map(([itemId, contact]) =>
              formatContactData(contact, itemId)
            )
          )
      }

      return {
        playlist,
        contacts,
      }
    } catch (err) {
      Promise.reject(new Error(`playlistQuery error ==> ${err}`))
      return undefined
    }
  },
  enabled: isEnabled,
})

export default getPlaylistDataQuery
