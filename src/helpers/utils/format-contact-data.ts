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

const formatContactData = (data: Data, id?: string): any => {
  data.forEach((item) => {
    if (!types.includes(item.type)) {
      console.warn(`unexpected type from mutable API ${item.type}`)
    }
  })

  const emails = data.flatMap((item: any) =>
    item.type === 'email' ? item : []
  )
  const parsedContact: any = {
    emails,
    primaryEmail: data.find((item) => item.meta.type === 'primary'),
    shortName: data.flatMap((item: any) =>
      item.type === 'name_short' ? item.data : []
    )[0],
    name: data.flatMap((item: any) =>
      item.type === 'name' ? item.data.join(' ') : []
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
    Notes:
      data.flatMap((item: any) =>
        item.type === 'Notes' ? item.data : []
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
  }

  if (id) {
    parsedContact.contact_id = id
  }

  return parsedContact
}

export default formatContactData
