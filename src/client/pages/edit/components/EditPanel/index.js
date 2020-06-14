import React from 'react'
import styled from 'styled-components'
import { ToolPanel as BannerToolPanel } from '@/component-list/banner'
import { ToolPanel as ParagraphPanel } from '@/component-list/paragraph'
import { ToolPanel as TextPanel } from '@/component-list/text'
import { ToolPanel as ImagePanel } from '@/component-list/image'
import { getPanelMap } from '@/component-list/componentList'
import { useDispatch, useSelector } from 'react-redux'
import { useGetCurrentSelectComponent } from '@/client/hooks'

const Panel = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 400px;
  background-color: #fff;
  overflow: auto;
  box-shadow: 3px 0 16px rgba(0, 0, 0, 0.06);
`
const Info = styled.div`
  margin-top: 20px;
  text-align: center;
  color: #999;
`

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
