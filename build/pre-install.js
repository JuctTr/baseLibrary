#!/usr/bin/env node
console.log('【⚠️注意】=> ', '请使用pnpm包管理工具哦')

const agent = process.env.npm_config_user_agent
const { error } = console

if (!agent.startsWith('pnpm')) {
    error('\n 在这个仓库中，请使用 pnpm 来管理依赖。$ npm i pnpm -g\n')
    process.exit(1)
}
