import { v4 as uuidv4 } from 'uuid'

const componentList = [
  {
    id: 'BANNER_COMPONENT',
    name: 'Banner',
    children: [
      {
        id: 'BANNER_COMPONENT_DEFAULT',
        name: '默认banner',
        imgUrl: '',
        defaultProps: {
          bannerList: [
            {
              id: uuidv4(),
              to: 'https://www.baidu.com',
              imgUrl: 'http://qiniu.xingheaoyou.com/1.jpg'
            },
            {
              id: uuidv4(),
              to: 'https://www.taobao.com',
              imgUrl: 'http://qiniu.xingheaoyou.com/2.jpg'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'TEST_COMPONENT',
    name: 'Test',
    children: [
      {
        id: 'TEST_COMPONENT_DEFAULT',
        name: '测试组件',
        imgUrl: '',
        defaultProps: {
          bannerList: [
            {
              id: uuidv4(),
              to: 'https://www.baidu.com',
              imgUrl: 'http://qiniu.xingheaoyou.com/1.jpg'
            },
            {
              id: uuidv4(),
              to: 'https://www.taobao.com',
              imgUrl: 'http://qiniu.xingheaoyou.com/2.jpg'
            }
          ]
        }
      }
    ]
  },
]

export default componentList
