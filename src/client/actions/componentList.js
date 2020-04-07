import { setPageList } from './pageList'

const addComponent = (component, index) => (dispatch, getState) => {

  const state = getState()
  const pageId = state.currentSelectPageReducer

  const pageList = [...state.pageListReducer]
  if (!index) {
    const newPageList = pageList.map(item => item.id === pageId ? {
      ...item,
      componentList: item.componentList.concat([component])
    } : item)

    dispatch(
      setPageList(newPageList)
    )
  }
}

const deleteComponent = (index) => (dispatch, getState) => {
  const state = getState()
  const pageId = state.currentSelectPageReducer
}

const editComponent = (component) => (dispatch, getState) => {
  const state = getState()
  const pageId = state.currentSelectPageReducer
  const componentKey = state.currentSelectComponentReducer

  const pageList = [...state.pageListReducer]

  const newPageList = pageList.map(item => item.id === pageId ? {
    ...item,
    componentList: item.componentList.map((componentItem) => {
      return componentItem.key === componentKey ? component : componentItem
    })
  } : item)

  dispatch(
    setPageList(newPageList)
  )
}


export {
  addComponent,
  deleteComponent,
  editComponent
}
