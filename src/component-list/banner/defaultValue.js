import { v4 as uuidv4 } from 'uuid'

const defaultValue = {
  id: 'BANNER_COMPONENT_DEFAULT',
  name: '默认banner',
  imgUrl: 'https://storage-1257012839.cos.ap-chengdu.myqcloud.com/banner.png',
  componentType: 'banner',
  defaultProps: {
    bannerList: [
      {
        id: uuidv4(),
        to: 'https://www.baidu.com',
        imgUrl: 'https://storage-1257012839.cos.ap-chengdu.myqcloud.com/%E6%B5%8B%E8%AF%951.jpg'
      },
      {
        id: uuidv4(),
        to: 'https://www.taobao.com',
        imgUrl: 'https://storage-1257012839.cos.ap-chengdu.myqcloud.com/%E6%B5%8B%E8%AF%952.jpg'
      }
    ],
    height: 200
  }

}

export default defaultValue
