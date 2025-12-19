import {
    MILLISECONDS_IN_ONE_DAY,
    MILLISECONDS_IN_ONE_HOUR,
    MILLISECONDS_IN_ONE_MINUTE,
    MILLISECONDS_IN_ONE_SECOND
} from './constant'

type IValue = number | Date | string

export default function toTimeStamp(value: IValue) {
    if (typeof value === 'number') return value

    if (typeof value === 'object' && value.constructor.name === 'Date') {
        return value.getTime()
    }

    if (typeof value === 'string') {
        const matches: RegExpMatchArray | null = value.match(
            /^(\d+(?:\.\d+)?)([smhd])$/
        )
        // 如果是相对时间字符串 eg：1d，2h, 3m, 4s
        if (matches && matches.length > 0) {
            let ms = 0
            const num: number = +matches[1]
            switch (matches[2]) {
                case 'd':
                    ms = num * MILLISECONDS_IN_ONE_DAY
                    break
                case 'h':
                    ms = num * MILLISECONDS_IN_ONE_HOUR
                    break
                case 'm':
                    ms = num * MILLISECONDS_IN_ONE_MINUTE
                    break
                case 's':
                default:
                    ms = num * MILLISECONDS_IN_ONE_SECOND
            }
            return Date.now() + Math.round(ms)
        }
        // 如果传入的是绝对时间字符串，eg：2018/12/25 09:30:45  2018-12-25 09:30:45 2018.12.25 09:30:45
        value = value.replace(/[.-]/g, '/')
        const d = new Date(value).getTime()
        if (!isNaN(d)) {
            return d
        }
    }
    return -1
}
