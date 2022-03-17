import { isAfter } from 'date-fns'

export const isDateBeforeLastMonday = (date: Date): boolean => {
  const lastMonday = new Date()
  lastMonday.setDate(lastMonday.getDate() - lastMonday.getDay() + 1)
  lastMonday.setHours(0, 0, 0, 0)

  return isAfter(date, lastMonday)
}

export const getLastWeekMonday = (): Date => {
  const lastMonday = new Date()
  lastMonday.setDate(lastMonday.getDate() - lastMonday.getDay() + 1 - 7)
  lastMonday.setHours(0, 0, 0, 0)

  return lastMonday
}

export const getLastWeekSunday = (): Date => {
  const lastSunday = new Date()
  lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay() + 7 - 7)
  lastSunday.setHours(0, 0, 0, 0)

  return lastSunday
}
