import { isAfter } from 'date-fns'

export const isDateBeforeLastMonday = (date: Date): boolean => {
  const lastMonday = new Date()
  lastMonday.setDate(lastMonday.getDate() - lastMonday.getDay() + 1)
  lastMonday.setHours(0, 0, 0, 0)

  return isAfter(date, lastMonday)
}
