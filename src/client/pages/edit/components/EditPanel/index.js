import React from 'react'
import styled from 'styled-components'
import { ToolPanel as BannerToolPanel } from '@/component-list/banner'
import { useDispatch, useSelector } from 'react-redux'

const Panel = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 400px;
  background-color: #fff;
  box-shadow: 3px 0 16px rgba(0, 0, 0, 0.06);
`

const getPanelMap = (name) => {
  const panelMap = {
    'Banner': () => <BannerToolPanel />
  }
  return panelMap[name]
}

function EditPanel() {

  const currentSelect = useSelector(state => state.currentSelectReducer)

  console.log(currentSelect)

  return (
    <Panel>
      {
        currentSelect ? getPanelMap(currentSelect.name)() : <div>未选择</div>
      }
    </Panel>
  )
}

export default EditPanel
