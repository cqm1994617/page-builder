import { createActions } from 'redux-actions'
import { v4 as uuidv4 } from 'uuid'
import { setCurrentSelectPage } from './currentSelectPage'

const { pageList } = createActions({
  'PAGE_LIST/SET_PAGE_LIST': (pageList = []) => pageList,
  'PAGE_LIST/CLEAR_PAGE_LIST': () => []
})

const { setPageList, clearPageList } = pageList

const addPage = (pageInfo) => (dispatch, getState) => {

  const pageList = (getState()).pageListReducer
  const info = {
    ...pageInfo,
    id: pageInfo.id || uuidv4()
  }

  dispatch(
    setPageList(pageList.concat([info]))
  )
  dispatch(
    setCurrentSelectPage(info.id)
  )
}

const editPage = (pageInfo) => (dispatch, getState) => {
  const pageList = (getState()).pageListReducer
  const newPageList = pageList.map(item => {
    if (item.id === pageInfo.id) {
      return {
        ...pageInfo
      }
    }
    return item
  })

  dispatch(setPageList(newPageList))
}

const deletePage = (pageId) => (dispatch, getState) => {
  const pageList = (getState()).pageListReducer
  const newPageList = pageList.filter(item => item.id !== pageId)

  dispatch(setPageList(newPageList))
  dispatch(setCurrentSelectPage(pageList[0].id))
}

export {
  setPageList,
  clearPageList,
  addPage,
  editPage,
  deletePage
}
