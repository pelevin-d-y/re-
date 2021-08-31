type Data = {
  type: string
  data: string | any[]
}[]

const formatContactData = (data: Data): any => {
  const parsedContact = {
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

  return parsedContact
}

export default formatContactData
