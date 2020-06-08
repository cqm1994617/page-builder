import { v4 as uuidv4 } from 'uuid'

const defaultValue = {
  id: 'TAB_COMPONENT_DEFAULT',
  name: '默认Tab',
  imgUrl: 'https://gw.alipayobjects.com/os/q/cms/images/jnlhbijy/3e1fe003-aa08-49bc-9199-0d706287ae92.cms/images/eea1430d-9f2e-4159-905f-226a94e1b11a.png?x-oss-process=image/resize,w_560/crop,h_560',
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
            imgUrl: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg'
          },
          {
            id: uuidv4(),
            title: '标签1-标题2',
            content: 'Hello World!',
            imgUrl: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg'
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
            imgUrl: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg'
          },
          {
            id: uuidv4(),
            title: '标签2-标题2',
            content: 'Hello World!',
            imgUrl: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg'
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
            imgUrl: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg'
          },
          {
            id: uuidv4(),
            title: '标签3-标题2',
            content: 'Hello World!',
            imgUrl: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg'
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
            imgUrl: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg'
          },
          {
            id: uuidv4(),
            title: '标签4-标题2',
            content: 'Hello World!',
            imgUrl: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg'
          }
        ]
      }
    ]
  }
}

export default defaultValue
