import dayjs from 'dayjs'

class DateUtility {
  static getHour(dateTime?: string): number | null {
    if (!dateTime) return null
    return dayjs(dateTime).hour()
  }

  static getCurrentHour(): number {
    return dayjs().hour()
  }

  static getDayName(date: string): string {
    return dayjs(date).format('ddd')
  }

  static displayTime(dateTime?: string): string {
    if (!dateTime) return ''
    return dayjs(dateTime).format('HH:mm')
  }
}

export default DateUtility
