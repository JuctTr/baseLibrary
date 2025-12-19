import type { StorageOptions } from './base-storage'
import storage from './base-storage'

/**
 * 获取缓存
 * @export
 * @param {string} key  存储key
 * @param {*} [defaultVal] 默认值
 * @param {StorageOptions} [options={}] 可选参数，如options.type, options.keyPrefix
 * @returns {Promise}
 * @ignore
 */
function getItem(key: string, defaultVal?: any, options?: StorageOptions) {
    return new Promise(function (resolve, reject) {
        if (!key) {
            reject({ errMsg: 'key is null' })
        }
        const value = storage.get(key, defaultVal, options)
        resolve(value)
    })
}

/***
 * 设置缓存
 * @param {string} key 缓存key
 * @param {*} value 缓存值
 * @param {StorageOptions} [options={}] 可选对象，如options.expire
 * @returns {Promise}
 * @ignore
 */
function setItem(key: string, value: any, options?: StorageOptions) {
    return new Promise<void>(function (resolve, reject) {
        if (!key || typeof key != 'string') {
            reject({ errMsg: 'key is null or key is not string' })
        }

        const result = storage.set(key, value, options)

        result ? resolve() : reject()
    })
}

/**
 * 清除缓存
 * @param {string} key 缓存key
 * @param {object} options 可选参数
 * @returns {Promise}
 * @ignore
 */
function removeItem(key: string, options?: StorageOptions) {
    return new Promise<void>(function (resolve, reject) {
        if (!key) {
            reject({ errMsg: 'key is null' })
        }
        storage.remove(key, options)
        resolve()
    })
}

/**
 * 清空本地过期缓存
 * @param {object} options 可选参数
 * @ignore
 */
function clearOut(options?: StorageOptions) {
    storage.clear(options)
}

/**
 * 同步获取缓存
 * @param {string} key   缓存key
 * @param {*} defaultVal 默认值
 * @param {StorageOptions} [options={}] 可选参数
 * @returns {*}
 * @ignore
 */
function getItemSync(key: string, defaultVal: any, options?: StorageOptions) {
    if (!key || typeof key != 'string') {
        console.warn('key is null or key is not string')
        return null
    }
    return storage.get(key, defaultVal, options)
}

/**
 * 同步设置缓存
 * @export
 * @param {string} key 缓存key
 * @param {*} value 缓存值
 * @param {object} [options={}] 可选参数
 * @returns {boolean} 是否设置成功
 * @ignore
 */
function setItemSync(key: string, value: any, options?: StorageOptions) {
    // 虽然使用了TypeScript，但是也要做一次拦截，以防大家使用 @ts-ignore
    if (!key || typeof key != 'string') {
        console.warn('key is null or key is not string')
        return false
    }
    if (options && options.type == 'local' && !options.expire) {
        // 为了不让大家乱存，不规范管理，强制大家加入过期时间
        console.warn('the required parameter expire is empty')
        return false
    }

    return storage.set(key, value, options)
}

/**
 * 同步清除缓存
 * @param {string} key 缓存key
 * @param {object} options 可选参数
 * @returns {Promise}
 * @ignore
 */
function removeItemSync(key: string, options?: StorageOptions) {
    if (!key) {
        console.warn('key is null')
        return false
    }
    return storage.remove(key, options)
}

const session = {
    getItem(key: string, options?: StorageOptions) {
        options && (options.type = 'session')
        return getItemSync(key, options)
    },
    setItem(key: string, value: any, options?: StorageOptions) {
        options && (options.type = 'session')
        return setItemSync(key, value, options)
    },
    removeItem(key: string, options?: StorageOptions) {
        options && (options.type = 'session')
        return removeItem(key, options)
    }
}

const local = {
    getItem(key: string, options?: StorageOptions) {
        options && (options.type = 'local')
        return getItemSync(key, options)
    },
    setItem(key: string, value: any, options?: StorageOptions) {
        options && (options.type = 'local')
        return setItemSync(key, value, options)
    },
    removeItem(key: string, options?: StorageOptions) {
        options && (options.type = 'local')
        return removeItem(key, options)
    }
}

export {
    getItem,
    setItem,
    removeItem,
    getItemSync,
    setItemSync,
    removeItemSync,
    clearOut,
    local,
    session
}
