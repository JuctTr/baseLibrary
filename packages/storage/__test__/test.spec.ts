import { describe, expect, test, vi } from 'vitest'
import * as storage from '../src/index'

function myTimeout(fn, timeout) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(fn.apply(this))
        }, timeout)
    })
}

/**
 * Promise 方式
 */
test('storage: 未过期', () => {
    const key = 'testKey1'
    const value = {
        test: 'test'
    }
    expect.assertions(1)
    return storage
        .setItem(key, value, {
            expire: '3s'
        })
        .then(() => {
            return storage.getItem(key).then(data => {
                expect(data).toStrictEqual(value)
            })
        })
})

/**
 * async await 方式
 */
test('storage: 已经过期', async () => {
    const key = 'testKey2'
    const value = {
        test: 'test'
    }
    expect.assertions(1) // 测试期间调用了多少次断言， expect的意思就是断言

    await storage.setItem(key, value, {
        expire: '1s'
    })

    return myTimeout(async () => {
        const data = await storage.getItem(key)
        expect(data).toBeUndefined() // 这里调用了一次
    }, 2000)
})

test('storage: expire参数非法', () => {
    const key = 'testKey7'
    const value = 'testVal7'
    expect.assertions(1)
    return storage.setItem(key, value, { expire: '3e' }).then(() => {
        return storage.getItem(key).then(data => {
            expect(data).toBeUndefined()
        })
    })
})

test('storage: 传入默认值', async () => {
    const key = 'testKey8'
    const value = 'testVal8'
    const defaultVal = 'dd'
    expect.assertions(1)
    await storage.setItem(key, value, { expire: '113e' })
    const data = await storage.getItem(key, defaultVal)
    expect(data).toBe(defaultVal)
})

test('storage: key为空且没有默认值 reject返回错误', async () => {
    expect.assertions(1)

    try {
        await storage.getItem()
    } catch (err) {
        expect(err.errMsg).toMatch(/key is null/)
    }

    // await storage.getItem().catch(err => {
    //     expect(err.errMsg).toMatch(/key is null/)
    // })
})

test('storage: 设置缓存异常流程测试', () => {
    const a: Record<PropertyKey, any> = {}
    a.c = a
    // 循环引用 异常测试
    expect(() => {
        storage.setItemSync('circular', a)
    }).toThrow()
})
