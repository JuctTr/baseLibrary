/**
 * 千分位分割数字
 * @param {Number} num
 * @returns {String}
 *
 * @example
 * addComma(123456789) // '123,456,789'
 */
function addComma(num: number): string {
    return `${num}`.replace(/(^|\s|-)\d+/g, m =>
        m.replace(/(?=(?!\b)(\d{3})+$)/g, ',')
    )
}

export { addComma }

export default {
    addComma
}
