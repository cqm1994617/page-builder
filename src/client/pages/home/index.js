import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const Page = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Content = styled.div `
  width: 1000px;
  background-color: #fff;
`


function Home() {

  const history = useHistory()

  const toEdit = () => {
    history.push('/edit')
  }

  return (
    <Page>
      <Content></Content>
    </Page>
  )
}

export default Home
