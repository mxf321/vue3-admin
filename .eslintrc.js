const mockServer = () => {
  if (process.env.NODE_ENV === 'development')
    return require('./src/mock/index1')
  else return ''
}

// eslint配置文件遵循commonjs的导出规则，所导出的对象就是eslint的配置对象
module.exports = {
  // 表示当前目录即为根目录，eslint规则将限制在该目录下
  root: true,
  // env 表示启用 eslint 检测环境
  env: {
    // 在node 环境下启动 eslint 检测
    browser: true,
    es2021: true,
    node: true
  },
  // eslint 中配置需要继承的配置
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended'
  ],
  // 解析器
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue'],
  // 需要修改的启用规则及其各自的错误级别
  // 名称 "no-unused-vars" 和 "no-undef" 是 ESLint 中 规则 的名称。第一个值是规则的错误级别，可以是以下值之一：
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 打开规则作为警告（不影响退出代码）
  // "error" 或 2 - 打开规则作为错误（退出代码将为 1）
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: 'off',
    'space-before-function-paren': 0,
    'comma-dangle': 0
  }
}
