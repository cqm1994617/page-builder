import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { setPageList } from '@/client/actions/pageList'
import { setCurrentSelectPage } from '@/client/actions/currentSelectPage'
import CustomHeader from './components/CustomHeader'
import styled from 'styled-components'
import ComponentPanel from './components/ComponentPanel'
import SandBox from './components/SandBox'
import EditPanel from './components/EditPanel'

const Page = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  & > div {
    min-width: 1300px;
    height: 100%;
  }
`

const MainContent = styled.div`
  overflow: hidden;
  position: relative;
  min-width: 1300px;
  height: calc(100% - 65px);
  background-color: #f5f5f7;
`

function Edit() {

  const pageList = useSelector(state => state.pageListReducer)
  const dispatch = useDispatch()
console.log(pageList)
  const panelShow = useSelector(state => state.componentPanelReducer)

  useEffect(() => {
    if (pageList.length === 0) {
      const page = {
        title: '首页',
        id: uuidv4(),
        path: 'index',
        componentList: []
      }
      dispatch(
        setPageList([page])
      )
      dispatch(
        setCurrentSelectPage(page.id)
      )
    }
  }, [pageList, dispatch])

  return (
    <Page>
      <div>
        <CustomHeader />
        <MainContent>
          {panelShow && <ComponentPanel />}
          <SandBox />
          <EditPanel />
        </MainContent>
      </div>
    </Page>
  )

}

export default Edit
