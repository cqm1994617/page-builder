import { setPageList } from './pageList'
import { v4 as uuidv4 } from 'uuid'
import { setComponentPanelVisible } from './componentPanel'
import { setCurrentSelectComponent } from './currentSelectComponent'

const addComponent = (key, direction) => (dispatch, getState) => {
  dispatch(setComponentPanelVisible(true))

  const state = getState()
  const pageId = state.currentSelectPageReducer
  const pageList = [...state.pageListReducer]

  if (!key) {
    const newPageList = pageList.map(item => item.id === pageId ? {
      ...item,
      componentList: item.componentList.concat([{
        type: 'empty',
        key: uuidv4()
      }])
    } : item)

    dispatch(
      setPageList(newPageList)
    )
  } else {

  }
}

const selectComponent = (component) => (dispatch, getState) => {
  const state = getState()
  const pageId = state.currentSelectPageReducer
  const pageList = [...state.pageListReducer]

  const newPageList = pageList.map(item => item.id === pageId ? {
    ...item,
    componentList: item.componentList.map(item => item.type === 'empty' ? component : item)
  } : item)

  dispatch(
    setPageList(newPageList)
  )

  dispatch(setComponentPanelVisible(false))
  dispatch(setCurrentSelectComponent(component.key))
}

const deleteComponent = (id) => (dispatch, getState) => {
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

const cleanEmpty = () => (dispatch, getState) => {
  const state = getState()
  const pageId = state.currentSelectPageReducer
  const pageList = [...state.pageListReducer]

  const currentPage = pageList.filter(item => item.id === pageId)[0]
  const hasEmpty = currentPage.componentList.map(item => item.type).includes('empty')

  if (hasEmpty) {
    const newPageList = pageList.map(item => item.id === pageId ? {
      ...item,
      componentList: item.componentList.filter(item => item.type !== 'empty')
    } : item)
    dispatch(
      setPageList(newPageList)
    )
  }
}

export {
  addComponent,
  deleteComponent,
  editComponent,
  selectComponent,
  cleanEmpty
}
