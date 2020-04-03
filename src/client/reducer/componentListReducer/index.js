import { handleActions } from 'redux-actions'
import { setComponentList, clearComponentList } from '../../actions/componentList'

const initialState = []

const componentListReducer = handleActions(
  {
    [setComponentList]: (state, action) => {
      return action.payload
    },
    [clearComponentList]: () => {
      return []
    }
  },
  initialState
)

export default componentListReducer
