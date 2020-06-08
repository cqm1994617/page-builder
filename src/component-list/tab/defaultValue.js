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
            title: '标题1',
            content: 'Hello World!'
          },
          {
            id: uuidv4(),
            title: '标题2',
            content: 'Hello World!'
          }
        ]
      },
      {
        id: uuidv4(),
        tabName: '标签2',
        tabContent: [
          {
            id: uuidv4(),
            title: '标题1',
            content: 'Hello World!'
          },
          {
            id: uuidv4(),
            title: '标题2',
            content: 'Hello World!'
          }
        ]
      },
      {
        id: uuidv4(),
        tabName: '标签3',
        tabContent: [
          {
            id: uuidv4(),
            title: '标题1',
            content: 'Hello World!'
          },
          {
            id: uuidv4(),
            title: '标题2',
            content: 'Hello World!'
          }
        ]
      },
      {
        id: uuidv4(),
        tabName: '标签4',
        tabContent: [
          {
            id: uuidv4(),
            title: '标题1',
            content: 'Hello World!'
          },
          {
            id: uuidv4(),
            title: '标题2',
            content: 'Hello World!'
          }
        ]
      }
    ]
  }
}

export default defaultValue
