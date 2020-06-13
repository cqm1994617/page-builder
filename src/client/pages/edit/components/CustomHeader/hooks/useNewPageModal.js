import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { message } from 'antd'
import { addPage } from '@/client/actions/pageList'
import { v4 as uuidv4 } from 'uuid'

function usePageModal() {

  const [newPageInfo, setNewPageInfo] = useState({
    title: '',
    path: ''
  })
  const [newPageModalShow, setNewPageModalShow] = useState(false)
  const dispatch = useDispatch()
  const pageList = useSelector(state => state.pageListReducer)

  const newPageModalSubmit = () => {
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

    setNewPageModalShow(false)

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

  const hideNewPageModal = () => {
    setNewPageInfo({
      title: '',
      path: ''
    })
    setNewPageModalShow(false)
  }

  const showNewPageModal = () => {
    setNewPageModalShow(true)
  }

  const inputNewPageInfo = (label) => (e) => {
    setNewPageInfo({
      ...newPageInfo,
      [label]: e.target.value
    })
  }

  return {
    newPageModalSubmit,
    newPageInfo,
    hideNewPageModal,
    showNewPageModal,
    newPageModalShow,
    inputNewPageInfo
  }

}

export default usePageModal
