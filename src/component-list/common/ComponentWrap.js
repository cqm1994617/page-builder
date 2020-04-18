import React, { useState, useCallback } from 'react'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  cursor: pointer;
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
  z-index: 99;
  left: 50%;
`
const BottomButton = styled(AddButton)`
  bottom: 0;
  transform: translate(-50%, 50%);
  z-index: 99;
  left: 50%;
`

function Wrap({ component, addComponentOver, addComponentUnder, children, style = {} }) {

  const [showButton, setShowButton] = useState(false)

  const mouseEnter = useCallback(() => {
    setShowButton(true)
  }, [])

  const mouseLeave = useCallback(() => {
    setShowButton(false)
  }, [])

  return (
    <Container onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} style={style}>
      {showButton ? <TopButton onClick={() => addComponentOver(component)}>+</TopButton> : null}
      {children}
      {showButton ? <BottomButton onClick={() => addComponentUnder(component)}>+</BottomButton> : null}
    </Container>
  )
}

export default Wrap