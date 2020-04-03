import {combineReducers} from 'redux'
import componentListReducer from './componentListReducer'
import currentSelectReducer from './currentSelectReducer'

export default combineReducers({
  componentListReducer,
  currentSelectReducer
})