import React from 'react'
import styled from 'styled-components'
import Banner from '../../../../../component-list/banner/display/index'

const Viewer = styled.div`
  position: relative;
  margin: 40px auto 0;
  width: 375px;
  min-height: 667px;
  background-color: #fff;
  overflow: hidden;
`

function SandBox({componentList}) {
  return (
    <Viewer>
      {
        componentList.map((item, index) => {
          return <Banner key={index} {...item.props} />
        })
      }
    </Viewer>
  )
}

export default SandBox
