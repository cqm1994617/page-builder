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

console.log(setUndoStack)

const undo = (undoStack) => (dispatch, getState) => {
  const currentStepId = (getState()).currentUndoStep
  const undoStack = (getState()).undoStackReducer
  console.log(currentStepId)
  console.log(sessionStorage[undoStack[undoStack.indexOf(currentStepId) - 1]])
  if (undoStack.indexOf(currentStepId) > 0) {

    const prevStep = undoStack[undoStack.indexOf(currentStepId) - 1]

    const prevPageList = JSON.parse(sessionStorage[prevStep])
    dispatch(
      setPageList(prevPageList)
    )
    dispatch(setCurrentStep(prevStep))
  } else {
    console.log('已经是第一项')
  }
}

const redo = (undoStack) => (dispatch, getState) => {
  console.log(undoStack)
  const currentStepId = (getState()).currentUndoStep
  console.log(currentStepId)
}

export {
  addUndoStack,
  initUndoStack,
  setUndoStack,
  clearUndoStack,
  undo,
  redo
}
