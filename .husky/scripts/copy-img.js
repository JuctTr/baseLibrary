const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

function copyTyporaImgToProjectAssets() {
  // Typora 软件存放图片的位置
  const typoraImgDir = path.resolve(
    process.env.HOME,
    "Library/Application Support/typora-user-images"
  );
  // 项目存放图片的位置
  const assetsDir = path.resolve(process.cwd(), "assets/images");

  // 读取typoraImgDir目录所有图片
  const allImgs = fs.readdirSync(typoraImgDir);
  // 把当天添加的图片，都复制到项目图片目录来
  const year = new Date().getFullYear().toString();
  const month = (new Date().getMonth() + 1).toString();
  const day = new Date().getDate().toString();

  const toDay = year + month + day;

  console.log("【当前日期】=> ", toDay);

  const toDayImgs = allImgs.filter((item) => {
    const m = item.match(/image-(\d{0,8})/);
    if (!m.length) return false;
    const mDay = m[1] || "";
    if (mDay === toDay) return true;
  });
  toDayImgs.forEach((item) => {
    const localImgDir = path.resolve(typoraImgDir, item);
    const assetsImgDir = path.resolve(assetsDir, item);
    fs.copyFileSync(localImgDir, assetsImgDir);
  });
  console.log(
    chalk.greenBright("【pre-commit】=> ", "图片复制到assets目录成功～")
  );
}

copyTyporaImgToProjectAssets();

module.exports = {
  copyTyporaImgToProjectAssets,
};
