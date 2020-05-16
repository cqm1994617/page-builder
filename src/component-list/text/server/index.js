import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 20px 15px;
  font-size: 14px;
  color: #333;
`

function Text({ content }) {

  return (
    <Container>
      <div>{content}</div>
    </Container>
  )
}

export default Text