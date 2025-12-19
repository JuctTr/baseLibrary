import isPlainObject from './is-plain-object'

type TObj = Record<PropertyKey, any>

/**
 * 深度合并两个对象，不支持数组中里面的对象
 * @param originObj
 * @param targetObj
 * @param deep
 * @returns
 */
export default function merge(originObj: TObj, targetObj: TObj, deep = true) {
    for (const key in targetObj) {
        if (deep && originObj[key] && isPlainObject(originObj[key])) {
            originObj[key] = merge(originObj[key], targetObj[key], deep)
        } else {
            originObj[key] = targetObj[key]
        }
    }
    return originObj
}
