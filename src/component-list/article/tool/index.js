import React, { useState } from 'react'
import { Form, Input, Button, message, Modal } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import PositionMove from '@/component-list/common/PositionMove'
import RichEdit from '@/component-list/common/RichEdit'
import { editComponent, deleteComponent } from '@/client/actions/componentList'
import { setCurrentSelectComponent } from '@/client/actions/currentSelectComponent'
import ToolContainer from '@/component-list/common/ToolContainer'
import { useGetComponentList, useGetCurrentSelectComponent, useDeleteCurrentComponent } from '@/client/hooks'
import { useDispatch } from 'react-redux'

function Tool() {

  const dispatch = useDispatch()
  const componentList = useGetComponentList()
  const currentSelectComponent = useGetCurrentSelectComponent()
  const deleteCurrentComponent = useDeleteCurrentComponent()

  const [title, setTitle] = useState(currentSelectComponent.props.title)
  const [author, setAuthor] = useState(currentSelectComponent.props.author)
  const [dateStr, setDateStr] = useState(currentSelectComponent.props.dateStr)
  const [content, setContent] = useState(currentSelectComponent.props.content)

  const submit = () => {
    const newKey = uuidv4()
    dispatch(editComponent({
      type: 'article',
      key: newKey,
      props: {
        title,
        author,
        dateStr,
        content
      }
    }))
    dispatch(setCurrentSelectComponent(newKey))
  }

  return (
    <ToolContainer>
      <Form>
        <Form.Item label="标题">
          <Input placeholder="请输入标题" onChange={e => setTitle(e.target.value)} value={title} />
        </Form.Item>
        <Form.Item label="作者">
          <Input placeholder="请输入作者" onChange={e => setAuthor(e.target.value)} value={author} />
        </Form.Item>
        <Form.Item label="日期">
          <Input placeholder="请输入日期" onChange={e => setDateStr(e.target.value)} value={dateStr} />
        </Form.Item>
        <Form.Item label="内容">
          <RichEdit
            onChange={html => { setContent(html) }}
            html={currentSelectComponent.props.content}
          />
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
