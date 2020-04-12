import React from 'react'
import { useSelector } from 'react-redux'

function useGetCurrentSelectPage() {

  const pageId = useSelector(state => state.currentSelectPageReducer || '')

  const currentSelectPage = useSelector(state => {
    const currentPage = state.pageListReducer.filter(item => item.id === pageId)[0] || null
    return currentPage
  })
  return currentSelectPage || null
}

export default useGetCurrentSelectPage
