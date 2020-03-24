const fs = require('fs')
const webpack = require('webpack')
const config = require('./webpack-dynamic')

const codeStr = `
import React from 'react'
import ReactDOM from 'react-dom'
import Cube from './cube'

function App() {
  return (
    <div>
      <div>12345</div>
      <Cube />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
`

console.log('生成动态生成javascript资源', Date.now())

fs.writeFileSync('test.js', codeStr, 'utf8')

console.log('打包开始', Date.now())

webpack(config, (err, stat) => {
  console.log('打包完成', Date.now())
})