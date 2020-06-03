import { createActions } from 'redux-actions'
import { v4 as uuidv4 } from 'uuid'
import { setCurrentSelectPage } from './currentSelectPage'
import { addUndoStack } from './undoStack'

const { pageList } = createActions({
  'PAGE_LIST/SET_PAGE_LIST': (pageList = []) => pageList,
  'PAGE_LIST/CLEAR_PAGE_LIST': () => []
})

const { setPageList, clearPageList } = pageList


const addPage = (pageInfo) => (dispatch, getState) => {
  const state = getState()
  const pageList = state.pageListReducer
  const currentSelectComponent = state.currentSelectComponentReducer
  const info = {
    ...pageInfo,
    id: pageInfo.id || uuidv4()
  }
  const newPageList = pageList.concat([info])

  dispatch(
    setPageList(newPageList)
  )
  dispatch(
    setCurrentSelectPage(info.id)
  )
  dispatch(addUndoStack({
    pageList: newPageList,
    currentSelectComponent: currentSelectComponent,
    currentSelectPage: info.id
  }))
}

const editPage = (pageInfo) => (dispatch, getState) => {
  const state = getState()
  const pageList = state.pageListReducer
  const currentSelectComponent = state.currentSelectComponentReducer
  const newPageList = pageList.map(item => {
    if (item.id === pageInfo.id) {
      return {
        ...pageInfo
      }
    }
    return item
  })

  dispatch(setPageList(newPageList))
  dispatch(addUndoStack({
    pageList: newPageList,
    currentSelectComponent: currentSelectComponent,
    currentSelectPage: pageInfo.id
  }))
}

const deletePage = (pageId) => (dispatch, getState) => {

  const state = getState()
  const pageList = state.pageListReducer
  const newPageList = pageList.filter(item => item.id !== pageId)

  dispatch(setPageList(newPageList))
  dispatch(setCurrentSelectPage(pageList[0].id))
  dispatch(addUndoStack({
    pageList: newPageList,
    currentSelectComponent: null,
    currentSelectPage: pageList[0].id
  }))
}

export {
  setPageList,
  clearPageList,
  addPage,
  editPage,
  deletePage
}
