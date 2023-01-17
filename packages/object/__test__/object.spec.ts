import { describe, expect, test, vi } from 'vitest'
import { isPlainObject, merge } from '../index'

test('should a plain object', async () => {
    const fn = vi.fn()
    expect(isPlainObject(fn)).toBe(false)
})
