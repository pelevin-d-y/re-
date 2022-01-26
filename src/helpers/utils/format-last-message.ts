type Data = MessageData

const types = [
  'message_id',
  'account_id',
  'thread_id',
  'timestamp',
  'from_address',
  'to_addresses',
  'labels',
  'subject',
  'body',
]

const formatLastMessage = (data: Data): any => {
  Object.keys(data).forEach((key) => {
    if (!types.includes(key)) {
      console.warn(`unexpected type from mutable API ${key}`)
    }
  })

  const parsedContact: any = {
    last_client_text: data.subject,
    last_contact_message_text: data.body,
    last_client_time: data.timestamp ? new Date(data.timestamp * 1000) : null,
  }

  return parsedContact
}

export default formatLastMessage
