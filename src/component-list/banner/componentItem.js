import { v4 as uuidv4 } from 'uuid'

const componentItem = {
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

export default componentItem
