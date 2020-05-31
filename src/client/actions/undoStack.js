import { createActions } from 'redux-actions'
import { v4 as uuidv4 } from 'uuid'
import { setPageList } from './pageList'

const { undoStack } = createActions({
  'UNDO_STACK/SET_UNDO_STACK': (state) => {
console.log(state)
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
  'UNDO_STACK/CLEAR_UNDO_STACK': (stack) => {

    stack.forEach(stepId => {
      sessionStorage.removeItem(stepId)
    })

    return []
  }
})

const { setUndoStack, clearUndoStack } = undoStack

const undo = (undoStack) => (dispatch, getState) => {

}

const redo = (undoStack) => (dispatch, getState) => {

}

export {
  setUndoStack,
  clearUndoStack,
  undo,
  redo
}
