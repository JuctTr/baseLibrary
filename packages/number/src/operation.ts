/**
 * @module @base/number
 * @author jucttr
 * @reference https://github.com/nefe/number-precision
 * @desc 解决浮动运算问题，避免小数点后产生多位数和计算精度丢失，使得 javascript 能够精确执行加、减、乘、除运算。
 *
 * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
 */

type NumberType = number | string

let boundaryCheckingState = true

/**
 * 如果输入的数字超出范围，则打印警告。
 *
 * @param {Number} num
 */
function checkBoundary(num: number) {
    if (boundaryCheckingState) {
        if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
            console.warn(`${num} 转换成整数时超出边界，结果可能不准确`)
        }
    }
}

/**
 * 是否检查数字范围，默认开启
 *
 * PS：如果你无需数字边界检查，想忽略“ XXX 转换成整数时超出边界，结果可能不准确” 警告，可以在应用程序的开头使用它来关闭边界检查。
 * @param {Boolean} flag
 */
function enableBoundaryChecking(flag = true) {
    boundaryCheckingState = flag
}

/**
 * 基础操作函数，支持rest参数
 *
 * 利用柯里化思想，编写一个高阶函数，用于生成精确的加减乘除运算函数。
 * @param {Function} operation
 */
function createOperation(
    operation: (n1: NumberType, n2: NumberType) => number
): (...nums: NumberType[]) => number {
    return (...nums: NumberType[]) => {
        const [first, ...others] = nums
        return others.reduce(
            (prev, next) => operation(prev, next),
            first
        ) as number
    }
}

/**
 * 将输入的数字更正为指定的有效数字
 *
 * @param {NumberType} num
 * @param {Number} precision 指定有效位数的整数
 *
 * @example
 * import { strip } from '@shein/common-function'
 *
 * strip(0.09999999999999998) === 0.1 // true
 */
function strip(num: NumberType, precision = 15): number {
    return +parseFloat(Number(num).toPrecision(precision))
}

/**
 * 返回一个数字小数点后的位数长度
 *
 * @param {NumberType} num
 * @example
 * import { digitLength } from '@shein/common-function'
 *
 * digitLength(0.3) // 1
 * digitLength(0.69) // 2
 */
function digitLength(num: NumberType): number {
    // 对于科学计数法的处理
    const eSplit = num.toString().split(/[eE]/)
    const len = (eSplit[0].split('.')[1] || '').length - Number(eSplit[1] || 0)
    return len > 0 ? len : 0
}

/**
 * 将输入的数字转换为整数，支持科学记数法
 * 如果是小数，则该数字将按比例放大
 *
 * @param {NumberType} num
 * @example
 * import { float2Int } from '@shein/common-function'
 *
 * float2Int(0.3) // 3
 * float2Int(0.69) // 69
 *
 */
function float2Int(num: NumberType): number {
    if (num.toString().indexOf('e') === -1) {
        return Number(num.toString().replace('.', ''))
    }
    const dLen = digitLength(num)
    return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num)
}

/**
 * 精确加法
 *
 * @param nums
 * @returns {Number} 返回处理后的数字
 * @example
 * import { plus } from '@shein/common-function'
 *
 * plus(0.3, 0.1) // 0.4
 * plus(0.69, 0.1) // 0.79
 */
const plus = createOperation((num1, num2) => {
    // 取最大的小数位
    const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)))
    // 把小数都转为整数然后再计算
    return (times(num1, baseNum) + times(num2, baseNum)) / baseNum
})

/**
 * 精确减法
 *
 * @param nums
 * @returns {Number} 返回处理后的数字
 * @example
 * import { minus } from '@shein/common-function'
 *
 * minus(0.3, 0.1) // 0.2
 * minus(0.69, 0.1) // 0.59
 */
const minus = createOperation((num1, num2) => {
    const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)))
    return (times(num1, baseNum) - times(num2, baseNum)) / baseNum
})

/**
 * 精确乘法
 *
 * @param nums 要相乘的数字
 * @returns {Number} 返回处理后的数字
 * @example
 * import { times } from '@shein/common-function'
 *
 * times(0.3, 0.1) // 0.03
 * times(0.69, 0.1) // 0.069
 */
const times = createOperation((num1, num2) => {
    const num1Changed = float2Int(num1)
    const num2Changed = float2Int(num2)
    const baseNum = digitLength(num1) + digitLength(num2)
    const leftValue = num1Changed * num2Changed

    checkBoundary(leftValue)

    return leftValue / Math.pow(10, baseNum)
})

/**
 * 精确除法
 *
 * @param nums
 * @returns {number} 返回处理后的数字
 * @example
 * import { divide } from '@shein/common-function'
 *
 * divide(0.3, 0.1) // 3
 * divide(0.69, 0.1) // 6.9
 */
const divide = createOperation((num1, num2) => {
    const num1Changed = float2Int(num1)
    const num2Changed = float2Int(num2)

    checkBoundary(num1Changed)
    checkBoundary(num2Changed)

    return times(
        num1Changed / num2Changed,
        strip(Math.pow(10, digitLength(num2) - digitLength(num1)))
    )
})

/**
 * 精确四舍五入
 *
 * @param {NumberType} num 输入待处理的数字
 * @param {number} decimal 指定小数位数的整数
 * @returns {number} 返回处理后的数字
 * @example
 * import { accurateRound } from '@shein/common-function'
 *
 * accurateRound(0.105, 2) // 0.11
 * accurateRound(1.005, 2) // 1.01
 */
function accurateRound(num: NumberType, decimal: number): number {
    const base = Math.pow(10, decimal)
    let result = divide(Math.round(Math.abs(times(num, base))), base)

    if (Number(num) < 0 && result !== 0) {
        result = times(result, -1)
    }

    return result
}

export {
    strip,
    plus,
    minus,
    times,
    divide,
    accurateRound,
    digitLength,
    float2Int,
    enableBoundaryChecking
}

export default {
    strip,
    plus,
    minus,
    times,
    divide,
    accurateRound,
    digitLength,
    float2Int,
    enableBoundaryChecking
}
