import dayjs from 'dayjs'

class DateUtility {
  static getHour(dateTime?: string): number | null {
    if (!dateTime) return null
    return dayjs(dateTime).hour()
  }
}

export default DateUtility
