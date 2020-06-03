import { handleActions } from 'redux-actions'
import { clearUndoStack, setUndoStack, initUndoStack } from '@/client/actions/undoStack'

const initialState = []

const undoStackReducer = handleActions(
  {
    [setUndoStack]: (state, action) => {
      return action.payload
    },
    [initUndoStack]: (state, action) => {
      return action.payload
    },
    [clearUndoStack]: () => {
      return []
    }
  },
  initialState
)

export default undoStackReducer
