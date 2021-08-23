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

type List = {
  id: number
  title: string
  users: UserData[]
  description: string
  icon: string
  image?: string
  tasks?: {
    urgent?: number
    pinned?: number
  }
}

type Lists = List[]

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
  first_client_to: string
  playlist_sort: number
  last_direct_message_id: string
  template: string
  last_client_to: string
  keyword_nearby_template: string
  playlist_new_contact_template: string
  last_direct_to: string
  keyword_seeking: number
  playlist_maintain: number
  first_direct_hide: string
  client_initiated_count: number
  last_client_text: string
  first_client_hide: string
  playlist_new_contact_context: string
  first_direct_message_id: string
  context: string
  keyword_nearby_context: string
  first_to: string
  keyword_celebrate_template: string
  names: string
  playlist_anniversary: number
  intro_by?: string
  first_contact_from: string
  keyword_fundraising_template: string
  playlist_out_of_office_context: string
  last_contact_time_phrase: string
  keyword_move_to_template: string
  last_text: string
  playlist_restart: number
  keyword_move_to_context: string
  last_client_message_id: string
  keyword_visit_context: string
  playlist_resume_template: string
  last_hide: string
  keyword_birthday_context: string
  last_direct_timestamp: number
  keyword_seeking_template: string
  first_client_message_id: string
  first_contact_time_phrase: string
  first_direct_text: string
  last_client_time_phrase: string
  last_time_phrase: string
  first_contact_time: string
  first_direct_to: string
  total_threads_count: number
  keyword_birthday_template: string
  direct_messages_count: number
  next_meeting: string
  thread_mean_period: number
  name: string
  last_direct_time: string
  last_contact_text: string
  first_text: string
  playlist_maintain_context: string
  playlist_restart_template: string
  last_contact_timestamp: number
  first_timestamp: number
  keyword_fundraising_context: string
  playlist_unanswered_questions_context: string
  last_direct_time_phrase: string
  playlist_introductions_template: string
  first_client_text: string
  last_client_time: string
  total_messages_count: number
  first_direct_timestamp: number
  Notes: string
  first_direct_time_phrase: string
  last_direct_from: string
  client_aliases_found: string
  keyword_nearby: number
  contact_initiated_count: number
  playlist_introductions: number
  first_hide: string
  playlist_out_of_office: number
  from_client_messages_count: number
  last_contact_hide: string
  connection_C: number
  playlist_anniversary_template: string
  connection_B: number
  connection_A: number
  client_reply_wait: number
  connection_E: number
  connection_D: number
  first_client_timestamp: number
  playlist_out_of_office_template: string
  keyword_birthday: number
  playlist_introductions_context: string
  first_client_time: string
  last_from: string
  first_time_phrase: string
  last_client_from: string
  playlist_unanswered_questions: number
  last_contact_to: string
  first_contact_text: string
  first_direct_time: string
  sub: number
  keyword_celebrate_context: string
  keyword_move_to: number
  client_reply_prob: number
  first_client_time_phrase: string
  addresses: string
  address: string
  last_contact_message_id: string
  playlist_unanswered_questions_template: string
  keyword_visit_template: string
  first_direct_from: string
  first_contact_hide: string
  last_to: string
  first_contact_message_id: string
  keyword_talk_on: number
  keyword_visit: number
  playlist_new_contact: number
  keyword_hiring: number
  key: string
  first_message_id: string
  last_time: string
  thread_mean_addresses: number
  keyword_talk_on_template: string
  keyword_celebrate: number
  next_meeting_timestamp: null
  last_contact_from: string
  playlist_resume: number
  first_contact_timestamp: number
  contact_reply_wait: number
  thread_mean_messages: number
  keyword_hiring_template: string
  playlist_maintain_template: string
  first_from: string
  from_contact_messages_count: number
  playlist_restart_context: string
  keyword_fundraising: number
  tags: string
  last_direct_hide: string
  contact_reply_prob: number
  path: string
  keyword_seeking_context: string
  last_timestamp: number
  direct_threads_count: number
  last_message_id: string
  last_client_hide: string
  last_direct_text: string
  last_contact_time: string
  first_contact_to: string
  keyword_talk_on_context: string
  first_time: string
  intro_by: string
  thread_mean_duration: number
  keyword_hiring_context: string
  first_client_from: string
  playlist_resume_context: string
  last_client_timestamp: number
  playlist_anniversary_context: string
}

interface UserData extends RecommendationUser {
  avatar?: string
  title?: string
  next_outreach: string
  pinned: boolean
  templateData?: Template
  relationshipStrength: 'red' | 'orange' | 'green' | null
}

type RecsResponse = {
  data: {
    recommendations: RecommendationUser[]
  }
}

type MainUserData = {
  emails?: string[]
  shortName?: string
  fullName?: string
  strataEmail?: string
  avatar?: string
  contacts?: UserData[]
}
