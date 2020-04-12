import { createActions } from 'redux-actions'
import { v4 as uuidv4 } from 'uuid'

const { pageList } = createActions({
  'PAGE_LIST/SET_PAGE_LIST': (pageList = []) => pageList,
  'PAGE_LIST/CLEAR_PAGE_LIST': () => []
})

const { setPageList, clearPageList } = pageList

const addPage = (pageInfo) => (dispatch, getState) => {

  const pageList = (getState()).pageListReducer
  const info = {
    ...pageInfo,
    id: pageInfo.id || uuidv4()
  }

  dispatch(
    setPageList(pageList.concat([info]))
  )
}

export {
  setPageList,
  clearPageList,
  addPage
}
