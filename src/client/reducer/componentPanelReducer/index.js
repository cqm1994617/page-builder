import { handleActions } from 'redux-actions'
import { setComponentPanelVisible } from '@/client/actions/componentPanel'

const initialState = false

const componentPanelReducer = handleActions(
  {
    [setComponentPanelVisible]: (state, action) => {
      return action.payload
    }
  },
  initialState
)

export default componentPanelReducer
