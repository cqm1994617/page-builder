import React from 'react'
import CustomHeader from './components/CustomHeader'
import styled from 'styled-components'
import ComponentList from './components/ComponentList'
import SandBox from './components/SandBox'
import EditPanel from './components/EditPanel'

const Page = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  & > div {
    min-width: 1200px;
    height: 100%;
  }
`

const MainContent = styled.div`
  overflow: hidden;
  position: relative;
  min-width: 1200px;
  height: calc(100% - 65px);
  background-color: #f5f5f7;
`

function Edit() {
  return (
    <Page>
      <div>
        <CustomHeader />
        <MainContent>
          <ComponentList />
          <SandBox />
          <EditPanel />
        </MainContent>
      </div>
    </Page>
  )

}

export default Edit
