import sample from 'lodash/sample'
import testTemplates from 'src/testTemplates.json'

type Data = ContactMutable[]

const types = [
  'name_short',
  'name',
  'image',
  'company',
  'title',
  'phone',
  'Notes',
  'email',
  'primaryEmail',
  'name_suffix',
  'Playlist_Notes',
]

const formatContactData = (data: Data, id?: string): FormattedContact => {
  data.forEach((item) => {
    if (!types.includes(item.type)) {
      console.warn(`unexpected type from mutable API ${item.type}`)
    }
  })

  // Names
  const name =
    data.find((item) => {
      return item.type === 'name' && item.meta.type === 'primary'
    }) || data.find((item) => item.type === 'name')

  const names = data.filter((item) => item.type === 'name')

  // Emails
  const emails = data.flatMap((item: any) =>
    item.type === 'email' ? item : []
  )
  const primaryEmail =
    data.find(
      (item) => item.type === 'email' && item.meta.type === 'primary'
    ) || data.find((item) => item.type === 'email')

  // Notes
  const Notes =
    data.find((item) => {
      return item.type === 'Notes' && item.meta.type === 'primary'
    }) || data.find((item) => item.type === 'Notes')

  const allNotes = data.filter((item) => item.type === 'Notes')

  const parsedContact: any = {
    names,
    name,
    emails,
    primaryEmail,
    Notes,
    allNotes,
    name_short: data.flatMap((item: any) =>
      item.type === 'name_short' ? item.data : []
    )[0],
    avatar: data.flatMap((item: any) =>
      item.type === 'image' ? item.meta.cached : []
    )[0],
    company:
      data.flatMap((item: any) =>
        item.type === 'company' ? item.data : []
      )[0] || '',
    title:
      data.flatMap((item: any) =>
        item.type === 'title' ? item.data : []
      )[0] || '',
    phone:
      data.flatMap((item: any) =>
        item.type === 'phone' ? item.data : []
      )[0] || '',
    Playlist_Notes:
      data.flatMap((item: any) =>
        item.type === 'Playlist_Notes'
          ? [
              {
                text: item.meta.text,
                playlistId: item.data,
              },
            ]
          : []
      ) || [],
    templateData: sample(testTemplates), // addition field for "next steps" till api is not ready
  }

  if (id) {
    parsedContact.contact_id = id
  }

  return parsedContact
}

export default formatContactData
