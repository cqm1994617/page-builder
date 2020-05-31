import { createActions } from 'redux-actions'
import { v4 as uuidv4 } from 'uuid'
import { setPageList } from './pageList'

const { undoStack } = createActions({
  'UNDO_STACK/ADD_UNDO_STACK': (state) => {
    const currentStepId = uuidv4()

    const pageList = [...state.pageListReducer]
    let stack = []

    if (state.undoStackReducer.length > 49) {
      stack = state.undoStackReducer.slice(1).concat([currentStepId])
    } else {
      stack = [...state.undoStackReducer, currentStepId]
    }

    sessionStorage[currentStepId] = JSON.stringify(pageList)

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

}

const redo = (undoStack) => (dispatch, getState) => {

}

export {
  addUndoStack,
  initUndoStack,
  setUndoStack,
  clearUndoStack,
  undo,
  redo
}
