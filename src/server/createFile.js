const fs = require('fs')
const webpack = require('webpack')
const config = require('./webpack-dynamic')

const codeStr = `
import React from 'react'
import ReactDOM from 'react-dom'
import {BannerServer as Banner} from '../component-list/banner'

const list = [{"name":"Banner","key":"6410b73d-afd0-4641-863c-ef725585b70e","props":{"bannerList":[{"imgUrl":"http://qiniu.xingheaoyou.com/1.jpg","to":"https://www.baidu.com"},{"imgUrl":"http://qiniu.xingheaoyou.com/2.jpg","to":"https://www.taobao.com"}],"height":"200px"}},{"name":"Banner","key":"9d7a3517-6030-45ff-8dc7-6543b9e59d09","props":{"bannerList":[{"imgUrl":"http://qiniu.xingheaoyou.com/1.jpg","to":"https://www.baidu.com"},{"imgUrl":"http://qiniu.xingheaoyou.com/2.jpg","to":"https://www.taobao.com"}],"height":"300px"}},{"name":"Banner","key":"df31eb60-ef90-4a25-a3de-b8e730c622d2","props":{"bannerList":[{"imgUrl":"http://qiniu.xingheaoyou.com/1.jpg","to":"https://www.baidu.com"},{"imgUrl":"http://qiniu.xingheaoyou.com/2.jpg","to":"https://www.taobao.com"}],"height":"200px"}}]

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

console.log('生成动态生成javascript资源', Date.now())

fs.writeFileSync('test.js', codeStr, 'utf8')

console.log('打包开始', Date.now())

webpack(config, (err, stat) => {
  console.log('打包完成', Date.now())
})