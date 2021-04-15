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
  | 'Follow Ups'
  | 'Intros received'
  | 'New Roles'
  | 'Network Engagement'
  | 'Network Maintenance'
)[]

type UserData = {
  id?: number
  name?: string
  avatar?: string
  description?: string
  position?: string
  event?: string
  lastMessage?: string
  playlists?: Playlists
}
