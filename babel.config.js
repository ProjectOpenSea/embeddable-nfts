const presets = [
  '@babel/preset-typescript',
  [
    '@babel/preset-env',
    {
      targets: 'last 2 Chrome version',
      modules: false
    }
  ]
]
const plugins = [
  '@babel/plugin-proposal-class-properties',
  ['@babel/proposal-decorators', {decoratorsBeforeExport: true}]
]

module.exports = {plugins, presets}
