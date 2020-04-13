import { createActions } from 'redux-actions'
import { v4 as uuidv4 } from 'uuid'
import { setCurrentSelectPage } from './currentSelectPage'

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
  dispatch(
    setCurrentSelectPage(info.id)
  )

}

export {
  setPageList,
  clearPageList,
  addPage
}
