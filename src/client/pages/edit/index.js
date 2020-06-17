import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { setPageList, clearPageList } from '@/client/actions/pageList'
import { setCurrentSelectPage, clearCurrentSelectPage } from '@/client/actions/currentSelectPage'
import { clearCurrentSelectComponent } from '@/client/actions/currentSelectComponent'
import { initUndoStack, clearUndoStack } from '@/client/actions/undoStack'
import { setCurrentStep, clearCurrentStep } from '@/client/actions/currentUndoStep'
import CustomHeader from './components/CustomHeader'
import styled from 'styled-components'
import ComponentPanel from './components/ComponentPanel'
import SandBox from './components/SandBox'
import EditPanel from './components/EditPanel'
import { useAppList } from '@/client/hooks'
import queryString from 'query-string'

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

  const { getAppDetail } = useAppList()
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const panelShow = useSelector(state => state.componentPanelReducer)

  const _initPage = useCallback(() => {
    const initPage = {
      title: '首页',
      id: uuidv4(),
      path: 'index',
      componentList: []
    }
    const stepId = uuidv4()
    dispatch(
      setPageList([initPage])
    )
    dispatch(
      setCurrentSelectPage(initPage.id)
    )
    dispatch(
      initUndoStack([stepId], [initPage], initPage.id, null)
    )
    dispatch(
      setCurrentStep(stepId)
    )
  }, [dispatch])

  useEffect(() => {

    const appId = queryString.parse(window.location.search).appId
    const appDetail = getAppDetail(appId)

    try {
      if (!appDetail.layout) {
        return _initPage()
      }

      const layout = JSON.parse(appDetail.layout)

      if (layout.length === 0) {
        _initPage()
      } else {
        dispatch(
          setPageList(layout)
        )
        dispatch(
          setCurrentSelectPage(layout[0].id)
        )

        // 有记录时初始化undo栈
        const stepId = uuidv4()
        dispatch(
          setCurrentStep(stepId)
        )
        dispatch(
          initUndoStack([stepId], layout, layout[0].id, null)
        )
      }
    } catch (err) {
      console.log(err)
      _initPage()
    }

    return () => {
      dispatch(
        clearPageList()
      )
      dispatch(
        clearCurrentSelectPage()
      )
      dispatch(
        clearCurrentSelectComponent()
      )
      dispatch(
        clearUndoStack()
      )
      dispatch(
        clearCurrentStep()
      )
    }

  }, [dispatch, getAppDetail, _initPage])

  console.log(state)

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
