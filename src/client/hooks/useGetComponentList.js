import React from 'react'
import { useSelector } from 'react-redux'

function useGetComponentList() {

  const pageId = useSelector(state => state.currentSelectPageReducer || '')
  const componentList = useSelector(state => {

    const currentPage = state.pageListReducer.filter(item => item.id === pageId)[0] || null
    return currentPage ? currentPage.componentList : []
  })
  return componentList
}

export default useGetComponentList
