import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const Page = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Block = styled.div`
  width: 200px;
  height: 200px;
  background-color: #1890ff;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: 0.3s all;
  &:hover {
    transform: scale(1.1);
  }
`

function Home() {

  const history = useHistory()

  const toEdit = () => {
    history.push('/edit')
  }

  return (
    <Page>
      <Block onClick={toEdit}>
        默认模式
      </Block>
    </Page>
  )
}

export default Home
