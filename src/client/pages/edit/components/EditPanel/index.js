import React from 'react'
import styled from 'styled-components'
import { ToolPanel as BannerToolPanel } from '@/component-list/banner'
import { useDispatch, useSelector } from 'react-redux'
import { useGetCurrentSelectComponent } from '@/client/hooks'

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
    'banner': () => <BannerToolPanel />
  }
  return panelMap[name]
}

function EditPanel() {

  const currentSelectComponent = useGetCurrentSelectComponent()

  return (
    <Panel>
      {
        currentSelectComponent ? getPanelMap(currentSelectComponent.type)() : <div>未选择</div>
      }
    </Panel>
  )
}

export default EditPanel
