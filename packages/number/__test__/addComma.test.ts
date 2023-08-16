import { describe, expect, test } from 'vitest'
import { addComma } from '../src/addComma'

describe('addComma', () => {
    test('非数字', () => {
        expect(addComma(NaN)).toBe('NaN')
    })

    test('测试正整数', () => {
        expect(addComma(5)).toBe('5')
        expect(addComma(95)).toBe('95')
        expect(addComma(995)).toBe('995')
        expect(addComma(1995)).toBe('1,995')
        expect(addComma(9945995)).toBe('9,945,995')
        expect(addComma(123349945995)).toBe('123,349,945,995')
    })

    test('负正整数', () => {
        expect(addComma(-1)).toBe('-1')
        expect(addComma(-123)).toBe('-123')
        expect(addComma(-1234)).toBe('-1,234')
        expect(addComma(-9945995)).toBe('-9,945,995')
    })

    test('小数', () => {
        expect(addComma(1.1)).toBe('1.1')
        expect(addComma(1.11)).toBe('1.11')
        expect(addComma(1.111)).toBe('1.111')
        expect(addComma(1.1111)).toBe('1.1111')
        expect(addComma(11111.11111)).toBe('11,111.11111')
        expect(addComma(1234.11111)).toBe('1,234.11111')
        expect(addComma(-12345.11111)).toBe('-12,345.11111')
    })
})
