import React, { useState } from 'react'
import { Form, Input, Button, message, Modal } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import PositionMove from '@/component-list/common/PositionMove'
import { editComponent, deleteComponent } from '@/client/actions/componentList'
import { setCurrentSelectComponent } from '@/client/actions/currentSelectComponent'
import ToolContainer from '@/component-list/common/ToolContainer'
import { useGetComponentList, useGetCurrentSelectComponent, useDeleteCurrentComponent } from '@/client/hooks'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

const TextArea = styled(Input.TextArea) `
  width: 300px;
`

function Tool() {

  const dispatch = useDispatch()
  const componentList = useGetComponentList()
  const currentSelectComponent = useGetCurrentSelectComponent()
  const deleteCurrentComponent = useDeleteCurrentComponent()

  const [content, setContent] = useState(currentSelectComponent.props.content)

  const submit = () => {
    const newKey = uuidv4()
    dispatch(editComponent({
      type: 'text',
      key: newKey,
      props: {
        content
      }
    }))
    dispatch(setCurrentSelectComponent(newKey))
  }

  return (
    <ToolContainer>
      <Form>
        <Form.Item label="内容">
          <TextArea placeholder="输入文本内容" rows={5} onChange={(e) => setContent(e.target.value)} value={content} />
        </Form.Item>
        <PositionMove component={currentSelectComponent} componentList={componentList} />
        <Form.Item style={{ marginTop: '40px' }}>
          <Button type="primary" onClick={submit}>确认</Button>
          <Button type="danger" style={{ marginLeft: '20px' }} onClick={deleteCurrentComponent}>删除</Button>
        </Form.Item>
      </Form>
    </ToolContainer>
  )

}

export default Tool
