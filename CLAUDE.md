# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

baseLibrary 是一个现代化的 TypeScript 工具库 monorepo，采用业界领先的工程化实践。项目使用 **pnpm + Turborepo + Changesets + tsup** 技术栈，提供高质量、可维护的工具函数包。

## 核心架构

### Monorepo 结构
```
baseLibrary/
├── packages/          # 核心工具包
│   ├── array/         # @jucttr/array - 数组工具
│   ├── object/        # @jucttr/object - 对象工具
│   ├── number/        # @jucttr/number - 数字工具
│   ├── datatime/      # @jucttr/datatime - 日期时间工具
│   ├── storage/       # @jucttr/storage - 存储工具
│   ├── test/          # @jucttr/test - 测试工具
│   ├── test2/         # @jucttr/test2 - 测试工具2
│   └── types/         # @jucttr/types - 类型定义
├── web-docs/          # 文档站点 (VitePress)
├── shared/            # 共享配置
│   ├── tsup.config.base.ts
│   └── vite.config.base.ts
├── scripts/           # 自动化脚本
└── .github/workflows/  # CI/CD 工作流
```

### 技术栈架构
- **包管理**: pnpm workspace + Lerna
- **任务编排**: Turborepo (增量构建、缓存优化)
- **构建工具**: tsup (快速 TypeScript 构建)
- **测试框架**: Vitest (Jest 替代品)
- **版本管理**: Changesets (语义化版本)
- **文档**: VitePress

## 常用开发命令

### 环境准备
```bash
# 安装依赖 (强制使用 pnpm)
pnpm install

# 检查包的所有者权限
pnpm owners:ls

# 添加包的所有者
pnpm owners:add <username>
```

### 日常开发
```bash
# 开发模式 (监听所有 @jucttr/* 包)
pnpm dev

# 构建所有包
pnpm build

# 构建特定包
pnpm build:filter @jucttr/array

# 类型检查 (所有包)
pnpm test:types

# 运行测试
pnpm test
pnpm test:ui
pnpm coverage

# 代码格式化
pnpm format
pnpm format:check

# 代码检查
pnpm lint

# 清理构建产物
pnpm clean
```

### 版本管理流程
```bash
# 创建变更集 (描述要发布的更改)
pnpm changeset

# 应用版本更新 (基于 changesets)
pnpm version-packages

# 发布到 npm
pnpm release

# 或手动发布单个包
cd packages/array
npm publish
```

### 文档开发
```bash
# 文档开发模式
pnpm docs:dev

# 构建文档
pnpm docs:build

# 预览文档
pnpm docs:preview
```

## 工作流架构

### 构建系统
每个包使用共享的 tsup 配置，自动生成：
- ES Module 格式 (`dist/es/`)
- CommonJS 格式 (`dist/cjs/`)
- TypeScript 声明文件 (`.d.ts`)
- Source Maps

### Turborepo 任务依赖
```
build → test → dev
  ↓      ↓      ↓
dist   coverage  watch
```

### 发布流程
1. 开发功能并测试
2. 创建 changeset: `pnpm changeset`
3. 提交代码到 master
4. GitHub Actions 自动运行 CI
5. 合并 PR 自动发布到 npm

## 关键配置

### Turbo 缓存策略
- 构建产物缓存: `dist/**`, `types/**`
- 测试覆盖率缓存: `coverage/**`
- 开发模式不使用缓存

### TypeScript 配置
- 严格模式: `strict: true`
- 目标版本: `ES2017`
- 支持 DOM 和 ES6+
- 项目引用支持

### Changesets 配置
- 公共包访问: `access: public`
- 忽略文档包: `web-docs`
- 内部依赖更新策略: `patch`

## 开发注意事项

### 包依赖管理
- 使用 pnpm workspace 管理内部依赖
- 禁止使用相对路径，必须使用路径别名
- 内部包引用: `@jucttr/package-name`

### 版本控制
- 所有包独立版本管理
- 使用 Changesets 管理版本变更
- 遵循语义化版本规范

### 构建要求
- 每个包必须通过类型检查
- 构建产物包含 ESM 和 CJS 格式
- 自动生成类型声明文件

### Git 工作流
- 强制使用 pnpm 包管理器
- 提交前自动 lint 检查
- 支持 Typora 图片路径自动替换

## 新包开发

### 创建新包
```bash
# 使用自动化脚本
pnpm create:package --name=new-package-name

# 手动创建 (不推荐)
mkdir packages/new-package
# 复制模板文件并修改配置
```

### 包结构标准
```
packages/new-package/
├── src/
│   └── index.ts
├── package.json
├── tsup.config.ts
├── tsconfig.json
└── README.md
```

### 发布新包
1. 确保包名以 `@jucttr/` 开头
2. 设置正确的 `publishConfig.access: public`
3. 添加到 Changesets 忽略列表（如需要）

## 故障排除

### 常见问题
- **构建失败**: 检查 TypeScript 类型错误
- **发布权限**: 确认 npm 包的所有者权限
- **缓存问题**: 使用 `pnpm clean` 清理
- **依赖冲突**: 使用 `pnpm install --force`

### 调试命令
```bash
# 检查 pnpm 配置
pnpm config list

# 清理缓存
pnpm store prune
rm -rf node_modules/.turbo

# 验证包配置
pnpm test:types
pnpm build
```

## 性能优化

### Turborepo 缓存
- 利用任务依赖关系进行增量构建
- 构建产物缓存加速 CI/CD
- 开发模式支持热重载

### tsup 构建优化
- 零配置 TypeScript 构建
- 并行处理多种输出格式
- 自动外部依赖处理

这个项目展示了现代化 monorepo 的最佳实践，提供了高效、可靠、可维护的工具库开发体验。