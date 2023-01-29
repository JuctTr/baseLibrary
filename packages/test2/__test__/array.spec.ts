import { describe, expect, test, vi } from 'vitest'
import { isArray } from '../src/index'

test('should a array', async () => {
    const obj = {}
    expect(isArray(obj)).toBe(false)
})
