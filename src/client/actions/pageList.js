import { createActions } from 'redux-actions'
import { v4 as uuidv4 } from 'uuid'
import { setCurrentSelectPage } from './currentSelectPage'
import { addUndoStack } from './undoStack'
import { setCurrentStep } from './currentUndoStep'

const { pageList } = createActions({
  'PAGE_LIST/SET_PAGE_LIST': (pageList = []) => pageList,
  'PAGE_LIST/CLEAR_PAGE_LIST': () => []
})

const { setPageList, clearPageList } = pageList

const _addUndoStack = (dispatch, undoStack, pageList, currentSelectPage, currentSelectComponent) => {
  const currentStepId = uuidv4()
  dispatch(addUndoStack(pageList, undoStack, currentStepId, currentSelectPage, currentSelectComponent))
  dispatch(setCurrentStep(currentStepId))
}

const addPage = (pageInfo) => (dispatch, getState) => {
  console.log('addPage')
  const state = getState()
  const pageList = state.pageListReducer
  const info = {
    ...pageInfo,
    id: pageInfo.id || uuidv4()
  }
  const newPageList = pageList.concat([info])

  _addUndoStack(dispatch, state.undoStackReducer, newPageList, info.id, null)

  dispatch(
    setPageList(newPageList)
  )
  dispatch(
    setCurrentSelectPage(info.id)
  )
}

const editPage = (pageInfo) => (dispatch, getState) => {
  console.log('editPage')
  const state = getState()
  const pageList = state.pageListReducer
  console.log(pageInfo)
  const newPageList = pageList.map(item => {
    if (item.id === pageInfo.id) {
      return {
        ...pageInfo
      }
    }
    return item
  })

  _addUndoStack(dispatch, state.undoStackReducer, newPageList, pageInfo.id, state.currentSelectComponentReducer)
  
  dispatch(setPageList(newPageList))
}

const deletePage = (pageId) => (dispatch, getState) => {
  console.log('deletePage')
  const state = getState()
  const pageList = state.pageListReducer
  const newPageList = pageList.filter(item => item.id !== pageId)

  _addUndoStack(dispatch, state.undoStackReducer, newPageList, state.currentSelectPageReducer, state.currentSelectComponentReducer)

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
