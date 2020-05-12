const fs = require('fs')
const webpack = require('webpack')
const getConfig = require('./webpack-dynamic')
const path = require('path')
const AdmZip = require('adm-zip')
const uuid = require('uuid')

function buildPromise(folderId) {

  return new Promise((resolve, reject) => {
    webpack(getConfig(folderId), (err, stat) => {
      console.log(err)
      if (err) {
        reject(err)
      } else {
        resolve(stat)
      }
    })
  })
}

function getPageHTML(title, componentList) {
  return `
  import React from 'react'
  import ReactDOM from 'react-dom'
  import {BannerServer as Banner} from '@/component-list/banner'
  import {ParagraphServer as Paragraph} from '@/component-list/paragraph'
  import {TextServer as Text} from '@/component-list/text'

  const list = ${JSON.stringify(componentList)}
  document.title = '${title}' || '页面生成平台'

  const componentMap = {
    'banner': (item) => <Banner key={item.key} {...item.props} />,
    'paragraph': (item) => <Paragraph key={item.key} {...item.props} />,
    'text': (item) => <Text key={item.key} {...item.props} />
  }

  function App() {
    return (
      <div style={{overflow: 'hidden'}}>
        {
          list.map((item) => {
            return componentMap[item.type](item)
          })
        }
      </div>
    )
  }

  ReactDOM.render(<App />, document.getElementById('app'))
  `
}

async function createFile(list) {

  const folderId = uuid.v4()

  if (!fs.existsSync(path.resolve(__dirname, './page-file'))) {
    fs.mkdirSync(path.resolve(__dirname, './page-file'))
  }

  fs.mkdirSync(path.resolve(__dirname, `./page-file/${folderId}`))

  list.forEach(item => {
    fs.writeFileSync(path.resolve(__dirname, `./page-file/${folderId}/${item.path}.js`), getPageHTML(item.title, item.componentList), 'utf8')
  })


  await buildPromise(folderId)

  // const zip = new AdmZip(path.resolve(__dirname, `./page-file/${folderId}.zip`))
  // zip.extractAllTo(path.resolve(__dirname, `./page-file/${folderId}`), true);
}



module.exports = createFile
