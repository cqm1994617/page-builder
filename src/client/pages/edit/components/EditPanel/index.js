import React from 'react'
import styled from 'styled-components'
import { ToolPanel as BannerToolPanel } from '@/component-list/banner'

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
    'Banner': (setComponentList, componentList, currentSelect) => <BannerToolPanel setComponentList={setComponentList} componentList={componentList} currentSelect={currentSelect}  />
  }
  return panelMap[name]
}

function EditPanel({ currentSelect, componentList, setComponentList }) {

  return (
    <Panel>
      {
        currentSelect ? getPanelMap(currentSelect.name)(setComponentList, componentList, currentSelect) : <div>未选择</div>
      }
    </Panel>
  )
}

export default EditPanel
