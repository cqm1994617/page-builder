
import React from 'react'
import ReactDOM from 'react-dom'
import Banner from '../component-list/banner/display/index'

const list = [{"name":"Banner","props":{"bannerList":[{"imgUrl":"http://qiniu.xingheaoyou.com/1.jpg","to":"https://www.baidu.com"},{"imgUrl":"http://qiniu.xingheaoyou.com/2.jpg","to":"https://www.taobao.com"}],"height":"200px"}},{"name":"Banner","props":{"bannerList":[{"imgUrl":"http://qiniu.xingheaoyou.com/1.jpg","to":"https://www.baidu.com"},{"imgUrl":"http://qiniu.xingheaoyou.com/2.jpg","to":"https://www.taobao.com"}],"height":"200px"}}]

function App() {
  return (
    <div style={{overflow: 'hidden'}}>
      {
        list.map((item, index) => {
          return <Banner key={index} {...item.props} />
        })
      }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
