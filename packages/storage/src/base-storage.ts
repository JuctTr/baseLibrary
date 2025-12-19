import { parseJSON, checkExpire, toTimeStamp } from './utils'

export interface StorageOptions {
    type?: string
    keyPrefix?: string
    expire?: string | number
    merge?: boolean
}
export interface SaveObj {
    v: string
    exp: number
}

/**
 * 根据options获取缓存对象和key前缀
 * @param {object} [options={}]
 * @returns {object} 处理后的参数对象
 * @ignore
 */
function getFormatedOptions(options: StorageOptions | undefined) {
    return {
        targetStorage:
            options?.type == 'local'
                ? window.localStorage
                : window.sessionStorage,
        keyPrefix:
            typeof options?.keyPrefix === 'undefined'
                ? 'business_identifier'
                : options.keyPrefix
    }
}

/**
 * 获取缓存
 * @param {string} key 缓存key
 * @param {string} [defaultVal] 默认值
 * @param {object} [options={}] 可选参数
 * @returns {*} 缓存值
 * @ignore
 */
function get(key: string, defaultVal?: any, options?: StorageOptions) {
    const { targetStorage, keyPrefix } = getFormatedOptions(options)

    const objStr = targetStorage.getItem(keyPrefix + key)

    if (!objStr) return targetStorage.getItem(key) || defaultVal

    const obj = parseJSON(objStr)

    if (checkExpire(obj)) {
        remove(key, options)
        return defaultVal
    }

    return obj.v
}

function set(key: string, value: any, options?: StorageOptions) {
    if (!options || typeof options.expire === 'undefined') {
        // 默认有效期一个星期
        options = Object.assign(
            {
                expire: '7d'
            },
            options
        )
    }
    const { targetStorage, keyPrefix } = getFormatedOptions(options)
    // 设置缓存时，key加上前缀
    key = keyPrefix + key

    const toBeSaveObj: SaveObj = {
        v: value,
        exp: toTimeStamp(
            typeof options.expire === 'number'
                ? options.expire + 's'
                : options.expire
        )
    }

    let toBeSaveObjStr = ''
    try {
        toBeSaveObjStr = JSON.stringify(toBeSaveObj)
    } catch (error) {
        console.error('JSON 序列化 出错', error)
        throw new Error('JSON 序列化 出错')
    }

    try {
        targetStorage.setItem(key, toBeSaveObjStr)
    } catch (e) {
        return false
    }

    return true
}

/**
 * 清除缓存
 * @param {string} key 缓存key
 * @param {StorageOptions} [options={}] 可选参数
 * @returns void
 * @ignore
 */
function remove(key: string, options?: StorageOptions) {
    const { targetStorage, keyPrefix } = getFormatedOptions(options)

    key = keyPrefix + key // 完整的key需要加上前缀

    try {
        targetStorage.removeItem(key)
    } catch (e) {
        console.error(e)
    }
}

/**
 * 清除本地过期存储
 * @param {*} options
 * @ignore
 */
function clear(options?: StorageOptions) {
    // 根据option参数获取storage对象和key前缀
    const { targetStorage, keyPrefix } = getFormatedOptions(options)

    let key: string | null
    for (let i = targetStorage.length - 1; i >= 0; i--) {
        key = targetStorage.key(i)
        if (key && key.indexOf(keyPrefix) == 0) {
            const sourceKey = key.slice(keyPrefix.length)
            get(sourceKey)
        }
    }
}

export default { get, set, remove, clear }
