import { handleActions } from 'redux-actions'
import { setCurrentSelect, clearCurrentSelect } from '@/client/actions/currentSelect'

const initialState = null

const currentSelectReducer = handleActions(
  {
    [setCurrentSelect]: (state, action) => {
      return action.payload
    },
    [clearCurrentSelect]: () => {
      return []
    }
  },
  initialState
)

export default currentSelectReducer
