type Data = {
  type: string
  data: string | any[]
}[]

const formatContactData = (data: Data, id?: string): any => {
  const parsedContact: any = {
    emails: data.flatMap((item: any) =>
      item.type === 'email' ? item.data : []
    ),
    shortName: data.flatMap((item: any) =>
      item.type === 'name_short' ? item.data : []
    )[0],
    fullName: data.flatMap((item: any) =>
      item.type === 'name' ? item.data.join(' ') : []
    )[0],
    avatar: data.flatMap((item: any) =>
      item.type === 'image' ? item.meta.source : []
    )[0],
  }

  if (id) {
    parsedContact.id = id
  }

  return parsedContact
}

export default formatContactData
