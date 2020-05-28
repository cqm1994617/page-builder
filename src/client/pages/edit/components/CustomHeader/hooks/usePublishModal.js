import React, { useState, useReducer, useCallback } from 'react'

function statuReducer(state, action) {
  switch (action.type) {
    case 'ADD_STATUS': 
      return [
        ...state,
        {...action.payload}
      ]
    case 'CLEAR_STATUS':
      return []
    default:
      return [...state]
  }
}


function usePublishModal() {
  const [publishModalShow, setPublishModalShow] = useState(false)
  const [publishStatus, dispatch] = useReducer(statuReducer, [])
  const [filePath, setFilePath] = useState('')

  const openPublishModal = useCallback(() => {
    setPublishModalShow(true)
  }, [])

  const hidePublishModal = useCallback((ws) => {
    ws.close()
    clearPublishStatus()
    setPublishModalShow(false)
    setFilePath('')
  }, [clearPublishStatus])

  const addPublishStatus = useCallback((statuObj) => {
    dispatch({
      type: 'ADD_STATUS',
      payload: statuObj
    })
  }, [dispatch])

  const clearPublishStatus = useCallback(() => {
    dispatch({
      type: 'CLEAR_STATUS'
    })
  }, [dispatch])

  return {
    publishStatus,
    clearPublishStatus,
    addPublishStatus,
    publishModalShow,
    openPublishModal,
    hidePublishModal,
    filePath,
    setFilePath
  }

}

export default usePublishModal
