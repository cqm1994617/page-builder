import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 20px 15px;
`
const Title = styled.div`
  padding: 0px 15px 10px;
  font-size: 18px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    display: block;
    left: 5px;
    top: 5px;
    height: 18px;
    width: 4px;
    background-color: #1890ff;
  }
`
const Content = styled.div `
  & > p {
    white-space: pre-wrap;
    margin-bottom: 0;
  }
`

function Paragraph({ title, content, onClick }) {

  return (
    <Container onClick={onClick}>
      <Title>{title}</Title>
      <Content dangerouslySetInnerHTML={{ __html: content }}></Content>
    </Container>
  )
}

export default Paragraph