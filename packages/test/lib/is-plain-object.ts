/**
 * @ignore
 * @module @base/object
 */

/**
 * 判断是否是纯粹的对象
 * @function isPlainObject
 * @param {*} val        待验证的对象
 * @return {Boolean}     是纯粹的对象返回true，否则返回false
 * @example
 * isPlainObject({name: '123'})
 */
export default function isPlainObject(val: object) {
    return Object.prototype.toString.call(val) === '[object Object]'
}

// 我来做一点小修改
