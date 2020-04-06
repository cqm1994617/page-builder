import {combineReducers} from 'redux'
import pageListReducer from './pageListReducer'
import currentSelectComponentReducer from './currentSelectComponentReducer'
import currentSelectPageReducer from './currentSelectPageReducer'

export default combineReducers({
  pageListReducer,
  currentSelectComponentReducer,
  currentSelectPageReducer
})