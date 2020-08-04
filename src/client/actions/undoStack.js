import { createActions } from 'redux-actions'
import { setPageList } from './pageList'
import { setCurrentStep } from './currentUndoStep'
import { setCurrentSelectComponent } from './currentSelectComponent'
import { setCurrentSelectPage } from './currentSelectPage'
import { v4 as uuidv4 } from 'uuid'
import { message } from 'antd'

const { undoStack } = createActions({
  'UNDO_STACK/SET_UNDO_STACK': (stack) => {
    return [...stack]
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
    stack && stack.forEach(stepId => {
      sessionStorage.removeItem(stepId)
    })
    return []
  }
})

const { setUndoStack, initUndoStack, clearUndoStack } = undoStack

const addUndoStack = (currentInfo) => (dispatch, getState) => {
  const state = getState()
  const undoStack = state.undoStackReducer
  const prevStep = state.currentUndoStep
  const currentStep = uuidv4()
  const currentSelectComponent = currentInfo.currentSelectComponent
  const currentSelectPage = currentInfo.currentSelectPage

  const index = undoStack.indexOf(prevStep)
  const isLast = undoStack.length > 0 ? index === undoStack.length - 1 : false

  let stack = []

  if (isLast) {
    if (undoStack.length > 49) {
      sessionStorage.removeItem(undoStack[0])
      stack = undoStack.slice(1).concat([currentStep])
    } else {
      stack = [...undoStack, currentStep]
    }
  } else {
    undoStack.slice(index + 1).forEach(removeKey => {
      sessionStorage.removeItem(removeKey)
    })
    stack = undoStack.slice(0, index + 1).concat([currentStep])
  }

  dispatch(setUndoStack(stack))
  dispatch(setCurrentStep(currentStep))

  sessionStorage[currentStep] = JSON.stringify({
    pageList: currentInfo.pageList,
    currentSelectComponent,
    currentSelectPage
  })

}

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
    dispatch(
      setCurrentSelectPage(prevPageInfo.currentSelectPage)
    )
    dispatch(
      setCurrentSelectComponent(prevPageInfo.currentSelectComponent)
    )
    dispatch(setCurrentStep(prevStep))
  } else {
    message.info('已是第一项')
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
    dispatch(
      setCurrentSelectPage(nextPageInfo.currentSelectPage)
    )
    dispatch(
      setCurrentSelectComponent(nextPageInfo.currentSelectComponent)
    )
    dispatch(setCurrentStep(nextStep))
  } else {
    message.info('已是最后一项')
  }


}

export {
  addUndoStack,
  setUndoStack,
  initUndoStack,
  clearUndoStack,
  undo,
  redo
}
