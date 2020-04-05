import React from 'react'
import styled from 'styled-components'

const Container = styled.div `
  box-sizing: border-box;
  padding: 15px;
`


function ToolContainer({children}) {

  return (
    <Container>
      {children}
    </Container>
  )
}

export default ToolContainer
