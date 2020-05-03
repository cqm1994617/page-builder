import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 20px 15px;
`
const Title = styled.div`
  padding: 10px 15px;
  font-size: 18px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    display: block;
    left: 5px;
    top: 15px;
    height: 18px;
    width: 4px;
    background-color: #1890ff;
  }
`

function Paragraph({ title, content, onClick }) {

  return (
    <Container onClick={onClick}>
      <Title>{title}</Title>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Container>
  )
}

export default Paragraph