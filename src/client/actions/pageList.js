import { createActions } from 'redux-actions'

const { pageList } = createActions({
  'PAGE_LIST/SET_PAGE_LIST': (pageList = []) => pageList,
  'PAGE_LIST/CLEAR_PAGE_LIST': () => []
})

const { setPageList, clearPageList } = pageList

export {
  setPageList,
  clearPageList
}
