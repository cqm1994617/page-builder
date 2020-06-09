import React, { useState } from 'react'
import { Form, Input, Button, message, Modal } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import PositionMove from '@/component-list/common/PositionMove'
import { editComponent, deleteComponent } from '@/client/actions/componentList'
import { setCurrentSelectComponent } from '@/client/actions/currentSelectComponent'
import ToolContainer from '@/component-list/common/ToolContainer'
import { useGetComponentList, useGetCurrentSelectComponent, useDeleteCurrentComponent } from '@/client/hooks'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import TabItem from './TabItem'

const List = styled.div`
  border-top: 1px solid #eee;
  margin-bottom: 30px;
`

function Tool() {

  const dispatch = useDispatch()
  const componentList = useGetComponentList()
  const currentSelectComponent = useGetCurrentSelectComponent()
  const deleteCurrentComponent = useDeleteCurrentComponent()
  const [activeTab, setActiveTab] = useState(null)
  const [tabList, setTabList] = useState(currentSelectComponent.props.tabList)

  const submit = () => {
    const newKey = uuidv4()
    dispatch(editComponent({
      type: 'tab',
      key: newKey,
      props: {
        tabList
      }
    }))
    dispatch(setCurrentSelectComponent(newKey))
  }

  const changeTabTitle = (id) => (e) => {
    setTabList(
      tabList.map(item => {
        if (item.id === id) {
          return {
            ...item,
            tabName: e.target.value
          }
        }
        return {
          ...item
        }
      })
    )
  }
  const changeTabContent = (label, id, contentId) => (e) => {
    setTabList(
      tabList.map(item => {
        if (item.id === id) {
          return {
            ...item,
            tabContent: item.tabContent.map(contentItem => {
              if (contentItem.id === contentId) {
                return {
                  ...contentItem,
                  [label]: e.target.value
                }
              } else {
                return {
                  ...contentItem
                }
              }
            })
          }
        } else {
          return {
            ...item
          }
        }
      })
    )
  }
  const removeTab = (id) => {
    setTabList(
      tabList.filter(item => item.id !== id)
    )
  }

  const removeTabContent = (tabId, contentId) => {
    setTabList(
      tabList.map(item => {
        if (item.id === tabId) {
          return {
            ...item,
            tabContent: item.tabContent.filter(contentItem => contentItem.id !== contentId)
          }
        } else {
          return {
            ...item
          }
        }
      })
    )
  }

  return (
    <ToolContainer>
      <List>
        {
          tabList.map((item, index) => {
            return (
              <TabItem
                index={index}
                key={item.id}
                item={item}
                removeTab={removeTab}
                removeTabContent={removeTabContent}
                changeTabTitle={changeTabTitle}
                changeTabContent={changeTabContent}
              />
            )
          })
        }
      </List>
      <PositionMove component={currentSelectComponent} componentList={componentList} />
      <Form.Item style={{ marginTop: '40px' }}>
        <Button type="primary" onClick={submit}>确认</Button>
        <Button type="danger" style={{ marginLeft: '20px' }} onClick={deleteCurrentComponent}>删除</Button>
      </Form.Item>
    </ToolContainer>
  )
}

export default Tool
