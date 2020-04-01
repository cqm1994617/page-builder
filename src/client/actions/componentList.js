import {createActions} from 'redux-actions'

const {componentList} = createActions({
  'COMPONENT_LIST/SET_COMPONENT_LIST': (componentList = []) => ({componentList}),
  'COMPONENT_LIST/CLEAR_COMPONENT_LIST': () => ({componentList: []})
})


const {setComponentList, clearComponentList} = componentList

export {
  setComponentList,
  clearComponentList
}