
  import React from 'react'
  import ReactDOM from 'react-dom'
  import {BannerServer as Banner} from '../component-list/banner'

  const list = [{"name":"Banner","key":"452b8e99-6f37-4453-b2b4-1c1f3cdea41b","props":{"bannerList":[{"id":"f8779aae-132a-459e-97d6-bb871d6d0079","imgUrl":"http://qiniu.xingheaoyou.com/1.jpg","to":"https://www.baidu.com"},{"id":"4c4e6b80-cf1c-49e2-98c3-55c92d0e41d0","imgUrl":"http://qiniu.xingheaoyou.com/2.jpg","to":"https://www.taobao.com"}],"height":"440px"}},{"name":"Banner","key":"f8842584-d7f6-4398-b40e-d319789ec01e","props":{"bannerList":[{"id":"ad348b7c-b223-4ad7-bb1b-55d13feca833","imgUrl":"http://qiniu.xingheaoyou.com/1.jpg","to":"https://www.baidu.com"},{"id":"5769a0be-c98a-4297-b133-ce31b5727352","imgUrl":"http://qiniu.xingheaoyou.com/2.jpg","to":"https://www.taobao.com"}],"height":"200px"}}]

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
