import { createActions } from 'redux-actions'

const { currentSelectComponent } = createActions({
  'CURRENT_SELECT_COMPONENT/SET_CURRENT_SELECT_COMPONENT': (currentSelect = null) => currentSelect,
  'CURRENT_SELECT_COMPONENT/CLEAR_CURRENT_SELECT_COMPONENT': () => null
})


const { setCurrentSelectComponent, clearCurrentSelectComponent } = currentSelectComponent

export {
  setCurrentSelectComponent,
  clearCurrentSelectComponent
}
