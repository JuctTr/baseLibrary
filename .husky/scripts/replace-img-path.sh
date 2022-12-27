#!/usr/bin/env sh

# 脚本只要发生错误，就终止执行
# set -e
set -eux
set -o pipefail

# 用户名
username="$USER"
# 当前电脑的HOME目录
homeDir="$HOME"

sourceDir="$homeDir/Library/Application Support/typora-user-images"
# targetDir="$PWD/assets/images"
targetDir="./assets/images"


echo "图片源目录：$sourceDir"
echo "项目图片目录：$targetDir"

# 把 / 替换为 \/
s1=${sourceDir//\//\\\/}
# 把 ' ' 替换为 '\ '
s2=${s1// /\\ }
# 把 / 替换为 \/
t1=${targetDir//\//\\\/}
# 把 . 替换为 \.
t2=${t1//\./\\.}

# echo "替换完的字符串：$s1"
# echo "替换完的字符串：$t2"
declare sedReg="s/$s2/$t2/g"
# echo "sedReg:$sedReg"

# 寻找 . 目录中，除去node_modules目录，所有以.md为后缀的文件，替换路径
find . -path /node_modules -prune -o -name "*.md" -print | xargs sed -i '' "$sedReg"


