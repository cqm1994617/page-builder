import React, { useState } from 'react'
import { Layout, Button, Select, Modal, Form, Input, message } from 'antd'
import { EyeOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useGetCurrentSelectPage } from '@/client/hooks'
import { addPage } from '@/client/actions/pageList'
import { setCurrentSelectPage } from '@/client/actions/currentSelectPage'
import { v4 as uuidv4 } from 'uuid'

const { Option } = Select
const { Header } = Layout

const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
  }
`
const ButtonGroup = styled.div`
  margin-left: ${props => props.marginLeft || '10px'};
`
const PageSelected = styled.div`
  display: flex;
`
const FormItem = styled.div`

`
const headerStyle = {
  position: 'relative',
  zIndex: 2,
  backgroundColor: '#fff',
  boxShadow: '0 1px 7px rgba(0, 0, 0, 0.06)'
}
const selectStyle = {
  width: '200px',
  marginRight: '20px'
}


function CustomHeader() {

  const dispatch = useDispatch()

  const pageList = useSelector(state => state.pageListReducer)
  // const state = useSelector(state => state)
  const selectedPage = useGetCurrentSelectPage()

  const [newPageInfo, setNewPageInfo] = useState({
    title: '',
    path: ''
  })
  const [pageModalShow, setPageModalShow] = useState(false)

  const publish = () => {

    axios.post('http://localhost:9090/server/publish', {
      pageList,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const hidePageModal = () => {
    setNewPageInfo({
      title: '',
      path: ''
    })
    setPageModalShow(false)
  }

  const showPageModal = () => {
    setPageModalShow(true)
  }

  const inputPageInfo = (label) => (e) => {
    setNewPageInfo({
      ...newPageInfo,
      [label]: e.target.value
    })
  }

  const changePage = (id) => {
    dispatch(setCurrentSelectPage(id))
  }

  const pageSubmit = () => {

    const hasPath = pageList.map(item => item.path).includes(newPageInfo.path)

    if (!newPageInfo.title) {
      return message.warn('标题不得为空')
    }
    if (hasPath) {
      return message.warn('已创建页面中已有相同的path')
    }
    if (!/^\w+$/.test(newPageInfo.path)) {
      return message.warn('页面路径只能包含数字、字母、下划线')
    }
    
    setPageModalShow(false)

    setNewPageInfo({
      title: '',
      path: ''
    })

    dispatch(addPage({
      ...newPageInfo,
      id: uuidv4(),
      componentList: []
    }))
  }

  return (
    <Header style={headerStyle}>
      <HeaderContainer>
        <PageSelected>
          <div>当前页面：</div>
          <Select onChange={changePage} style={selectStyle} value={selectedPage ? selectedPage.id : ''}>
            {
              pageList.map(item => <Option value={item.id} key={item.id}>{item.title}-{item.path}</Option>)
            }
          </Select>
          <Button onClick={showPageModal}>新增页面</Button>
        </PageSelected>
        <div>
          <ButtonGroup>
            <Button
              type="link"
              icon={<EyeOutlined />}
            >
              预览
              </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              type="link"
              icon={<SaveOutlined />}
            >
              保存
              </Button>
          </ButtonGroup>
          <ButtonGroup marginLeft="30px">
            <Button
              type="primary"
              size="large"
              icon={<SendOutlined />}
              onClick={publish}
            >
              发布
              </Button>
          </ButtonGroup>
        </div>
      </HeaderContainer>

      <Modal
        visible={pageModalShow}
        onCancel={hidePageModal}
        onOk={pageSubmit}
      >
        <Form style={{ marginTop: '30px' }}>
          <Form.Item label="页面标题">
            <Input
              style={{ width: '400px' }}
              value={newPageInfo.title}
              onChange={inputPageInfo('title')}
            />
          </Form.Item>
          <Form.Item label="页面路径" extra={<div>页面路径只能包含字母、数字、下划线</div>}>
            <Input style={{ width: '400px' }} value={newPageInfo.path} onChange={inputPageInfo('path')} suffix=".html" />
          </Form.Item>
        </Form>
      </Modal>
    </Header>
  )

}

export default CustomHeader
