import testReducer from './testReducer'
import { combineReducers } from 'redux'


const reducers = combineReducers({
  testReducer: testReducer
})

export default reducers
