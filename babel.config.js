module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        modules: false
      }
    ],
    ["@babel/preset-react"]
  ],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": "css" // `style: true` 会加载 less 文件
      }
    ],
    [
      "babel-plugin-styled-components",
      {
        "ssr": false
      }
    ]
  ]
}
