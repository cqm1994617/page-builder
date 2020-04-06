import React from 'react'
import { useSelector } from 'react-redux'

function useGetCurrentSelectComponent() {

  const pageId = useSelector(state => state.currentSelectPageReducer || '')
  const componentKey = useSelector(state => state.currentSelectComponentReducer || '')

  const currentSelectComponent = useSelector(state => {

    const currentPage = state.pageListReducer.filter(item => item.id === pageId)[0] || null
    if (currentPage) {
      const component = currentPage.componentList.filter(item => item.key === componentKey)[0] || null
      return component
    }
    return null
  })
  return currentSelectComponent || null
}

export default useGetCurrentSelectComponent
