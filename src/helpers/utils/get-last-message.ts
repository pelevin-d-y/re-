const getLastMessage = (messages: any) => {
  if (!messages) return {}
  if (messages.length === 0) return {}

  const lastMessage = messages[0]
  return lastMessage
}

export default getLastMessage
