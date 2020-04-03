import { createActions, handleActions, combineActions } from 'redux-actions'
import { setComponentList, clearComponentList } from '../../actions/componentList'

const defaultState = []

console.log({
  [setComponentList]: '1',
  [clearComponentList]: 22
})

const componentListReducer = handleActions(
  {
    [setComponentList]: (state, action) => {
      return action.payload
    },
    [clearComponentList]: () => {
      return []
    }
  },
  defaultState
)

// const currentSelectReducer = handleActions(
//   {
    
//   }
// )

export default componentListReducer
