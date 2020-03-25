import React from 'react'
import styled from 'styled-components'

const Viewer = styled.div`
  margin: 40px auto 0;
  width: 375px;
  min-height: 667px;
  background-color: #fff;
`

function Tab() {
  return <div>Tab</div>
}

function Banner() {
  return <div>Banner</div>
}

const componentList = [
  {
    id: 0,
    componentName: 'Tab',
    
  },
  {
    id: 1,
    componentName: 'Banner'
  }
]

const componentMap = {
  Tab: <Tab />,
  Banner: <Banner />,
}

function SandBox() {
  return (
    <Viewer>
      {
        componentList.map(item => {
          return componentMap[item.componentName]
        })
      }
    </Viewer>
  )
}

export default SandBox
