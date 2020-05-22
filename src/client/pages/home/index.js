import React, { useEffect, useReducer, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { List, Button } from 'antd'
import CreateAppModal from './components/CreateAppModal'

const Page = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  overflow: hidden;
`
const Content = styled.div`
  width: 1000px;
  margin: 40px auto;
  box-sizing: border-box;
  padding: 0 20px;
  background-color: #fff;
`
const Header = styled.div`
  padding: 30px 0 20px 0;
`
const EditText = styled.div`
  color: #1890ff;
  cursor: pointer;
`

const listReducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return {
        ...action.payload,
      }
    default:
      return {
        ...state
      }
  }
}

function Home() {

  const history = useHistory()
  const [listState, listDispatch] = useReducer(listReducer, [])
  const [createModalVisible, setCreateModalVisible] = useState(false)

  useEffect(() => {
    const projectStorage = localStorage.getItem('projectList')

    try {
      if (projectStorage) {
        const projectList = JSON.parse(projectStorage)
        listDispatch({
          type: 'INIT',
          payload: projectList
        })
      }
    } catch (err) {
      console.log(err)
      localStorage.setItem('project', null)
    }
  }, [])

  return useMemo(() => (
    <Page>
      <Content>
        <Header>
          <Button type="primary" onClick={() => setCreateModalVisible(true)}>创建应用</Button>
          <Button type="danger" style={{ marginLeft: '20px' }}>清空应用</Button>
        </Header>
        <List
          dataSource={[
            {
              title: 'asdf',
              description: 'fvvvv'
            }
          ]}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
              <EditText>编辑</EditText>
            </List.Item>
          )}
        />
      </Content>
      <CreateAppModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
      />
    </Page>
  ), [createModalVisible, setCreateModalVisible])
}

export default Home
