/**
 * @module @base/array
 * @ignore
 */

/**
 * 判断一个值是否是数组
 * @param {*} val
 * @returns {boolean}
 * @function isArray
 */
export default function isArray(val: any) {
    // const type = Object.prototype.toString.call(val)
    // const matchResult = type.match(/^\[object\s(.*)\]$/)
    // return matchResult && matchResult[1].toLowerCase() === 'array'
    if (Array.isArray) {
        return Array.isArray(val)
    }
    return Object.prototype.toString.call(val) === '[object Array]'
}
