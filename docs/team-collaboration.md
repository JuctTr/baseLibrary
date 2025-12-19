# 团队协作指南

本文档介绍如何与团队成员协作开发和发布 `@jucttr/*` 包。

## 🚀 快速开始

### 1. 添加团队成员

#### 方式A：使用管理脚本（推荐）

```bash
# 添加新成员到所有包
pnpm owners:add friend-username

# 查看所有包的所有者
pnpm owners:ls

# 移除成员
pnpm owners:rm old-friend
```

#### 方式B：手动添加

```bash
# 为每个包添加成员
npm owner add friend-username @jucttr/array
npm owner add friend-username @jucttr/object
# ... 对每个包重复此操作
```

### 2. 团队成员设置

#### 新成员需要做的准备：

1. **注册 npm 账号**
   - 访问 [npmjs.com](https://npmjs.com) 注册账号
   - 设置双因子认证（2FA）

2. **Fork 项目**
   ```bash
   git clone https://github.com/your-username/baseLibrary.git
   cd baseLibrary
   pnpm install
   ```

3. **配置 npm 认证**
   ```bash
   npm login  # 输入你的 npm 用户名、密码和邮箱
   npm whoami  # 确认登录成功
   ```

## 🔄 开发工作流

### 1. 分支管理

```bash
# 创建功能分支
git checkout -b feature/new-feature

# 开发完成后创建 PR
git push origin feature/new-feature
```

### 2. 开发流程

1. **创建 Changeset**
   ```bash
   pnpm changeset
   # 选择要发布的包
   # 选择版本类型（patch, minor, major）
   # 添加变更描述
   ```

2. **提交代码**
   ```bash
   git add .
   git commit -m "feat: 添加新功能"
   git push
   ```

3. **合并到 master 分支后自动触发**
   - 自动运行测试和类型检查
   - 自动发布到 npm（如果有 changeset）
   - 自动更新文档

## 📦 发布流程

### 自动发布（推荐）

项目使用 GitHub Actions + Changesets 自动化发布：

1. **开发完成后添加 changeset**
   ```bash
   pnpm changeset
   ```

2. **合并到 master 分支**
   - CI/CD 会自动运行测试
   - 如果有 changeset，会自动创建版本发布 PR
   - 合并 PR 后自动发布到 npm

### 手动发布（备用方案）

```bash
# 更新版本
pnpm version-packages

# 发布到 npm
pnpm release
```

## 🔐 权限管理

### 包所有者权限

- **Owner**: 完全控制权限，可以添加/删除其他所有者
- **Maintainer**: 可以发布新版本，但不能管理所有者
- **Developer**: 只能查看包信息

### 管理所有者

```bash
# 查看当前所有者
pnpm owners:ls

# 添加新所有者
pnpm owners:add new-username

# 移除所有者
pnpm owners:rm old-username

# 更改权限（降级为 maintainer）
npm owner mod friend-username maintainer @jucttr/array
```

## 🛠️ 常见问题

### Q: 新成员无法发布包？

**A:** 检查以下几点：
1. 确认已被添加为包所有者或维护者
2. 确认已登录正确的 npm 账号
3. 确认包命名空间（@jucttr）正确

### Q: 发布失败提示权限不足？

**A:** 解决步骤：
```bash
# 检查当前登录
npm whoami

# 检查包权限
npm owner ls @jucttr/array

# 如果没有权限，请联系项目管理员添加
```

### Q: 如何撤销已经发布的包？

**A:** npm 包的撤销限制：
- 24小时内可以撤销：`npm unpublish package@version`
- 24小时后只能废弃：`npm deprecate package@version`

## 📞 联系方式

如有问题请联系项目维护者：
- GitHub Issues: https://github.com/your-repo/issues
- 邮箱: your-email@example.com