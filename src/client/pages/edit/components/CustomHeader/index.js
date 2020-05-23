import React, { useState } from 'react'
import { Layout, Button, Select, Modal, Form, Input, message } from 'antd'
import { EyeOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useGetCurrentSelectPage, useAppList } from '@/client/hooks'
import { deletePage } from '@/client/actions/pageList'
import { setCurrentSelectPage } from '@/client/actions/currentSelectPage'
import queryString  from 'query-string'
import useNewPageModal from './hooks/useNewPageModal'
import useEditPageModal from './hooks/useEditPageModal'
import usePublishModal from './hooks/usePublishModal'

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
  const selectedPage = useGetCurrentSelectPage()

  const {
    newPageModalSubmit,
    hideNewPageModal,
    showNewPageModal,
    newPageModalShow,
    inputNewPageInfo,
    newPageInfo
  } = useNewPageModal()

  const {
    editPageModalSubmit,
    editPageInfo,
    inputEditPageInfo,
    editPageModalShow,
    hideEditPageModal,
    showEditPageModal
  } = useEditPageModal()

  const {
    publishStatus,
    setPublishStatus,
    publishModalShow,
    openPublishModal,
    hidePublishModal
  } = usePublishModal()

  const {
    saveAppLayout
  } = useAppList()


  const publish = () => {
    openPublishModal()
    setPublishStatus(2)

    axios.post('http://localhost:9090/server/publish', {
      pageList,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      setPublishStatus(3)
    })
  }

  const save = () => {
    const appId = queryString.parse(window.location.search).appId
    saveAppLayout(appId, JSON.stringify(pageList))
    message.info('保存成功！')
  }

  const preview = () => {
    axios.post('http://localhost:9090/server/preview', {
      pageList
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      window.open(`http://localhost:9090/preview/${res.data.folderId}/${selectedPage.path}.html`)
    })
  }

  const changePage = (id) => {
    dispatch(setCurrentSelectPage(id))
  }

  const removePage = () => {
    if (pageList.length > 1) {
      Modal.warning({
        title: '确认删除',
        content: '是否删除当页面？',
        onOk() {
          dispatch(deletePage(selectedPage.id))
        }
      })
    } else {
      message.info('已是最后一个页面，无法删除')
    }
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
          <Button onClick={showNewPageModal}>新增页面</Button>
          <Button onClick={showEditPageModal} style={{ marginLeft: '20px' }}>编辑当前页</Button>
          <Button onClick={removePage} style={{ marginLeft: '20px' }} danger >删除当页</Button>
        </PageSelected>
        <div>
          <ButtonGroup>
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={preview}
            >
              预览
              </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              type="link"
              icon={<SaveOutlined />}
              onClick={save}
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
        visible={newPageModalShow}
        onCancel={hideNewPageModal}
        onOk={newPageModalSubmit}
      >
        <Form style={{ marginTop: '30px' }}>
          <Form.Item label="页面标题">
            <Input
              style={{ width: '400px' }}
              value={newPageInfo.title}
              onChange={inputNewPageInfo('title')}
            />
          </Form.Item>
          <Form.Item label="页面路径" extra={<div>页面路径只能包含字母、数字、下划线</div>}>
            <Input style={{ width: '400px' }} value={newPageInfo.path} onChange={inputNewPageInfo('path')} suffix=".html" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={editPageModalShow}
        onCancel={hideEditPageModal}
        onOk={editPageModalSubmit}
      >
        <Form style={{ marginTop: '30px' }}>
          <Form.Item label="页面标题">
            <Input
              style={{ width: '400px' }}
              value={editPageInfo.title}
              onChange={inputEditPageInfo('title')}
            />
          </Form.Item>
          <Form.Item label="页面路径" extra={<div>页面路径只能包含字母、数字、下划线</div>}>
            <Input style={{ width: '400px' }} value={editPageInfo.path} onChange={inputEditPageInfo('path')} suffix=".html" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={publishModalShow}
        onCancel={hidePublishModal}
        onOk={hidePublishModal}
      >
        <div>
          {(() => {
            if (publishStatus === 1) {
              return '未开始'
            }
            if (publishStatus === 2) {
              return '打包中'
            }
            if (publishStatus === 3) {
              return '打包完成'
            }
          })()}
        </div>
      </Modal>
    </Header>
  )

}

export default CustomHeader
