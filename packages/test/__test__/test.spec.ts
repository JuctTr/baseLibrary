import { describe, expect, test, vi } from 'vitest'
import { isPlainObject } from '../src/index'

test('should a plain object', async () => {
    const fn = vi.fn()
    expect(isPlainObject(fn)).toBe(false)
})
