import { describe, expect, test } from 'vitest'
import NP from '../src/operation'

describe('operation', () => {
    // let originalWarn: any

    // beforeAll(() => {
    //     console.log('生命周期---BeforeAll--在本文件所有测试用例执行之前')
    //     originalWarn = global.console.warn
    //     global.console.warn = jest.fn()
    // })

    // beforeEach(() => {
    //   console.log('生命周期---BeforeEach--在每一个测试用例执行之前')
    // })

    // afterEach(() => {
    //   console.log('生命周期---AfterEach--在每一个测试用例执行之后')
    // })

    // afterAll(() => {
    //     console.log('生命周期---AfterAll--在测试用例执行结束之后')
    //     global.console.warn = originalWarn
    // })

    test('NP.strip 消除 舍入 运算的误差', () => {
        expect(NP.strip(0.09999999999999998) === 0.1).toBeTruthy()
        // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
        expect(NP.strip(1.0000000000000001) === 1).toBeTruthy()
        expect(NP.strip('0.09999999999999998') === 0.1).toBeTruthy()
        expect(NP.strip('1.0000000000000001') === 1).toBeTruthy()
    })

    test('NP.digitLength 数字长度运算', () => {
        expect(NP.digitLength(123.4567890123) === 10).toBeTruthy()

        expect(NP.digitLength(1.23e-5) === 7).toBeTruthy()
        expect(NP.digitLength(1.23e-5) === 7).toBeTruthy()
        expect(NP.digitLength(1.233467e-5) === 11).toBeTruthy()
        expect(NP.digitLength(123.45e-5) === 7).toBeTruthy()
        expect(NP.digitLength(1.23e-10) === 12).toBeTruthy()
        expect(NP.digitLength(1.23e1) === 1).toBeTruthy()
        expect(NP.digitLength(1e20) === 0).toBeTruthy()
        expect(NP.digitLength(1.12345e20) === 0).toBeTruthy()
        expect(NP.digitLength(1.123e30) === 0).toBeTruthy()
        expect(NP.digitLength(1.123e-100) === 103).toBeTruthy()
        expect(NP.digitLength('1.23e-5') === 7).toBeTruthy()
        expect(NP.digitLength('1.23E-5') === 7).toBeTruthy()
        expect(NP.digitLength('1.233467e-5') === 11).toBeTruthy()
        expect(NP.digitLength('123.45e-5') === 7).toBeTruthy()
        expect(NP.digitLength('1.23e-10') === 12).toBeTruthy()
        expect(NP.digitLength('1.23e1') === 1).toBeTruthy()
        expect(NP.digitLength('1e20') === 0).toBeTruthy()
        expect(NP.digitLength('1.12345e20') === 0).toBeTruthy()
        expect(NP.digitLength('1.123e30') === 0).toBeTruthy()
        expect(NP.digitLength('1.123e-100') === 103).toBeTruthy()
    })

    test('NP.float2Int can change float to fixed', () => {
        expect(NP.float2Int(1e-1) === 1).toBeTruthy()
        expect(NP.float2Int(1e-6) === 1).toBeTruthy()
        expect(NP.float2Int(1e-7) === 1).toBeTruthy()
        expect(NP.float2Int(1e-13) === 1).toBeTruthy()
        expect(NP.float2Int(1.123e30) === 1.123e30).toBeTruthy()
        expect(NP.float2Int(1.6e-30) === 16).toBeTruthy()
        expect(NP.float2Int(1.234567e-13) === 1234567).toBeTruthy()
        expect(NP.float2Int(1.2345678912345e10) === 12345678912345).toBeTruthy()
        expect(NP.float2Int(0.000000123456) === 123456).toBeTruthy()
        expect(NP.float2Int(1.23456e-7) === 123456).toBeTruthy()
        expect(NP.float2Int('1e-1') === 1).toBeTruthy()
        expect(NP.float2Int('1e-6') === 1).toBeTruthy()
        expect(NP.float2Int('1e-7') === 1).toBeTruthy()
        expect(NP.float2Int('1e-13') === 1).toBeTruthy()
        expect(NP.float2Int('1.123e30') === 1.123e30).toBeTruthy()
        expect(NP.float2Int('1.6e-30') === 16).toBeTruthy()
        expect(NP.float2Int('1.234567e-13') === 1234567).toBeTruthy()
        expect(
            NP.float2Int('1.2345678912345e10') === 12345678912345
        ).toBeTruthy()
        expect(NP.float2Int('0.000000123456') === 123456).toBeTruthy()
        expect(NP.float2Int('1.23456e-7') === 123456).toBeTruthy()
    })

    test('NP.plus 精确加法运算', () => {
        expect(NP.plus(0.1, 0.2) === 0.3).toBeTruthy()
        expect(NP.plus(2.3, 2.4) === 4.7).toBeTruthy()
        expect(NP.plus(-1.6, -1) === -2.6).toBeTruthy()
        expect(NP.plus(-2.0, 63) === 61).toBeTruthy()
        expect(NP.plus(-3, 7) === 4).toBeTruthy()
        expect(NP.plus(-221, 38) === -183).toBeTruthy()
        expect(NP.plus(-1, 0) === -1).toBeTruthy()
        expect(NP.plus(2.018, 0.001) === 2.019).toBeTruthy()
        expect(NP.plus(1.3224e10, 1.3224e3) === 13224001322.4).toBeTruthy()
        expect(NP.plus(1.6e-30, 1.6e-30) === 3.2e-30).toBeTruthy()
        expect(NP.plus('0.1', '0.2') === 0.3).toBeTruthy()
        expect(NP.plus('2.3', '2.4') === 4.7).toBeTruthy()
        expect(NP.plus('-1.6', '-1') === -2.6).toBeTruthy()
        expect(NP.plus('-2.0', '63') === 61).toBeTruthy()
        expect(NP.plus('-3', '7') === 4).toBeTruthy()
        expect(NP.plus('-221', '38') === -183).toBeTruthy()
        expect(NP.plus('-1', '0') === -1).toBeTruthy()
        expect(NP.plus('-1', '0', '2', '3', 4) === 8).toBeTruthy()
        expect(NP.plus('2.018', '0.001') === 2.019).toBeTruthy()
        expect(NP.plus('1.3224e10', '1.3224e3') === 13224001322.4).toBeTruthy()
        expect(NP.plus('1.6e-30', '1.6e-30') === 3.2e-30).toBeTruthy()

        expect(NP.plus(0.1, 0.2, 0.3) === 0.6).toBeTruthy()
        expect(NP.plus('0.1', '0.2', '0.3') === 0.6).toBeTruthy()

        expect(NP.plus(...new Array(500).fill(1)) === 500).toBeTruthy()
    })

    test('NP.minus 精确减法运算', () => {
        expect(NP.minus(0.07, 0.01) === 0.06).toBeTruthy()
        expect(NP.minus(0.7, 0.1) === 0.6).toBeTruthy()
        expect(NP.minus(1.0, 0.9) === 0.1).toBeTruthy()
        expect(NP.minus(1, 0) === 1).toBeTruthy()
        expect(NP.minus(1, -0) === 1).toBeTruthy()
        expect(NP.minus(-1, 0) === -1).toBeTruthy()
        expect(NP.minus(-1, -0) === -1).toBeTruthy()
        expect(NP.minus(1, 22) === -21).toBeTruthy()
        expect(
            // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
            NP.minus(8893568.397103781249, -7.2967405955) ===
                // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
                8893575.693844376749
        ).toBeTruthy()
        expect(NP.minus(105468873, 0) === 105468873).toBeTruthy()
        expect(NP.minus('0.07', '0.01') === 0.06).toBeTruthy()
        expect(NP.minus('0.7', '0.1') === 0.6).toBeTruthy()
        expect(NP.minus('1.0', '0.9') === 0.1).toBeTruthy()
        expect(NP.minus('1', '0') === 1).toBeTruthy()
        expect(NP.minus('1', '-0') === 1).toBeTruthy()
        expect(NP.minus('-1', '0') === -1).toBeTruthy()
        expect(NP.minus('-1', '-0') === -1).toBeTruthy()
        expect(NP.minus('1', '22') === -21).toBeTruthy()
        expect(
            NP.minus('8893568.397103781249', '-7.29674059550') ===
                // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
                8893575.693844376749
        ).toBeTruthy()
        expect(NP.minus('105468873', '0') === 105468873).toBeTruthy()

        expect(NP.minus(1.23e5, 10) === 122990).toBeTruthy()
        expect(NP.minus(1.23e-5, 1.0023) === -1.0022877).toBeTruthy()
        expect(NP.minus(1.3224e10, 21) === 13223999979).toBeTruthy()
        expect(NP.minus(1.3224e10, 1.3224e3) === 13223998677.6).toBeTruthy()
        expect(NP.minus(1.7e-30, 0.1e-30) === 1.6e-30).toBeTruthy()
        expect(NP.minus('1.23e5', '10') === 122990).toBeTruthy()
        expect(NP.minus('1.23e-5', '1.0023') === -1.0022877).toBeTruthy()
        expect(NP.minus('1.3224e10', '21') === 13223999979).toBeTruthy()
        expect(NP.minus('1.3224e10', '1.3224e3') === 13223998677.6).toBeTruthy()
        expect(NP.minus('1.7e-30', '0.1e-30') === 1.6e-30).toBeTruthy()

        expect(NP.minus(6, 3, 2) === 1).toBeTruthy()
        expect(NP.minus(6, 3, 2, 1, 2, 3) === -5).toBeTruthy()
        expect(NP.minus('6', '3', '2') === 1).toBeTruthy()
        expect(NP.minus('6', '3', '2', '1', '2', '3') === -5).toBeTruthy()

        expect(NP.minus(500, ...new Array(500).fill(1)) === 0).toBeTruthy()
    })

    test('NP.times 精确乘法运算', () => {
        expect(NP.times(0.07, 100) === 7).toBeTruthy()
        expect(NP.times(0.7, 0.1) === 0.07).toBeTruthy()
        expect(NP.times(3, 0.3) === 0.9).toBeTruthy()
        expect(NP.times(118762317358.75, 1e-8) === 1187.6231735875).toBeTruthy()
        expect(NP.times(0.362, 100) === 36.2).toBeTruthy()
        expect(NP.times(1.1, 1.1) === 1.21).toBeTruthy()
        expect(NP.times(2.018, 1000) === 2018).toBeTruthy()
        // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
        expect(NP.times(5.2, -3.8461538461538462) === -20).toBeTruthy()
        expect(NP.times(1.22, -1.639344262295082) === -2).toBeTruthy()
        expect(NP.times(2.5, -0.92) === -2.3).toBeTruthy()
        expect(NP.times(-2.2, 0.6363636363636364) === -1.4).toBeTruthy()
        expect(NP.times('0.07', '100') === 7).toBeTruthy()
        expect(NP.times('0.7', '0.1') === 0.07).toBeTruthy()
        expect(NP.times('3', '0.3') === 0.9).toBeTruthy()
        expect(
            NP.times('118762317358.75', '1e-8') === 1187.6231735875
        ).toBeTruthy()
        expect(NP.times('0.362', '100') === 36.2).toBeTruthy()
        expect(NP.times('1.1', '1.1') === 1.21).toBeTruthy()
        expect(NP.times('2.018', '1000') === 2018).toBeTruthy()
        expect(NP.times('5.2', '-3.8461538461538462') === -20).toBeTruthy()
        expect(NP.times('1.22', '-1.639344262295082') === -2).toBeTruthy()
        expect(NP.times('2.5', '-0.92') === -2.3).toBeTruthy()
        expect(NP.times('-2.2', '0.6363636363636364') === -1.4).toBeTruthy()
        // expect(NP.times(-3, 2.3333333333333335) === 7).toBeTruthy()
        // expect(NP.times(-0.076, -92.10526315789471) === 7).toBeTruthy()
        expect(NP.times(8.0, -0.3625) === -2.9).toBeTruthy()
        expect(NP.times(6.6, 0.30303030303030304) === 2).toBeTruthy()
        expect(NP.times(10.0, -0.8) === -8).toBeTruthy()
        expect(NP.times(-1.1, -7.272727272727273) === 8).toBeTruthy()
        expect(NP.times('8.0', '-0.3625') === -2.9).toBeTruthy()
        expect(NP.times('6.6', '0.30303030303030304') === 2).toBeTruthy()
        expect(NP.times('10.0', '-0.8') === -8).toBeTruthy()
        expect(NP.times('-1.1', '-7.272727272727273') === 8).toBeTruthy()

        expect(NP.times(-1.23e4, 20) === -246000).toBeTruthy()
        expect(NP.times(1.7e-30, 1.5e20) === 2.55e-10).toBeTruthy()
        expect(NP.times('-1.23e4', '20') === -246000).toBeTruthy()
        expect(NP.times('1.7e-30', '1.5e20') === 2.55e-10).toBeTruthy()

        expect(NP.times(2, 2, 3) === 12).toBeTruthy()
        expect(NP.times(2, 2, 3, 0.1) === 1.2).toBeTruthy()
        expect(NP.times('2', '2', '3') === 12).toBeTruthy()
        expect(NP.times('2', '2', '3', '0.1') === 1.2).toBeTruthy()

        expect(
            NP.times(0.000000123456, 0.000000123456) === 1.5241383936e-14
        ).toBeTruthy()
        expect(
            NP.times(1.23456e-7, 1.23456e-7) === 1.5241383936e-14
        ).toBeTruthy()
        expect(
            NP.times('0.000000123456', '0.000000123456') === 1.5241383936e-14
        ).toBeTruthy()
        expect(
            NP.times('1.23456e-7', '1.23456e-7') === 1.5241383936e-14
        ).toBeTruthy()

        expect(NP.times(...new Array(500).fill(1)) === 1).toBeTruthy()
    })

    test('NP.divide 精确除法运算', () => {
        expect(NP.divide(1.21, 1.1) === 1.1).toBeTruthy()
        expect(NP.divide(4750.49269435, 4) === 1187.6231735875).toBeTruthy()
        expect(NP.divide(0.9, 3) === 0.3).toBeTruthy()
        expect(NP.divide(36.2, 0.362) === 100).toBeTruthy()
        // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
        expect(NP.divide(-20, 5.2) === -3.8461538461538462).toBeTruthy()
        expect(NP.divide(-2, 1.22) === -1.639344262295082).toBeTruthy()
        expect(NP.divide(-2.3, 2.5) === -0.92).toBeTruthy()
        expect(NP.divide(-1.4, -2.2) === 0.6363636363636364).toBeTruthy()
        expect(NP.divide(7, -3) === -2.3333333333333335).toBeTruthy()
        expect(NP.divide(7, -0.076) === -92.10526315789471).toBeTruthy()
        expect(NP.divide(-2.9, 8.0) === -0.3625).toBeTruthy()
        expect(NP.divide(2, 6.6) === 0.30303030303030304).toBeTruthy()
        expect(NP.divide(-8, 10.0) === -0.8).toBeTruthy()
        expect(NP.divide(8, -1.1) === -7.272727272727273).toBeTruthy()
        expect(NP.divide('1.21', '1.1') === 1.1).toBeTruthy()
        expect(NP.divide('4750.49269435', '4') === 1187.6231735875).toBeTruthy()
        expect(NP.divide('0.9', '3') === 0.3).toBeTruthy()
        expect(NP.divide('36.2', '0.362') === 100).toBeTruthy()
        // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
        expect(NP.divide('-20', '5.2') === -3.8461538461538462).toBeTruthy()
        expect(NP.divide('-2', '1.22') === -1.639344262295082).toBeTruthy()
        expect(NP.divide('-2.3', '2.5') === -0.92).toBeTruthy()
        expect(NP.divide('-1.4', '-2.2') === 0.6363636363636364).toBeTruthy()
        expect(NP.divide('7', '-3') === -2.3333333333333335).toBeTruthy()
        expect(NP.divide('7', '-0.076') === -92.10526315789471).toBeTruthy()
        expect(NP.divide('-2.9', '8.0') === -0.3625).toBeTruthy()
        expect(NP.divide('2', '6.6') === 0.30303030303030304).toBeTruthy()
        expect(NP.divide('-8', '10.0') === -0.8).toBeTruthy()
        expect(NP.divide('8', '-1.1') === -7.272727272727273).toBeTruthy()

        expect(NP.divide(-1.23e4, 20) === -615).toBeTruthy()
        expect(NP.divide(2.55e-10, 1.7e-30) === 1.5e20).toBeTruthy()
        expect(NP.divide('-1.23e4', '20') === -615).toBeTruthy()
        expect(NP.divide('2.55e-10', '1.7e-30') === 1.5e20).toBeTruthy()

        expect(NP.divide(12, 3, 2) === 2).toBeTruthy()
        expect(NP.divide(33.3333, 100) === 0.333333).toBeTruthy()
        expect(NP.divide(83.42894732749, 100) === 0.8342894732749).toBeTruthy()
        expect(NP.divide(1, 3) === 0.3333333333333333).toBeTruthy()
        expect(NP.divide('12', '3', '2') === 2).toBeTruthy()
        expect(NP.divide('33.3333', '100') === 0.333333).toBeTruthy()
        expect(
            NP.divide('83.42894732749', '100') === 0.8342894732749
        ).toBeTruthy()
        expect(NP.divide('1', '3') === 0.3333333333333333).toBeTruthy()

        expect(NP.divide(...new Array(500).fill(1)) === 1).toBeTruthy()
        expect(NP.divide(1024, 4, 8, 2) === 16).toBeTruthy()
    })

    test('NP.accurateRound 精确四舍五入运算', () => {
        expect(NP.accurateRound(0, 1) === 0).toBeTruthy()
        expect(NP.accurateRound(0, 0) === 0).toBeTruthy()
        expect(NP.accurateRound(0.7875, 3) === 0.788).toBeTruthy()
        expect(NP.accurateRound(0.105, 2) === 0.11).toBeTruthy()
        expect(NP.accurateRound(1, 1) === 1).toBeTruthy()
        expect(NP.accurateRound(0.1049999999, 2) === 0.1).toBeTruthy()
        expect(NP.accurateRound(0.105, 1) === 0.1).toBeTruthy()
        expect(NP.accurateRound(1.335, 2) === 1.34).toBeTruthy()
        expect(NP.accurateRound(1.35, 1) === 1.4).toBeTruthy()
        expect(NP.accurateRound(12345.105, 2) === 12345.11).toBeTruthy()
        expect(NP.accurateRound(0.0005, 2) === 0).toBeTruthy()
        expect(NP.accurateRound(0.0005, 3) === 0.001).toBeTruthy()
        expect(NP.accurateRound('0', 1) === 0).toBeTruthy()
        expect(NP.accurateRound('0', 0) === 0).toBeTruthy()
        expect(NP.accurateRound('0.7875', 3) === 0.788).toBeTruthy()
        expect(NP.accurateRound('0.105', 2) === 0.11).toBeTruthy()
        expect(NP.accurateRound('1', 1) === 1).toBeTruthy()
        expect(NP.accurateRound('0.1049999999', 2) === 0.1).toBeTruthy()
        expect(NP.accurateRound('0.105', 1) === 0.1).toBeTruthy()
        expect(NP.accurateRound('1.335', 2) === 1.34).toBeTruthy()
        expect(NP.accurateRound('1.35', 1) === 1.4).toBeTruthy()
        expect(NP.accurateRound('12345.105', 2) === 12345.11).toBeTruthy()
        expect(NP.accurateRound('0.0005', 2) === 0).toBeTruthy()
        expect(NP.accurateRound('0.0005', 3) === 0.001).toBeTruthy()

        expect(NP.accurateRound(1.2345e3, 3) === 1234.5).toBeTruthy()
        expect(NP.accurateRound(1.2344e3, 3) === 1234.4).toBeTruthy()
        expect(NP.accurateRound(1e3, 1) === 1000).toBeTruthy()
        expect(NP.accurateRound('1.2345e3', 3) === 1234.5).toBeTruthy()
        expect(NP.accurateRound('1.2344e3', 3) === 1234.4).toBeTruthy()
        expect(NP.accurateRound('1e3', 1) === 1000).toBeTruthy()

        expect(NP.accurateRound('-0.125', 2) === -0.13).toBeTruthy()
        expect(NP.accurateRound('-0.001', 2) === 0.0).toBeTruthy()
        expect(NP.accurateRound('-0.005', 2) === -0.01).toBeTruthy()
        expect(NP.accurateRound('0.125', 2) === 0.13).toBeTruthy()
        expect(NP.accurateRound('0.001', 2) === 0.0).toBeTruthy()
        expect(NP.accurateRound('0.005', 2) === 0.01).toBeTruthy()
        expect(NP.accurateRound(-0.125, 2) === -0.13).toBeTruthy()
        expect(NP.accurateRound(-0.001, 2) === 0.0).toBeTruthy()
        expect(NP.accurateRound(-0.005, 2) === -0.01).toBeTruthy()
        expect(NP.accurateRound(0.125, 2) === 0.13).toBeTruthy()
        expect(NP.accurateRound(0.001, 2) === 0.0).toBeTruthy()
        expect(NP.accurateRound(0.005, 2) === 0.01).toBeTruthy()

        expect(NP.accurateRound(123.345, 2) === 123.35).toBeTruthy()
    })
})
