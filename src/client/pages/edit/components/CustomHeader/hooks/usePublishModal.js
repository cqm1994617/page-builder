import React, { useState, useReducer, useCallback } from 'react'

function statuReducer(state, action) {
  switch (action.type) {
    case 'ADD': 
      return [
        ...state,
        {...action.payload}
      ]
    case 'CLEAR':
      return []
    default:
      return [...state]
  }
}

function usePublishModal() {
  const [publishModalShow, setPublishModalShow] = useState(false)
  const [publishStatus, dispatch] = useReducer(statuReducer, [])

  const openPublishModal = useCallback(() => {
    setPublishModalShow(true)
  }, [])

  const hidePublishModal = useCallback((ws) => {
    ws.close()
    clearPublishStatus()
    setPublishModalShow(false)
  }, [clearPublishStatus])

  const addPublishStatus = useCallback((statuObj) => {
    dispatch({
      type: 'ADD',
      payload: statuObj
    })
  }, [dispatch])

  const clearPublishStatus = useCallback(() => {
    dispatch({
      type: 'CLEAR'
    })
  }, [dispatch])

  return {
    publishStatus,
    clearPublishStatus,
    addPublishStatus,
    publishModalShow,
    openPublishModal,
    hidePublishModal
  }

}

export default usePublishModal
