import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
`

function Cube() {

  const [number, setNumber] = useState(0)

  function add() {
    setNumber(number + 1)
  }

  return <Container onClick={add}>{number}</Container>

}

export default Cube
