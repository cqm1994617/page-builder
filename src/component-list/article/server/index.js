import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 20px 15px;
  font-size: 14px;
  color: #333;
`

const Title = styled.div`
  font-weight: 500;
  color: #333;
  font-size: 18px;
`
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`
const Author = styled.div `
  color: #333;
  font-size: 12px;
`
const DateStr = styled.div `
  color: #999;
  font-size: 12px;
`
const Content = styled.div `
  margin-top: 30px;
  & > p {
    white-space: pre-wrap;
    margin-bottom: 0;
  }
`

function Article({ title, author, dateStr, content }) {

  return (
    <Container>
      <Title>{title}</Title>
      <Info>
        <Author>{author}</Author>
        <DateStr>{dateStr}</DateStr>
      </Info>
      <Content dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  )
}

export default Article
