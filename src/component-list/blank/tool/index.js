import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import PositionMove from '@/component-list/common/PositionMove'
import { editComponent } from '@/client/actions/componentList'
import { setCurrentSelectComponent } from '@/client/actions/currentSelectComponent'
import ToolContainer from '@/component-list/common/ToolContainer'
import { SketchPicker } from 'react-color';
import { useGetComponentList, useGetCurrentSelectComponent, useDeleteCurrentComponent } from '@/client/hooks'
import { useDispatch } from 'react-redux'

function Tool() {

  const dispatch = useDispatch()
  const componentList = useGetComponentList()
  const currentSelectComponent = useGetCurrentSelectComponent()
  const deleteCurrentComponent = useDeleteCurrentComponent()

  const [height, setHeight] = useState(currentSelectComponent.props.height)
  const [backgroundColor, setBackgroundColor] = useState(currentSelectComponent.props.backgroundColor)

  const submit = () => {
    const newKey = uuidv4()
    dispatch(editComponent({
      type: 'blank',
      key: newKey,
      props: {
        height,
        backgroundColor
      }
    }))
    dispatch(setCurrentSelectComponent(newKey))
  }

  return (
    <ToolContainer>
      <Form>
        <Form.Item label="高度">
          <Input placeholder="请输入高度" onChange={(e) => setHeight(e.target.value)} value={height} />
        </Form.Item>
        <Form.Item label="颜色">
          <Input style={{ marginBottom: '20px' }} placeholder="请输入色值" onChange={(e) => setBackgroundColor(e.target.value)} value={backgroundColor} />
          <SketchPicker
            width="300px"
            color={backgroundColor}
            onChangeComplete={(e) => setBackgroundColor(e.hex)}
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
