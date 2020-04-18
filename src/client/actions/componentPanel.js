import { createActions } from 'redux-actions'

const { componentPanel } = createActions({
  'COMPONENT_PANEL/SET_COMPONENT_PANEL_VISIBLE': (visible) => visible
})

const { setComponentPanelVisible } = componentPanel

export {
  setComponentPanelVisible
}
