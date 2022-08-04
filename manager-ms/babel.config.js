// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { node: "current" }
      }
    ],
    "@babel/preset-typescript"
  ],
  plugins: [
    ["module-resolver", {
      alias: {
        "@Entity": "./src/entity",
        "@Controllers": "./src/controllers",
        "@Infra": "./src/infra",
        "@Utils": "./src/utils",
        "@Core": "./src/core",
        "@Exceptions": "./src/exceptions",
        "@Factory": "./src/factory"
      }
    }],
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: true
      }
    ]
  ],
  ignore: [
    "build/**/*.test.ts"
  ]
}
