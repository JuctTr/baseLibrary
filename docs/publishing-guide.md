# 🚀 发布指南

## 🔧 解决当前发布问题

### 当前遇到的问题

1. **2FA 认证错误**：npm 要求双因子认证
2. **版本混乱**：所有包被设置为 1.0.0
3. **Changeset 配置问题**

## 🛠️ 修复步骤

### 1. 配置 npm 认证

#### 方案A：启用双因子认证（推荐）
1. 访问 [npmjs.com](https://www.npmjs.com/)
2. 登录你的账户
3. 点击右上角头像 → Account → Security
4. 启用 Two-factor authentication

#### 方案B：创建 Granular Access Token
1. 访问 npmjs.com → Account → Access Tokens
2. 点击 "Generate New Token"
3. 选择 "Granular Access Token"
4. 设置权限：
   - Packages: Read and write
   - Scope: All packages
   - Expiration: 90 days 或更长
5. 复制生成的 token

#### 方案C：使用 Classic Token（临时方案）
```bash
# 生成新的 token
npm token create
# 然后用 token 登录
npm login --auth-type=legacy
# 输入用户名和密码，密码处粘贴 token
```

### 2. 正确的发布流程

#### 如果包已经存在但版本错误：

```bash
# 1. 手动设置正确的版本
cd packages/array
npm version 0.2.1 --no-git-tag-version

cd ../object
npm version 0.3.1 --no-git-tag-version

# 对每个包重复...

# 2. 创建 Changeset
cd ../..
pnpm changeset
# 选择要发布的包和版本类型

# 3. 应用 Changesets
pnpm version-packages

# 4. 发布
pnpm release
```

#### 如果是首次发布：

```bash
# 1. 创建 Changeset
pnpm changeset

# 2. 应用版本
pnpm version-packages

# 3. 发布
pnpm release
```

### 3. 检查发布状态

```bash
# 查看包的所有者
pnpm owners:ls

# 检查包信息
npm info @jucttr/array

# 检查 npm 登录状态
npm whoami
```

## ⚠️ 重要提醒

### 版本号规则

- **patch**: 0.2.0 → 0.2.1 (bug修复)
- **minor**: 0.2.0 → 0.3.0 (新功能，不破坏API)
- **major**: 0.2.0 → 1.0.0 (破坏性更改)

### Changeset 最佳实践

```bash
# 每次重大更改后创建 changeset
pnpm changeset

# 描述更改内容
# 选择影响范围
# 选择版本类型

# 合并到 master 后自动发布
```

### 发布前的检查清单

- [ ] 已登录 npm 账户
- [ ] 启用了 2FA 或创建了 Access Token
- [ ] 包的所有者权限正确
- [ ] 版本号符合语义化规范
- [ ] 测试通过
- [ ] Changesets 文件已创建

## 🚨 紧急修复命令

如果当前状态混乱，使用以下命令重置：

```bash
# 1. 重置所有包版本到正确状态
pnpm owners:ls

# 2. 手动设置每个包的版本
for pkg in array object number datatime storage test test2 types; do
  cd packages/$pkg
  # 根据当前包的实际版本设置
  npm version patch --no-git-tag-version
  cd ../..
done

# 3. 删除错误的 changeset
rm .changeset/test-changeset.json

# 4. 创建新的 changeset
pnpm changeset
```

## 📞 获取帮助

如果仍然遇到问题：

1. 检查 npm 日志：`npm config get registry`
2. 清理 npm 缓存：`npm cache clean --force`
3. 重新登录：`npm logout && npm login`
4. 联系 npm 支持：https://www.npmjs.com/support