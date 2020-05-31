import React, { useState, useCallback } from 'react'
import { ArrowUpOutlined, ArrowDownOutlined, CheckOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useGetCurrentSelectComponent } from '@/client/hooks'

const Container = styled.div`
  position: relative;
`

const Content = styled.div`
  position: relative;
  cursor: pointer;
`

const SelectLabel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  background-color: #1890ff;
  opacity: 0.8;
  border-radius: 4px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
`

const AddButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  font-size: 18px;
  color: #999;
`
const TopButton = styled(AddButton)`
  top: 0;
  transform: translate(-50%, -50%);
  z-index: 9;
  left: 50%;
`
const BottomButton = styled(AddButton)`
  bottom: 0;
  transform: translate(-50%, 50%);
  z-index: 9;
  left: 50%;
`

function Wrap({ component, addComponentOver, addComponentUnder, children, style = {} }) {

  const [showButton, setShowButton] = useState(false)
  const currentSelectComponent = useGetCurrentSelectComponent()

  const mouseEnter = useCallback(() => {
    setShowButton(true)
  }, [])

  const mouseLeave = useCallback(() => {
    setShowButton(false)
  }, [])

  return (
    <Container>
      <Content onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} style={style}>
        {showButton ? <TopButton onClick={() => addComponentOver(component)}>+</TopButton> : null}
        {children}
        {showButton ? <BottomButton onClick={() => addComponentUnder(component)}>+</BottomButton> : null}
      </Content>
      {currentSelectComponent && currentSelectComponent.key === component.key && <SelectLabel><CheckOutlined /></SelectLabel>}
    </Container>
  )
}

export default Wrap