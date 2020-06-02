import { createActions } from 'redux-actions'
import { setPageList } from './pageList'
import { setCurrentStep } from './currentUndoStep'
import { setCurrentSelectComponent } from './currentSelectComponent'
import { setCurrentSelectPage } from './currentSelectPage'


const { undoStack } = createActions({
  'UNDO_STACK/ADD_UNDO_STACK': (pageList, undoStack, currentStepId, currentSelectPage, currentSelectComponent) => {

    let stack = []

    if (undoStack.length > 49) {
      stack = undoStack.slice(1).concat([currentStepId])
    } else {
      stack = [...undoStack, currentStepId]
    }

    sessionStorage[currentStepId] = JSON.stringify({
      pageList,
      currentSelectComponent,
      currentSelectPage
    })
    return stack
  },
  'UNDO_STACK/INIT_UNDO_STACK': (stack, pageList, currentSelectPage, currentSelectComponent) => {
    sessionStorage.clear()
    stack.forEach(stepId => {
      sessionStorage.setItem(stepId, JSON.stringify({
        pageList,
        currentSelectComponent,
        currentSelectPage
      }))
    })
    return [...stack]
  },
  'UNDO_STACK/CLEAR_UNDO_STACK': (stack) => {
    stack.forEach(stepId => {
      sessionStorage.removeItem(stepId)
    })
    return []
  }
})

const { addUndoStack, initUndoStack, clearUndoStack } = undoStack


const undo = () => (dispatch, getState) => {
  const currentStepId = (getState()).currentUndoStep
  const undoStack = (getState()).undoStackReducer

  const index = undoStack.indexOf(currentStepId)

  if (index > 0) {

    const prevStep = undoStack[index - 1]

    const prevPageInfo = JSON.parse(sessionStorage[prevStep])
    dispatch(
      setPageList(prevPageInfo.pageList)
    )
    console.log(getState())
    dispatch(
      setCurrentSelectPage(prevPageInfo.currentSelectPage)
    )
    dispatch(
      setCurrentSelectComponent(prevPageInfo.currentSelectComponent)
    )
    dispatch(setCurrentStep(prevStep))
  } else {
    console.log('已经是第一项')
  }
}

const redo = () => (dispatch, getState) => {
  const currentStepId = (getState()).currentUndoStep
  const undoStack = (getState()).undoStackReducer

  const index = undoStack.indexOf(currentStepId)

  if (index < undoStack.length - 1) {
    const nextStep = undoStack[index + 1]
    const nextPageInfo = JSON.parse(sessionStorage[nextStep])
    dispatch(
      setPageList(nextPageInfo.pageList)
    )
    console.log('redo')
    console.log(getState())
    dispatch(
      setCurrentSelectPage(nextPageInfo.currentSelectPage)
    )
    dispatch(
      setCurrentSelectComponent(nextPageInfo.currentSelectComponent)
    )
    dispatch(setCurrentStep(nextStep))
  }


}

export {
  addUndoStack,
  initUndoStack,
  clearUndoStack,
  undo,
  redo
}
