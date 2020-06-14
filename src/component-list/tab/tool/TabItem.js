import React, { useState } from 'react'
import { Input, Form, Modal } from 'antd'
import styled from 'styled-components'
import TabContentItem from './TabContentItem'

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`
const ListName = styled.div`
  cursor: pointer;
`
const EditText = styled.div`
  color: #1890ff;
  cursor: pointer;
`
const Panel = styled.div`
  margin-top: 10px;
  box-sizing: border-box;
  background-color: #f1f1f1;
  border-radius: 4px;
  padding: 15px;
`
const ListTitle = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
`
const EditPanel = styled.div `
  display: flex;
`

function TabItem({ removeTab, removeTabContent, changeTabTitle, changeTabContent, item, index }) {

  const [active, setActive] = useState(false)

  const toggle = () => {
    setActive(!active)
  }

  const remove = (id) => () => {
    Modal.confirm({
      title: '确认删除此项?',
      onOk() {
        removeTab(id)
      }
    })
  }

  return (
    <div>
      <ListItem>
        <ListName>{index + 1}. {item.tabName}</ListName>
        <EditPanel>
          <EditText onClick={toggle}>{active ? '收起' : '编辑'}</EditText>
          <EditText onClick={remove(item.id)} style={{marginLeft: '15px'}}>删除</EditText>
        </EditPanel>
      </ListItem>
      {
        active && (
          <Panel>
            <Form.Item label="标签名">
              <Input onChange={changeTabTitle(item.id)} value={item.tabName} />
            </Form.Item>
            <ListTitle>Tab内容列表</ListTitle>
            {
              item.tabContent.map((contentItem) => <TabContentItem key={contentItem.id} removeTabContent={removeTabContent} contentItem={contentItem} tabItem={item} changeTabContent={changeTabContent} />)
            }
          </Panel>
        )
      }
    </div>
  )
}

export default TabItem
