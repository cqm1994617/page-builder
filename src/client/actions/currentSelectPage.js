import { createActions } from 'redux-actions'

const { currentSelectPage } = createActions({
  'CURRENT_SELECT_PAGE/SET_CURRENT_SELECT_PAGE': (currentSelectPage = null) => currentSelectPage,
  'CURRENT_SELECT_PAGE/CLEAR_CURRENT_SELECT_PAGE': () => null
})


const { setCurrentSelectPage, clearCurrentSelectPage } = currentSelectPage

export {
  setCurrentSelectPage,
  clearCurrentSelectPage
}
