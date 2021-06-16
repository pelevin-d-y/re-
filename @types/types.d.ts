/* eslint-disable camelcase */

type Playlists = (
  | 'Meetings & Events'
  | 'Follow Ups'
  | 'Birthdays'
  | 'New Roles'
  | 'Time Lapsed: 90 Days'
  | 'Time Lapsed: 1 Year'
  | 'Travel: Who to Meet'
  | 'Relocation'
  | 'Holidays'
  | 'Share Strata'
  | 'Checking Emails'
  | 'Intros received'
  | 'Network Engagement'
  | 'Network Maintenance'
)[]

type Template = {
  Template: string
  Header: string
  Summary: string
  Subject: string
  Message: string
}

type UserData = {
  avatar?: string
  contacts?: UserData[]
  address?: string
  name?: string
  template?: string
  playlist_unanswered_questions?: number
  playlist_introductions?: number
  playlist_out_of_office?: number
  keyword_birthday?: number
  keyword_celebrate?: number
  keyword_visit?: number
  keyword_move_to?: number
  keyword_talk_on?: number
  keyword_nearby?: number
  keyword_hiring?: number
  keyword_seeking?: number
  keyword_fundraising?: number
  playlist_anniversary?: number | string
  playlist_1year?: number | string
  playlist_intermediate_length?: number | string
  playlist_90days?: number | string
  playlist_new_contact?: number | string
  last_contact_time?: string
  last_contact_to?: string | number
  last_contact_text?: string
  last_contact_message_id?: string
  last_client_time?: string
  last_client_to?: string | number
  last_client_text?: string
  last_client_message_id?: string
  last_direct_time?: string
  last_direct_from?: string
  last_direct_to?: string
  last_direct_text?: string
  last_direct_message_id?: string
  first_time?: string
  first_from?: string
  first_to?: number | string
  first_text?: string
  first_message_id?: string
  intro_by?: string
  intros_to?: string
  addresses?: string
  names?: string
  tags?: string
  playlist_sort?: number
  connection_A?: string | number
  connection_B?: string | number
  connection_C?: string | number
  connection_D?: string | number
  connection_E?: string | number
  total_messages_count?: number
  from_client_messages_count?: number
  from_contact_messages_count?: number
  direct_messages_count?: number
  total_threads_count?: number
  client_initiated_count?: number
  contact_initiated_count?: number
  direct_threads_count?: number
  thread_mean_addresses?: string | number
  thread_mean_messages?: string | number
  thread_mean_duration?: string
  thread_mean_period?: string
  contact_reply_wait?: string
  contact_reply_prob?: number | string
  client_reply_wait?: string
  client_reply_prob?: string | number
  title?: string
  notes?: string
  next_outreach?: string
  id?: string | number
  event?: string
  position?: string
  lastMessage?: string
  playlists?: Playlists
  templateData?: Template
}

type List = {
  id: number
  title: string
  users: UserData[]
  description: string
  icon: string
}

type Lists = List[]
