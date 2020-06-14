import React, { useState, useRef, useReducer, useCallback, useEffect } from 'react'

function statuReducer(state, action) {
  switch (action.type) {
    case 'ADD_STATUS':
      return [
        ...state,
        { ...action.payload }
      ]
    case 'CLEAR_STATUS':
      return []
    default:
      return [...state]
  }
}

function resultFileReducer(state, action) {
  switch (action.type) {
    case 'SET_RESULT_FILE':
      return {
        ...action.payload
      }
    default:
      return {
        ...state
      }
  }
}

function publishModalReducer(state, action) {
  switch (action.type) {
    case 'OPEN_PUBLISH_MODAL':
      return true
    case 'HIDE_PUBLISH_MODAL':
      return false
    default:
      return state
  }
}

function usePublishModal() {
  const [publishModalShow, publishModalDispatch] = useReducer(publishModalReducer, false)
  const publishModalShowRef = useRef(false)
  const [publishStatus, statuDispatch] = useReducer(statuReducer, [])
  const [resultFile, resultFileDispatch] = useReducer(resultFileReducer, {
    path: '',
    folderId: ''
  })

  useEffect(() => {
    publishModalShowRef.current = publishModalShow
  }, [publishModalShow])

  const openPublishModal = useCallback(() => {
    publishModalDispatch({
      type: 'OPEN_PUBLISH_MODAL'
    })
  }, [publishModalDispatch])

  const hidePublishModal = useCallback((ws) => {
    ws.close()
    clearPublishStatus()
    publishModalDispatch({
      type: 'HIDE_PUBLISH_MODAL'
    })
    setResultFile({
      path: '',
      folderId: ''
    })
  }, [clearPublishStatus, setResultFile, publishModalDispatch])

  const addPublishStatus = useCallback((statuObj) => {
    statuDispatch({
      type: 'ADD_STATUS',
      payload: statuObj
    })
  }, [statuDispatch])

  const clearPublishStatus = useCallback(() => {
    statuDispatch({
      type: 'CLEAR_STATUS'
    })
  }, [statuDispatch])

  const setResultFile = useCallback((payload) => {
    resultFileDispatch({
      type: 'SET_RESULT_FILE',
      payload
    })
  }, [resultFileDispatch])

  return {
    publishStatus,
    clearPublishStatus,
    addPublishStatus,
    publishModalShow,
    publishModalShowRef,
    openPublishModal,
    hidePublishModal,
    resultFile,
    setResultFile
  }

}

export default usePublishModal
