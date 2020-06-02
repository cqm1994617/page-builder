import { createActions } from 'redux-actions'
import { setPageList } from './pageList'
import { setCurrentStep } from './currentUndoStep'

const { undoStack } = createActions({
  'UNDO_STACK/ADD_UNDO_STACK': (pageList, undoStack, currentStepId) => {

    let stack = []

    if (undoStack.length > 49) {
      stack = undoStack.slice(1).concat([currentStepId])
    } else {
      stack = [...undoStack, currentStepId]
    }

    sessionStorage[currentStepId] = JSON.stringify(pageList)
    console.log(sessionStorage)
    return stack
  },
  'UNDO_STACK/INIT_UNDO_STACK': (stack, pageList) => {
    sessionStorage.clear()
    stack.forEach(stepId => {
      sessionStorage.setItem(stepId, JSON.stringify(pageList))
    })
    return [...stack]
  },
  'UNDO_STACK/SET_UNDO_STACK': (stack, pageList) => {
    stack.forEach(stepId => {
      sessionStorage.setItem(stepId, JSON.stringify(pageList))
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

const { addUndoStack, initUndoStack, setUndoStack, clearUndoStack } = undoStack


const undo = () => (dispatch, getState) => {
  const currentStepId = (getState()).currentUndoStep
  const undoStack = (getState()).undoStackReducer

  const index = undoStack.indexOf(currentStepId)
  
  if (index > 0) {

    const prevStep = undoStack[index - 1]

    const prevPageList = JSON.parse(sessionStorage[prevStep])
    dispatch(
      setPageList(prevPageList)
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
    const nextPageList = JSON.parse(sessionStorage[nextStep])
    dispatch(
      setPageList(nextPageList)
    )
    dispatch(setCurrentStep(nextStep))
  }


}

export {
  addUndoStack,
  initUndoStack,
  setUndoStack,
  clearUndoStack,
  undo,
  redo
}
