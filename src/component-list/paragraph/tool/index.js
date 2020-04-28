import React, { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import PositionMove from '@/component-list/common/PositionMove'
import { editComponent, deleteComponent } from '@/client/actions/componentList'
import { setCurrentSelectComponent } from '@/client/actions/currentSelectComponent'
import ToolContainer from '@/component-list/common/ToolContainer'
import { useGetComponentList, useGetCurrentSelectComponent } from '@/client/hooks'
import { useDispatch } from 'react-redux'

function Tool() {

  const dispatch = useDispatch()
  const componentList = useGetComponentList()
  const currentSelectComponent = useGetCurrentSelectComponent()

  const [title, setTitle] = useState(currentSelectComponent.props.title)
  const [content, setContent] = useState(currentSelectComponent.props.content)

  const submit = () => {
    const newKey = uuidv4()
    dispatch(editComponent({
      type: 'paragraph',
      key: newKey,
      props: {
        title,
        content
      }
    }))
    dispatch(setCurrentSelectComponent(newKey))
  }

  const remove = () => {
    dispatch(
      deleteComponent(currentSelectComponent)
    )
  }

  return (
    <ToolContainer>
      <Form>
        <Form.Item label="标题">
          <Input placeholder="标题" onChange={(e) => setTitle(e.target.value)} value={title} />
        </Form.Item>
        <Form.Item label="内容">
          <Input placeholder="内容" onChange={(e) => setContent(e.target.value)} value={content} />
        </Form.Item>
        <PositionMove component={currentSelectComponent} componentList={componentList} />
        <Form.Item>
          <Button type="primary" onClick={submit}>确认</Button>
          <Button type="danger" onClick={remove}>删除</Button>
        </Form.Item>
      </Form>
    </ToolContainer>
  )

}

export default Tool
