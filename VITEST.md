<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**目录**

- [使用指南](#%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97)
  - [安装](#%E5%AE%89%E8%A3%85)
    - [为啥要`-w`呢？](#%E4%B8%BA%E5%95%A5%E8%A6%81-w%E5%91%A2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 使用指南

## 安装

```bash
pnpm add -D vitest -w 
```

### 为啥要`-w`呢？

我们如果在pnpm的工作区环境（workspace）安装依赖，如果没有带`-w`，会报这样的错误：

```bash
 ERR_PNPM_ADDING_TO_ROOT  Running this command will add the dependency to the workspace root, which might not be what you want - if you really meant it, make it explicit by running this command again with the -w flag (or --workspace-root). If you don't want to see this warning anymore, you may set the ignore-workspace-root-check setting to true.
运行此命令将把依赖项添加到工作区根目录，这可能不是您想要的 — 如果您真的想这样做，可以使用-w标志(或——workspace-root)再次运行此命令，使其显式化。如果您不想再看到这个警告，可以将ignore-workspace-root-check设置为true。
```

第一次看，还不知道最后这句话什么意思？后面了解到，有一个npm的全局配置文件`.npmrc` ，npm执行时会从命令行、环境变量和npmrc文件中获得其配置设置：

```text
ignore-workspace-root-check=true
```

官方文档：https://docs.npmjs.com/cli/v9/configuring-npm/npmrc



简单看了一下vitest，一大堆配置，目前不想深入了解这些，暂时不更新，项目中只是加了简单的script命令，跑通一下而已，后续用到，看一些开源项目进行学习。



