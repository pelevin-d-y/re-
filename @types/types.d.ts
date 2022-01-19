/* eslint-disable camelcase */

type Template = {
  Template: string
  Action: string
  Subject: string
  Message: string
}

type ListRequest = {
  data: any[]
  actions: any
  contacts: {
    id: string
    review: number
    scores: any
  }[]
  id: string
  inclusions: any
  info: { name: string; description?: string }
}

type MessageList = {
  address: string
  name: string
}

type SendMessageData = {
  client_id?: string
  body?: string
  subject?: string
  from_contact?: string
  to_contact_list?: MessageList[]
  cc_contact_list?: MessageList[]
  bcc_contact_list?: MessageList[]
  reply_to_contact_list?: MessageList[]
}

type SendMessageField =
  | 'body'
  | 'subject'
  | 'to_contact_list'
  | 'cc_contact_list'
  | 'bcc_contact_list'
  | 'reply_to_contact_list'
  | 'from_contact'

type RecommendationUser = {
  last_contact_message_time: string
  last_client_message_to: string
  first_message_time: string
  score: number
  Status: string
  last_client_message_text: string
  last_contact_message_to: string
  name: string
  message_template_subject: string
  message_template_body: string
  last_client_message_from: string
  first_message_subject: string
  message_template_description: string
  image_url: string
  sub: number
  first_message_to: string
  contact_id: string
  path: string
  last_contact_message_text: string
  last_client_message_id: string
  first_message_text: string
  trigger_id: string
  last_client_message_time: string
  last_contact_message_from: string
  address: string
  order: number
  last_contact_message_id: string
  message_template_id: string
  last_contact_message_subject: string
  name_short: string
  Notes: string
  playlist_id: string
  last_client_message_subject: string
  key: string
  first_message_id: string
  first_message_from: string
}

type ContactMutable = {
  type: string
  data: string[] | string
  review: number
  meta: any
}

type MainUserData = {
  emails?: any
  authData?: Record<string, number>
  authUrls?: Record<string, string>
  syncedEmails?: string[]
  primaryEmail?: ContactMutable
  shortName?: string
  name?: string
  strataEmail?: string
  avatar?: string
  contacts?: RecommendationUser[]
  company?: string
  title?: string
  phone?: string
}

type FormattedContact = {
  emails?: ContactMutable[]
  shortName?: string
  name?: string
  strataEmail?: string
  avatar?: string
  contact_id: string
  Notes?: string
  Status?: string
}

type ListData = {
  actions?: any
  contacts?: {
    contact_id: string
    review?: number
    scores?: any
  }[]

  playlist_id: string
  inclusions?: any
  info?: { name?: string; description?: string }
  triggers?: []
}

type CreatePlaylist = {
  actions?: []
  contacts?: any[]
  inclusions?: []
  info?: { name: string; description?: string }
  triggers?: []
}

type Playlists = ListData[]
