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
