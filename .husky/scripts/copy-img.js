const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const { spawn } = require('child_process')

function copyTyporaImgToProjectAssets() {
    // Typora 软件存放图片的位置
    const typoraImgDir = path.resolve(
        process.env.HOME,
        'Library/Application Support/typora-user-images'
    )
    // 项目存放图片的位置
    const assetsDir = path.resolve(process.cwd(), 'assets/images')

    // 读取typoraImgDir目录所有图片
    const allImgs = fs.readdirSync(typoraImgDir)
    // 把当天添加的图片，都复制到项目图片目录来
    const year = new Date().getFullYear().toString()
    const month = (new Date().getMonth() + 1).toString()
    const day = new Date().getDate().toString()

    console.log('今天日期是：', `${year}/${month}/${day}`)
    const toDay = Date.parse(`${year}/${month}/${day}`)

    const toDayImgs = allImgs.filter(item => {
        const m = item.match(/image-(\d{4})(\d{2})(\d{2})/)
        if (!m.length) return false
        let mDay = Date.now()
        if (m[1] && m[2] && m[3]) {
            mDay = Date.parse(`${m[1]}/${m[2]}/${m[3]}`)
        }
        if (mDay === toDay) return true
    })
    if (!toDayImgs.length) return console.log('暂无匹配到图片~')
    toDayImgs.forEach(item => {
        const localImgDir = path.resolve(typoraImgDir, item)
        const assetsImgDir = path.resolve(assetsDir, item)
        fs.copyFile(localImgDir, assetsImgDir, () => {
            console.log(
                chalk.greenBright(
                    '【pre-commit】=> ',
                    '图片复制到assets目录成功～'
                )
            )
            // 提交该文件
            spawn('git', ['add', assetsImgDir])
        })
    })
}

copyTyporaImgToProjectAssets()

module.exports = {
    copyTyporaImgToProjectAssets
}
