import { setPageList } from './pageList'
import { v4 as uuidv4 } from 'uuid'
import { setComponentPanelVisible } from './componentPanel'
import { setCurrentSelectComponent } from './currentSelectComponent'
import { addUndoStack } from './undoStack'

const addComponent = () => (dispatch, getState) => {
  console.log('addComponent')
  dispatch(setComponentPanelVisible(true))

  const state = getState()
  const pageId = state.currentSelectPageReducer
  const pageList = [...state.pageListReducer]

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

}

const addComponentFromWrap = (key, direction) => (dispatch, getState) => {
  console.log('addComponentFromWrap')
  dispatch(setComponentPanelVisible(true))

  const state = getState()
  const pageId = state.currentSelectPageReducer
  const pageList = [...state.pageListReducer]

  const currentPage = pageList.filter(item => item.id === pageId)[0]
  const index = currentPage.componentList.map(item => item.key).indexOf(key)
  let beforeArr = [], afterArr = []

  if (direction === 'over') {
    beforeArr = currentPage.componentList.slice(0, index)
    afterArr = currentPage.componentList.slice(index)
  } else {
    beforeArr = currentPage.componentList.slice(0, index + 1)
    afterArr = currentPage.componentList.slice(index + 1)
  }

  const newPageList = pageList.map(item => item.id === pageId ? {
    ...item,
    componentList: beforeArr.concat([{
      type: 'empty',
      key: uuidv4()
    }], afterArr)
  } : item)

  dispatch(
    setPageList(newPageList)
  )

}

const selectComponent = (component) => (dispatch, getState) => {
  console.log('selectComponent')
  const state = getState()
  const pageId = state.currentSelectPageReducer
  const pageList = [...state.pageListReducer]

  dispatch(addUndoStack(state))

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

const deleteComponent = (component) => (dispatch, getState) => {
  console.log('deleteComponent')
  const state = getState()
  const pageId = state.currentSelectPageReducer
  const pageList = [...state.pageListReducer]

  const newPageList = pageList.map(item => item.id === pageId ? {
    ...item,
    componentList: item.componentList.filter(item => item.key !== component.key)
  } : item)

  dispatch(
    setCurrentSelectComponent(null)
  )
  dispatch(
    setPageList(newPageList)
  )
}

const editComponent = (component) => (dispatch, getState) => {
  console.log('editComponent')
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

const moveUpComponent = (component) => (dispatch, getState) => {
  console.log('moveUpComponent')
  const state = getState()
  const pageId = state.currentSelectPageReducer
  const pageList = [...state.pageListReducer]

  const currentPage = pageList.filter(item => item.id === pageId)[0]

  let componentList = [...currentPage.componentList]
  const index = componentList.map(item => item.key).indexOf(component.key)

  componentList[index] = componentList[index - 1]
  componentList[index - 1] = component

  const newPageList = pageList.map(item => item.id === pageId ? {
    ...item,
    componentList: componentList
  } : item)

  dispatch(
    setPageList(newPageList)
  )

}

const moveDownComponent = (component) => (dispatch, getState) => {
  console.log('moveDownComponent')
  const state = getState()
  const pageId = state.currentSelectPageReducer
  const pageList = [...state.pageListReducer]
  const currentPage = pageList.filter(item => item.id === pageId)[0]

  let componentList = [...currentPage.componentList]
  const index = componentList.map(item => item.key).indexOf(component.key)

  componentList[index] = componentList[index + 1]
  componentList[index + 1] = component

  const newPageList = pageList.map(item => item.id === pageId ? {
    ...item,
    componentList: componentList
  } : item)

  dispatch(
    setPageList(newPageList)
  )
}

export {
  addComponent,
  deleteComponent,
  editComponent,
  selectComponent,
  cleanEmpty,
  addComponentFromWrap,
  moveUpComponent,
  moveDownComponent
}
