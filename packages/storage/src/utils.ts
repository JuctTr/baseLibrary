import type { SaveObj } from './base-storage'

/**
 * 转换为JSON对象
 * @param {*} val
 * @returns {*}
 * @ignore
 */
function parseJSON(val: any) {
    if (!val || typeof val != 'string') {
        return val
    }
    val = val.replace(/^\s+|\s+$/g, '')
    if (!val) return val

    try {
        val = JSON.parse(val)
    } catch (e) {
        console.error('parseJSON => ', e)
    }
    return val
}

/**
 * 判断缓存是否过期
 * @param {object} saveObj 缓存对象
 * @returns {boolean} 是否过期
 * @ignore
 */
function checkExpire(saveObj: SaveObj) {
    if (
        saveObj.exp === 0 ||
        (saveObj.exp && new Date(saveObj.exp) < new Date())
    ) {
        return true
    }
    return false
}

const MILLISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000

const MILLISECONDS_IN_ONE_HOUR = 60 * 60 * 1000

const MILLISECONDS_IN_ONE_MINUTE = 60 * 1000

const MILLISECONDS_IN_ONE_SECOND = 1000

type IValue = number | Date | string | undefined

function toTimeStamp(value: IValue) {
    if (typeof value === 'number') return value

    if (typeof value === 'object' && value.constructor.name === 'Date') {
        return value.getTime()
    }

    if (typeof value === 'string') {
        const matches: RegExpMatchArray | null = value.match(
            /^(\d+(?:\.\d+)?)([smhd])$/
        )
        // 3.如果是相对时间字符串 eg：1d，2h, 3m, 4s
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
        // 4.如果传入的是绝对时间字符串，eg：2018/12/25 09:30:45  2018-12-25 09:30:45 2018.12.25 09:30:45
        value = value.replace(/[.-]/g, '/')
        const d = new Date(value).getTime()
        if (!isNaN(d)) {
            return d
        }
    }
    return -1
}

export { parseJSON, checkExpire, toTimeStamp }
