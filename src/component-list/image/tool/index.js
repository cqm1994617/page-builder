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

function Tool() {

  const dispatch = useDispatch()
  const componentList = useGetComponentList()
  const currentSelectComponent = useGetCurrentSelectComponent()
  const deleteCurrentComponent = useDeleteCurrentComponent()

  const [imgUrl, setImgUrl] = useState(currentSelectComponent.props.imgUrl)
  const [height, setHeight] = useState(currentSelectComponent.props.height)

  const submit = () => {
    const newKey = uuidv4()
    dispatch(editComponent({
      type: 'image',
      key: newKey,
      props: {
        imgUrl,
        height
      }
    }))
    dispatch(setCurrentSelectComponent(newKey))
  }

  return (
    <ToolContainer>
      <Form>
        <Form.Item label="图片高度">
          <Input style={{ width: '300px' }} placeholder="高度" onChange={(e) => setHeight(e.target.value)} value={height} />
        </Form.Item>
        <Form.Item label="图片URL">
          <Input style={{ width: '300px' }} placeholder="标题" onChange={(e) => setImgUrl(e.target.value)} value={imgUrl} />
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
