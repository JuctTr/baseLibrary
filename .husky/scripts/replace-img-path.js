const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const { spawn } = require("child_process");

const HOME_DIR = process.env.HOME;

const CWD = process.cwd();

const DEFAULT_OPTION = {
  filesDir: CWD,
  extension: ".md",
  matchContent: "",
  targetContent: "",
};

function replaceFileContent(options = DEFAULT_OPTION) {
  const { filesDir, extension, matchContent, targetContent } = options;

  fs.readdir(filesDir, "utf8", function (err, files) {
    if (err) return console.log(chalk.redBright(`【读取目录出错】=> `, err));

    //根据后缀名筛选要操作的文件
    const targetFiles = files.filter(function (file) {
      return path.extname(file).toLowerCase() === extension;
    });

    if (!targetFiles.length) return null;

    targetFiles.forEach((item) => {
      const targetFilePath = path.join(filesDir, item);

      console.log("【pre-commit】=> 变更文件", targetFilePath);

      fs.readFile(targetFilePath, "utf8", function (err, data) {
        if (err)
          return console.log(chalk.redBright(`【读取文件出错】=> `, err));
        const result = data.replace(
          new RegExp(matchContent, "g"),
          targetContent
        );
        fs.writeFile(targetFilePath, result, "utf8", function (err) {
          if (err)
            return console.log(chalk.redBright(`【写入文件出错】=> `, err));
          console.log(
            chalk.greenBright("【pre-commit】=> ", "替换图片路径成功～")
          );
          // 提交该文件
          spawn("git", ["add", targetFilePath]);
        });
      });
    });
  });
}

replaceFileContent({
  filesDir: CWD,
  extension: ".md",
  matchContent: `${HOME_DIR}/Library/Application Support/typora-user-images`,
  targetContent: "./assets/images",
});

module.exports = {
  replaceFileContent,
};
