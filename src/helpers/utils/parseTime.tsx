import format from 'date-fns/format'
import parse from 'date-fns/parse'

export const formatTime = (date: string): string => {
  if (!date) {
    return 'not found'
  }
  return format(parse(date, 'y-M-d H:m:s', new Date()), 'MMMM dd, yyyy')
}

export const formatDate = (date: Date): string => {
  if (!date) {
    return 'not found'
  }

  return format(date, 'MMMM dd, yyyy')
}

export const parseDate = (date: string): Date =>
  parse(date, 'y-M-d H:m:s', new Date())

export const formatDateHideYear = (date: number): string => {
  const dateObj = new Date(1000 * date)

  if (dateObj.getFullYear() === new Date().getFullYear()) {
    return format(dateObj, 'EEEE LLL d')
  }

  return format(dateObj, 'EEEE LLL d, yyyy')
}
