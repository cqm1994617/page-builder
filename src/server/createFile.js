const fs = require('fs')
const webpack = require('webpack')
const getConfig = require('./webpack-dynamic')
const path = require('path')
const AdmZip = require('adm-zip')
const uuid = require('uuid')

function buildPromise(folderId, packageId, wsMap) {

  return new Promise((resolve, reject) => {
    webpack(getConfig(folderId, packageId, wsMap), (err, stat) => {
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
  import {ImageServer as Image} from '@/component-list/image'
  import {ArticleServer as Article} from '@/component-list/article'

  const list = ${JSON.stringify(componentList)}
  document.title = '${title}' || '页面生成平台'

  const componentMap = {
    'banner': (item) => <Banner key={item.key} {...item.props} />,
    'paragraph': (item) => <Paragraph key={item.key} {...item.props} />,
    'text': (item) => <Text key={item.key} {...item.props} />,
    'image': (item) => <Image key={item.key} {...item.props} />,
    'article': (item) => <Article key={item.key} {...item.props} />
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

async function createFile(list, packageId, wsMap) {

  const folderId = uuid.v4()

  if (!fs.existsSync(path.resolve(__dirname, './page-file'))) {
    fs.mkdirSync(path.resolve(__dirname, './page-file'))
  }

  fs.mkdirSync(path.resolve(__dirname, `./page-file/${folderId}`))

  list.forEach(item => {
    fs.writeFileSync(path.resolve(__dirname, `./page-file/${folderId}/${item.path}.js`), getPageHTML(item.title, item.componentList), 'utf8')
  })


  await buildPromise(folderId, packageId, wsMap)

  const zip = new AdmZip()
  zip.addLocalFolder(path.resolve(__dirname, `./build-page/${folderId}`))
  zip.writeZip(path.resolve(__dirname, `./build-page/${folderId}.zip`))

  return folderId
}



module.exports = createFile
