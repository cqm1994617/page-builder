import {createActions} from 'redux-actions'

const {currentSelect} = createActions({
  'CURRENT_SELECT/SET_CURRENT_SELECT': (currentSelect = null) => currentSelect,
  'CURRENT_SELECT/CLEAR_CURRENT_SELECT': () => null
})


const {setCurrentSelect, clearCurrentSelect} = currentSelect

export {
  setCurrentSelect,
  clearCurrentSelect
}