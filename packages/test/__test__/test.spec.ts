import { describe, expect, test, vi } from 'vitest'
import { isPlainObject } from '../index'

test('should a plain object', async () => {
    const fn = vi.fn()
    expect(isPlainObject(fn)).toBe(false)
})
