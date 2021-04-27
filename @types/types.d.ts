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

type UserData = {
  id?: number
  name?: string
  avatar?: string
  first_message_id?: string
  template?: string
  description?: string
  position?: string
  event?: string
  emailMessage?: string
  lastMessage?: string
  playlists?: Playlists
}

type Template = {
  Template: string
  Header: string
  Summary: string
  Subject: string
  Message: string
}
