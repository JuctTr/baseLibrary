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
export default function isArray(val) {
    return (
        Object.prototype.toString
            .call(val)
            .match(/^\[object\s(.*)\]$/)[1]
            .toLowerCase() === 'array'
    )
}
