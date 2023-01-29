/**
 * @ignore
 * @module @base/array
 */

// 得到一个两数之间的随机数，包含lower 和 upper
function baseRandom(lower: number, upper: number): number {
    return lower + Math.floor(Math.random() * (upper - lower + 1))
}

/**
 * 随机打乱一个数组
 * @function shuffleArray
 * @param {Array} array  待打乱数组
 * @return {Array}       已经打乱的数组
 * @example
 * shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9])
 */
export default function shuffleArray(array: [], size: number) {
    const len = array.length
    const lastIndex = len - 1
    let index = 0

    size = size === undefined ? len : size
    while (index < size) {
        const rand = baseRandom(index, lastIndex)
        const temp = array[index]
        array[index] = array[rand]
        array[rand] = temp
        index++
    }
    return array
}
