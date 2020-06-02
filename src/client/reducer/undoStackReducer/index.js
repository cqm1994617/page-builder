import { handleActions } from 'redux-actions'
import { clearUndoStack, addUndoStack, initUndoStack } from '@/client/actions/undoStack'

const initialState = []

const undoStackReducer = handleActions(
  {
    [addUndoStack]: (state, action) => {
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
