import { beforeAll } from 'vitest'

// 运行每个测试文件之前，将会执行这个文件

beforeAll(async s => {
    // console.log(s)
    console.log('在这里我可以开启一个浏览器实例')
})
