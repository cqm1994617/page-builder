import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {moveDownComponent, moveUpComponent} from '@/client/actions/componentList'
import { Form, Button } from 'antd'

function PositionMove({ component, componentList }) {

  const [showMoveUp, setShowMoveUp] = useState(false)
  const [showMoveDown, setShowMoveDown] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const list = componentList.filter(item => item.type !== 'empty')
    const index = list.map(item => item.key).indexOf(component.key)

    setShowMoveUp(!!list[index - 1])
    setShowMoveDown(!!list[index + 1])
  }, [component, componentList])

  const moveUp = () => {
    dispatch(
      moveUpComponent(component)
    )
  }

  const moveDown = () => {
    dispatch(
      moveDownComponent(component)
    )
  }

  return (
    showMoveUp || showMoveDown ? <Form.Item label="位置修改">
      {showMoveUp && <Button onClick={moveUp}>上移</Button>}
      {showMoveDown && <Button onClick={moveDown} style={{marginLeft: '20px'}}>下移</Button>}
    </Form.Item> : null
  )

}

export default PositionMove
