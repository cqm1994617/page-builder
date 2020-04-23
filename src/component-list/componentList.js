import { v4 as uuidv4 } from 'uuid'

const componentList = [
  {
    id: 0,
    name: 'Banner',
    children: [
      {
        id: 'Banner_1',
        name: '',
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
