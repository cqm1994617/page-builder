import { handleActions } from 'redux-actions'
import { setCurrentSelectPage, clearCurrentSelectPage } from '@/client/actions/currentSelectPage'

const initialState = null

const currentSelectPageReducer = handleActions(
  {
    [setCurrentSelectPage]: (state, action) => {
      return action.payload
    },
    [clearCurrentSelectPage]: () => {
      return null
    }
  },
  initialState
)

export default currentSelectPageReducer
