import format from 'date-fns/format'
import parse from 'date-fns/parse'

const formatTime = (date: string): string => {
  if (!date) {
    return 'not found'
  }
  return format(parse(date, 'y-M-d H:m:s', new Date()), 'MMMM dd, yyyy')
}

export default formatTime
