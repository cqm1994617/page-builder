import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { List, Button, Modal } from 'antd'
import CreateAppModal from './components/CreateAppModal'
import EditAppModal from './components/EditAppModal'
import { useAppList } from '../../hooks'

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  overflow: hidden;
`
const MainContent = styled.div`
  width: 1000px;
  margin: 40px auto;
  box-sizing: border-box;
  padding: 0 20px;
  background-color: #fff;
`
const Header = styled.div`
  padding: 30px 0 20px 0;
`
const EditList = styled.div`
  margin-left: 20px;
  color: #1890ff;
  display: flex;
  & > div {
    flex: none;
    cursor: pointer;
    margin-left: 15px;
  }
`
const ListWords = styled.div`
  word-break: break-all;
`
const ListTitle = styled(ListWords)`
  color: #008dff;
  cursor: pointer;
`
const ListContent = styled(ListWords)`
  color: #666;
`

function Home() {

  const history = useHistory()
  const {
    appList,
    removeApp,
    clearApp,
    editAppInfo,
    addApp
  } = useAppList()
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [selectItem, setSelectItem] = useState({
    name: '',
    desc: ''
  })

  const removeItem = (item) => () => {
    Modal.confirm({
      title: '确认删除',
      content: `是否删除应用${item.name}`,
      onOk: () => {
        removeApp(item.id)
      }
    })
  }

  const clear = () => {
    Modal.confirm({
      title: '是否清空所有项目？',
      onOk: () => {
        clearApp()
      }
    })
  }

  const editItem = (item) => () => {
    setEditModalVisible(true)
    setSelectItem(item)
  }

  const toEdit = (id) => () => {
    history.push(`/edit?appId=${id}`)
  }

  return (
    <Page>
      <MainContent>
        <Header>
          <Button type="primary" onClick={() => setCreateModalVisible(true)}>创建应用</Button>
          <Button type="danger" style={{ marginLeft: '20px' }} onClick={clear}>清空应用</Button>
        </Header>
        <List
          dataSource={appList}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<ListTitle onClick={toEdit(item.id)}>{item.name}</ListTitle>}
                description={<ListContent>{item.desc}</ListContent>}
              />
              <EditList>
                <div onClick={toEdit(item.id)}>前往</div>
                <div onClick={editItem(item)}>编辑</div>
                <div onClick={removeItem(item)}>删除</div>
              </EditList>
            </List.Item>
          )}
        />
      </MainContent>
      <CreateAppModal
        visible={createModalVisible}
        addApp={addApp}
        closeModal={() => setCreateModalVisible(false)}
      />
      <EditAppModal
        visible={editModalVisible}
        editAppInfo={editAppInfo}
        selectItem={selectItem}
        closeModal={() => setEditModalVisible(false)}
      />
    </Page>
  )
}

export default Home
