<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**目录**

- [baseLibrary](#baselibrary)
  - [初始化项目](#%E5%88%9D%E5%A7%8B%E5%8C%96%E9%A1%B9%E7%9B%AE)
  - [包管理器](#%E5%8C%85%E7%AE%A1%E7%90%86%E5%99%A8)
    - [参考来源](#%E5%8F%82%E8%80%83%E6%9D%A5%E6%BA%90)
  - [小插曲](#%E5%B0%8F%E6%8F%92%E6%9B%B2)
  - [git hooks](#git-hooks)
    - [husky](#husky)
      - [自动安装](#%E8%87%AA%E5%8A%A8%E5%AE%89%E8%A3%85)
  - [代码规范](#%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83)
    - [eslint](#eslint)
    - [prettier](#prettier)
    - [Lint-staged](#lint-staged)
    - [Git 提交信息规范](#git-%E6%8F%90%E4%BA%A4%E4%BF%A1%E6%81%AF%E8%A7%84%E8%8C%83)
      - [commitlint](#commitlint)
  - [代码打包](#%E4%BB%A3%E7%A0%81%E6%89%93%E5%8C%85)
    - [参考来源](#%E5%8F%82%E8%80%83%E6%9D%A5%E6%BA%90-1)
  - [多包依赖管理](#%E5%A4%9A%E5%8C%85%E4%BE%9D%E8%B5%96%E7%AE%A1%E7%90%86)
    - [参考来源](#%E5%8F%82%E8%80%83%E6%9D%A5%E6%BA%90-2)
  - [包版本更新和发布](#%E5%8C%85%E7%89%88%E6%9C%AC%E6%9B%B4%E6%96%B0%E5%92%8C%E5%8F%91%E5%B8%83)
    - [新手指南](#%E6%96%B0%E6%89%8B%E6%8C%87%E5%8D%97)
  - [自动化部署](#%E8%87%AA%E5%8A%A8%E5%8C%96%E9%83%A8%E7%BD%B2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# baseLibrary

本项目描述搭建一个基础工具库的工程化流程。

## 初始化项目

请带着问题开始：

1.  `npm`早期版本（v1/v2）的工作模式存在着什么问题？
1.  `npm`v3 做了什么事情？还存在什么问题？
1.  为什么会有`.lock`文件？`workspaces`是什么东西？
1.  `pnpm`的依赖管理策略，解决了什么问题？有什么特点？
1.  什么是`monorepo`？我们应该怎么使用它？

```bash
username@usernameMacBook-Pro baseLibrary % pnpm init

Wrote to /Users/wangyicong/Desktop/baseLibrary/package.json

{
  "name": "baseLibrary",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

## 包管理器

强制使用 pnpm 来初始化我们的项目

在`package.json`文件中，加入一下脚本

```json
{
	...
  "scripts": {
		"preinstall": "npx only-allow pnpm",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
	...
}

```

我们尝试使用`npm install`，看出现什么效果？

```bash
username@usernamedeMacBook-Pro baseLibrary % npm install

> base-library@1.0.0 preinstall /Users/username/Desktop/baseLibrary
> npx only-allow pnpm

npx: 20 安装成功，用时 8.703 秒
╔═════════════════════════════════════════════════════════════╗
║                                                             ║
║   Use "pnpm install" for installation in this project.      ║
║                                                             ║
║   If you don't have pnpm, install it via "npm i -g pnpm".   ║
║   For more details, go to https://pnpm.js.org/              ║
║                                                             ║
╚═════════════════════════════════════════════════════════════╝
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! base-library@1.0.0 preinstall: `npx only-allow pnpm`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the base-library@1.0.0 preinstall script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/username/.npm/_logs/2022-12-26T13_38_33_479Z-debug.log
```

当然我们也可以在`pnpm install`前后执行其他自定义逻辑，如下：

```bash
{
	...
  "scripts": {
		"preinstall": "npx only-allow pnpm && node ./build/pre-install", // && 我们也可以换成 || ，逻辑同js运算符
		"postinstall": "node ./build/post-install",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
	...
}
```

添加`pre-install.js`文件

```javascript
#!/usr/bin/env node
console.log('npm_execpath', process.env.npm_execpath)
console.log('npm_config_user_agent', process.env.npm_config_user_agent)
console.log('【⚠️注意】=> ', '请使用pnpm包管理工具哦')
```

添加`post-install.js`文件

```js
#!/usr/bin/env node
console.log('【⚠️注意】=> ', '使用pnpm install 后执行')
```

效果如下：

```bash
username@usernamedeMacBook-Pro baseLibrary % pnpm install
Already up to date

> base-library@1.0.0 preinstall /Users/username/Desktop/baseLibrary
> npx only-allow pnpm && node ./build/pre-install

npx: 20 安装成功，用时 2.487 秒
npm_execpath /Users/username/.nvm/versions/node/v14.19.3/lib/node_modules/pnpm/bin/pnpm.cjs
npm_config_user_agent pnpm/7.17.1 npm/? node/v14.19.3 darwin x64
【⚠️注意】=>  请使用pnpm包管理工具哦

> base-library@1.0.0 postinstall /Users/username/Desktop/baseLibrary
> node ./build/post-install

【⚠️注意】=>  使用pnpm install 后执行
Done in 3s
```

当然我们也可以不使用`npx only-allow pnpm`，也可以自己写一个脚本如下：

```bash
const agent = process.env.npm_config_user_agent
const { error } = console

if (!agent.startsWith('pnpm')) {
    error('\n 在这个仓库中，请使用 pnpm 来管理依赖。$ npm i pnpm -g\n')
    process.exit(1)
}
```

使用：

```json
{
	...
  "scripts": {
		"preinstall": "node ./build/pre-install",
  },
	...
}
```

### 参考来源

[下一代的前端工具链 vite ](https://github.com/vitejs/vite)

[【若川视野 x 源码共读】16 期 - preinstall 钩子和 only-allow](https://juejin.cn/post/7091984044166447141)

https://docs.npmjs.com/cli/v8/using-npm/scripts#npm-install

## 小插曲

在上一节中，我考虑我使用`Typora`写 md 文档时，难免会在本地复制粘贴一些图片，我们来看路径长什么样？

这样：`/Users/username/Library/Application Support/typora-user-images/image-20221226221413625.png`

那么我可不可以把以上的路径，在`git commit`之前，把他扭转为`项目根路径/assets/images/image-20221226221413625.png`，再 commit？

~~用我的蹩脚 shell 命令，搞一个脚本来解决这个问题。~~

不废话，两个目的：

1. 把`/Users/username/Library/Application Support/typora-user-images/`目录下的文件，复制到项目根目录下的`/assets/images/`
2. `git commit`之前，把`*.md`文档中，所有的`/Users/username/Library/Application Support/typora-user-images/，` 替换为`./assets/images/`

新增`copy-img.js`文件

```js
const path = require('path')
const fs = require('fs')

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

    const toDay = year + month + day

    console.log('【当前日期】=> ', toDay)

    const toDayImgs = allImgs.filter(item => {
        const m = item.match(/image-(\d{0,8})/)
        if (!m.length) return false
        const mDay = m[1] || ''
        if (mDay === toDay) return true
    })
    toDayImgs.forEach(item => {
        const localImgDir = path.resolve(typoraImgDir, item)
        const assetsImgDir = path.resolve(assetsDir, item)
        fs.copyFileSync(localImgDir, assetsImgDir)
    })
}

copyTyporaImgToProjectAssets()

module.exports = {
    copyTyporaImgToProjectAssets
}
```

新增一个 node 脚本`replace-img-path.js`：

脚本有点简陋，凑合着看

```shell
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

```

ps：f\*\*k，一开始没想到用 node 来搞，还一直去折腾 Linux 命令，还写了一个 shell 脚本 🤡

## git hooks

带着问题开始：

1. 什么是 Git Hooks？
2. Git Hooks 跟 持续集成（CI/CD）有什么关系，能为工程化项目部署做什么事情？
3. 。。。。。

那么如何在`git commit`之前，执行我们写的脚本呢？

### [husky](https://typicode.github.io/husky/#/)

当你提交或推送时，你可以用它来提示你的提交信息，运行测试，提示代码等。husky 支持所有的 Git 钩子。

关于 husky 具体如何高效使用，可以自行查阅官网。

#### 自动安装

```bash
username@usernamedeMBP baseLibrary % pnpm dlx husky-init && pnpm install
.../Library/pnpm/store/v3/tmp/dlx-19030  |   +2 +
.../Library/pnpm/store/v3/tmp/dlx-19030  | Progress: resolved 2, reused 2, downloaded 0, added 2, done
husky-init updating package.json
  "husky install" command already exists in prepare script, skipping.
husky - Git hooks installed
husky - created .husky/pre-commit

please review changes in package.json
Packages: +1
+
Packages are hard linked from the content-addressable store to the virtual store.
  Content-addressable store is at: /Users/username/Library/pnpm/store/v3
  Virtual store is at:             node_modules/.pnpm
Progress: resolved 1, reused 0, downloaded 0, added 0
.......
.......
忽略
```

可以看到我们的项目根目录生成了`.husky`文件，该文件中有一个`pre-commit`脚本，那么我们就可以在这里执行我们的`replace-img-path.js`脚本，替换图片的路径：

在.husky 新建 scripts 目录，把我们写好的`copy-img.js`和`replace-img-path.js`文件放进去即可。

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

node .husky/scripts/copy-img.js

node .husky/scripts/replace-img-path.js
```

读者可以根据自己电脑的路径，稍微修改脚本内容。

## 代码规范

1. eslints 和 prettier 的原理是什么？
2. 。。。。。。

这块细节不会讲太多，只是罗列一下步骤。

> 注意 ⚠️：安装完`eslint`和`prettier`相关的插件包，在验证是否生效前，建议重启一下编辑器。

![image-20221227203720419](./assets/images/image-20221227203720419.png)

项目新建`.vscode` 文件，加入`settings.json`

```json
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll": true
    }
}
```

你也可以根据你自己的情况，调整配置

### eslint

```bash
pnpm i eslint -D
```

```bash
npx eslint --init
```

![image-20221227195858787](./assets/images/image-20221227195858787.png)

或

```bash
pnpm i typescript @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest -D
```

### prettier

```bash
 pnpm i prettier eslint-config-prettier eslint-plugin-prettier -D
```

.prettierrc.js 文件

```javascript
module.exports = {
    singleQuote: true,
    semi: false,
    arrowParens: 'avoid',
    trailingComma: 'none'
}
```

.eslintrc.js 文件

```javascript
module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    globals: {},
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        // 用来覆盖 ESLint 本身的规则配置
        'prettier',
        'plugin:prettier/recommended'
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {},
    // eslint-plugin-prettier 用于让 Prettier 来接管eslint --fix即修复代码的能力
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': 'error'
    }
}
```

检查编辑器输出这块，没有报错一般就没有问题。

![image-20221227210915504](./assets/images/image-20221227210915504.png)

eslints 这一块里面每一个字段的含义，大家自行查阅，不过我建议可以看看成熟的开源项目，不太建议看官网

### Lint-staged

只对存入`暂存区`的文件进行 Lint 检查，大大提高`commit`代码的效率。

官方仓库：https://github.com/okonet/lint-staged

```bash
pnpm i lint-staged -D
```

package.json 文件添加如下代码（只是一个示例）：

可以自行调整，比如你项目是 React 技术栈，那么可以增加.jsx,.tsx 的校验，如果项目是 Vue 技术栈，可以增加.vue 的校验。。。。。。

```json
{
    ...
    "lint-staged": {
        "*.{ts,js}": [
            "eslint --cache --fix"
        ],
        "**/(package|tsconfig(.*)?).json": [
            "prettier --write"
        ],
        "(pnpm-workspace|.github/**/*).{yml,yaml}": [
            "prettier --write"
        ],
        "((.github/**/*)|(README|CHANGELOG)|(**/(README|CHANGELOG))).md": [
            "prettier --write"
        ]
    }
  ...
}

```

`.husky/pre-commit` 文件中添加：

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

node .husky/scripts/copy-img.js

node .husky/scripts/replace-img-path.js

pnpm exec lint-staged --allow-empty
```

### Git 提交信息规范

#### commitlint

官网：https://commitlint.js.org/#/

```bash
pnpm install @commitlint/cli @commitlint/config-conventional -D
```

添加`.commitlintrc.js`文件

```javascript
module.exports = {
    extends: ['@commitlint/config-conventional']
}
```

添加 git hooks：

```bash
npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"
```

在`.husky`目录下多出了`commit-msg`脚本文件，输入一个错误的 commit 信息，commitlint 会自动抛出错误并退出。

## 代码打包

**......待更新**

### 参考来源

[使用 Vite 和 TypeScript 带你从零打造一个属于自己的 Vue3 组件库](https://www.51cto.com/article/715946.html)

## 多包依赖管理

**......待更新**

### 参考来源

-   [Replacing Lerna + Yarn with PNPM Workspaces](https://www.raulmelo.dev/blog/replacing-lerna-and-yarn-with-pnpm-workspaces)

## 包版本更新和发布

### 新手指南

1. 去官网注册一个 npm 账号；

2. 进到某一个包的目录，执行`pnpm publish`

    ```bash
    username@usernamedeMacBook-Pro test % pnpm publish
    npm notice
    npm notice 📦  @base/test@1.0.0
    npm notice === Tarball Contents ===
    npm notice 288B  dist/index.js
    npm notice 434B  dist/lib/is-plain-object.js
    npm notice 746B  package.json
    npm notice 197B  README.md
    npm notice 255B  dist/index.d.ts
    npm notice 0     types/index.d.ts
    npm notice 335B  dist/lib/is-plain-object.d.ts
    npm notice 399B  lib/is-plain-object.ts
    npm notice 1.1kB LICENSE
    npm notice === Tarball Details ===
    npm notice name:          @base/test
    npm notice version:       1.0.0
    npm notice package size:  1.9 kB
    npm notice unpacked size: 3.7 kB
    npm notice shasum:        x x x x x x x x x x x x x x x
    npm notice integrity:     x x x x x x x x x x x x x x x
    npm notice total files:   9
    npm notice
    npm ERR! code E404
    npm ERR! 404 Not Found - PUT https://registry.npmjs.org/@base%2ftest - Not found
    npm ERR! 404
    npm ERR! 404  '@base/test@1.0.0' is not in the npm registry.
    npm ERR! 404 You should bug the author to publish it (or use the name yourself!)
    npm ERR! 404
    npm ERR! 404 Note that you can also install from a
    npm ERR! 404 tarball, folder, http url, or git url.

    npm ERR! A complete log of this run can be found in:
    npm ERR!     /Users/username/.npm/_logs/2022-12-30T14_07_03_959Z-debug.log
    ```

    说明你的没有登陆的你的账户，请登陆：

    ```bash
    username@usernamedeMacBook-Pro test % pnpm login
    Username: jucttr
    Password:
    Email: (this IS public) xxxxxxxxxx@qq.com // 输入你的邮箱
    npm notice Please check your email for a one-time password (OTP)
    Enter one-time password: xxxxxx // 验证码
    Logged in as jucttr on https://registry.npmjs.org/.
    ```

    再次执行`pnpm publish`，出现：

    ```bash
    username@usernamedeMacBook-Pro test % pnpm publish
    // ...... 忽略 ......
    npm notice
    npm ERR! code E402
    npm ERR! 402 Payment Required - PUT https://registry.npmjs.org/@base%2ftest - You must sign up for private packages

    npm ERR! A complete log of this run can be found in:
    npm ERR!     /Users/username/.npm/_logs/2022-12-30T14_10_14_957Z-debug.log
    ```

    说是要付费。。。。。。，`npm publish`会默认发布为私有包，但是 npm 的私有包需要付费，所以需要添加如下参数进行发布:

    ```bash
    pnpm publish --access public
    ```

    ```bash
     ERR_PNPM_GIT_UNCLEAN  Unclean working tree. Commit or stash changes first.

    If you want to disable Git checks on publish, set the "git-checks" setting to "false", or run again with "--no-git-checks".
    ```

    发布时，会检查你的 git 工作区是否干净，我么可以在.npmrc 文件中设置 git-checks=false，或者

    ```bash
    pnpm publish --access public --no-git-checks
    ```

    如果你在发布时遇到 npm 404 Err 的错误，如下所示，由于 404 错误有很多种情况，我这里罗列我遇到的一种，就是我的用户名和我发布的包名不一致。

    ```bash
    npm ERR! code E404
    npm ERR! 404 Not Found - PUT https://registry.npmjs.org/@base%2ftest - Not found
    npm ERR! 404
    npm ERR! 404  '@base/test@0.0.1' is not in the npm registry.
    npm ERR! 404 You should bug the author to publish it (or use the name yourself!)
    npm ERR! 404
    npm ERR! 404 Note that you can also install from a
    npm ERR! 404 tarball, folder, http url, or git url.
    ```

    由于我的包名使用了`scoped`（作用范围），所以我的包名@后面要和我的 npm 账户用户名一致。

    详情请见：https://docs.npmjs.com/creating-and-publishing-scoped-public-packages

3. 去官网查看是否发布成功；

## 自动化部署
