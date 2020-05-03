import { v4 as uuidv4 } from 'uuid'

const componentList = [
  {
    id: 'BANNER_COMPONENT',
    name: 'Banner',
    children: [
      {
        id: 'BANNER_COMPONENT_DEFAULT',
        name: '默认banner',
        imgUrl: 'https://gw.alipayobjects.com/os/q/cms/images/jnlh10g7/0993e70d-7d4f-4e65-86d6-dfbb14a7da05.cms/images/0178ff2a-35ba-4c8c-9b54-29df6688b0c4.png?x-oss-process=image/resize,w_560/crop,h_560',
        componentType: 'banner',
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
          ],
          height: 200
        }
      }
    ]
  },
  {
    id: 'PARAGRAPH_COMPONENT',
    name: '段落',
    children: [
      {
        id: 'PARAGRAPH_COMPONENT_DEFAULT',
        name: '默认段落',
        imgUrl: 'https://gw.alipayobjects.com/os/q/cms/images/jnlh2jbs/6a988b50-e8ad-48c7-9e3e-bf6d4e1b1e2a.cms/images/07b38968-3ad0-4e4c-8631-d7adbfec66a8.png?x-oss-process=image/resize,w_560/crop,h_560',
        componentType: 'paragraph',
        defaultProps: {
          title: '标题',
          content: '<p>这是一个默认段落的内容</p><p>感谢您的使用</p>'
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
