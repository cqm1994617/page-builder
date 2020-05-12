import React from 'react'
import styled from 'styled-components'
import { ToolPanel as BannerToolPanel } from '@/component-list/banner'
import { ToolPanel as ParagraphPanel } from '@/component-list/paragraph'
import { ToolPanel as TextPanel } from '@/component-list/text'
import { useDispatch, useSelector } from 'react-redux'
import { useGetCurrentSelectComponent } from '@/client/hooks'

const Panel = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 400px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 3px 0 16px rgba(0, 0, 0, 0.06);
`
const Info = styled.div`
  margin-top: 20px;
  text-align: center;
  color: #999;
`

const getPanelMap = (name) => {
  const panelMap = {
    'banner': () => <BannerToolPanel />,
    'paragraph': () => <ParagraphPanel />,
    'text': () => <TextPanel />
  }
  return panelMap[name]
}

function EditPanel() {

  const currentSelectComponent = useGetCurrentSelectComponent()

  return (
    <Panel>
      {
        currentSelectComponent ? getPanelMap(currentSelectComponent.type)() : <Info>暂未选择组件</Info>
      }
    </Panel>
  )
}

export default EditPanel
