import { v4 as uuidv4 } from 'uuid'

const defaultValue = {
  id: 'TAB_COMPONENT_DEFAULT',
  name: '默认Tab',
  imgUrl: 'https://storage-1257012839.cos.ap-chengdu.myqcloud.com/tab.png',
  componentType: 'tab',
  defaultProps: {
    tabList: [
      {
        id: uuidv4(),
        tabName: '标签1',
        tabContent: [
          {
            id: uuidv4(),
            title: '标签1-标题1',
            content: 'Hello World!',
            imgUrl: 'https://storage-1257012839.cos.ap-chengdu.myqcloud.com/%E6%B5%8B%E8%AF%954.jpg',
            redirectUrl: 'https://www.baidu.com'
          },
          {
            id: uuidv4(),
            title: '标签1-标题2',
            content: 'Hello World!',
            imgUrl: 'https://storage-1257012839.cos.ap-chengdu.myqcloud.com/%E6%B5%8B%E8%AF%954.jpg',
            redirectUrl: 'https://www.taobao.com'
          }
        ]
      },
      {
        id: uuidv4(),
        tabName: '标签2',
        tabContent: [
          {
            id: uuidv4(),
            title: '标签2-标题1',
            content: 'Hello World!2',
            imgUrl: 'https://storage-1257012839.cos.ap-chengdu.myqcloud.com/%E6%B5%8B%E8%AF%954.jpg',
            redirectUrl: 'https://www.baidu.com'
          },
          {
            id: uuidv4(),
            title: '标签2-标题2',
            content: 'Hello World!',
            imgUrl: 'https://storage-1257012839.cos.ap-chengdu.myqcloud.com/%E6%B5%8B%E8%AF%954.jpg',
            redirectUrl: 'https://www.baidu.com'
          }
        ]
      },
      {
        id: uuidv4(),
        tabName: '标签3',
        tabContent: [
          {
            id: uuidv4(),
            title: '标签3-标题1',
            content: 'Hello World!',
            imgUrl: 'https://storage-1257012839.cos.ap-chengdu.myqcloud.com/%E6%B5%8B%E8%AF%954.jpg',
            redirectUrl: 'https://www.baidu.com'
          },
          {
            id: uuidv4(),
            title: '标签3-标题2',
            content: 'Hello World!',
            imgUrl: 'https://storage-1257012839.cos.ap-chengdu.myqcloud.com/%E6%B5%8B%E8%AF%954.jpg',
            redirectUrl: 'https://www.baidu.com'
          }
        ]
      },
      {
        id: uuidv4(),
        tabName: '标签4',
        tabContent: [
          {
            id: uuidv4(),
            title: '标签4-标题1',
            content: 'Hello World!',
            imgUrl: 'https://storage-1257012839.cos.ap-chengdu.myqcloud.com/%E6%B5%8B%E8%AF%954.jpg',
            redirectUrl: 'https://www.baidu.com'
          },
          {
            id: uuidv4(),
            title: '标签4-标题2',
            content: 'Hello World!',
            imgUrl: 'https://storage-1257012839.cos.ap-chengdu.myqcloud.com/%E6%B5%8B%E8%AF%954.jpg',
            redirectUrl: 'https://www.baidu.com'
          }
        ]
      }
    ]
  }
}

export default defaultValue
