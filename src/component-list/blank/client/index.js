import React from 'react'
import styled from 'styled-components'

const Container = styled.div `
  padding: 15px 0;
`

function Blank({onClick, height, backgroundColor}) {

  return (
    <Container onClick={onClick}>
      <div style={{height, backgroundColor}}></div>
    </Container>
  )
}

export default Blank
