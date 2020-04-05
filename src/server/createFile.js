const fs = require('fs')
const webpack = require('webpack')
const config = require('./webpack-dynamic')
const path = require('path')

function buildPromise() {

  return new Promise((resolve, reject) => {
    webpack(config, (err, stat) => {
      if (err) {
        reject(err)
      } else {
        resolve(stat)
      }
    })
  })
}

async function createFile(list) {
  const codeStr = `
  import React from 'react'
  import ReactDOM from 'react-dom'
  import {BannerServer as Banner} from '../component-list/banner'

  const list = ${JSON.stringify(list)}

  function App() {
    return (
      <div style={{overflow: 'hidden'}}>
        {
          list.map((item) => {
            return <Banner key={item.key} {...item.props} />
          })
        }
      </div>
    )
  }

  ReactDOM.render(<App />, document.getElementById('app'))
`
  console.log(codeStr)

  fs.writeFileSync(path.resolve(__dirname, 'test.js'), codeStr, 'utf8')

  console.log('打包开始')

  await buildPromise()
}



module.exports = createFile
