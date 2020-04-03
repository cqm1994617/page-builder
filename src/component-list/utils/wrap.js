import React, { useState, useCallback } from 'react'
import styled from 'styled-components'

const Container = styled.div `
  position: relative;
  cursor: pointer;
`
const AddButton = styled.div `
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  font-size: 18px;
  color: #999;
`
const TopButton = styled(AddButton) `
  top: 0;
  transform: translate(-50%, -50%);
  z-index: 99;
`
const BottomButton = styled(AddButton) `
  bottom: 0;
  transform: translate(-50%, 50%);
  z-index: 99;
`

function Wrap({addComponentOver, addComponentUnder, children}) {

  const [showButton, setShowButton] = useState(false)

  const mouseEnter = useCallback(() => {
    setShowButton(true)
  }, [])

  const mouseLeave = useCallback(() => {
    setShowButton(false)
  }, [])

  return (
    <Container onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      {showButton ? <TopButton>+</TopButton> : null}
      {children}
      {showButton ? <BottomButton>+</BottomButton> : null}
    </Container>
  )
}

export default Wrap