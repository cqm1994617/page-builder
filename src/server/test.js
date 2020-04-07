
  import React from 'react'
  import ReactDOM from 'react-dom'
  import {BannerServer as Banner} from '../component-list/banner'

  const list = [{"name":"Banner","key":"0d82804e-2a45-45a9-9365-ac922b2143c6","props":{"bannerList":[{"id":"d1395976-7edc-4ef1-9829-32f5097259fc","imgUrl":"http://qiniu.xingheaoyou.com/1.jpg","to":"https://www.baidu.com"},{"id":"9d79e008-8ade-40b9-8c67-3b9f4103a2b9","imgUrl":"http://qiniu.xingheaoyou.com/2.jpg","to":"https://www.taobao.com"}],"height":"200px"}},{"name":"Banner","key":"cdaf48cb-0f04-4c03-8a4b-91852f1659b0","props":{"bannerList":[{"id":"42f57be8-9c46-44b9-b92d-1ebd5797bdfa","imgUrl":"http://qiniu.xingheaoyou.com/1.jpg","to":"https://www.baidu.com"},{"id":"c11af51d-ff4c-40b4-9e94-2074cb4580ab","imgUrl":"http://qiniu.xingheaoyou.com/2.jpg","to":"https://www.taobao.com"}],"height":"200px"}}]

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
