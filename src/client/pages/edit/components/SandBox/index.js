import React from 'react'
import styled from 'styled-components'
import {BannerClient as Banner} from '@/component-list/banner'

const Viewer = styled.div`
  position: relative;
  margin: 40px auto 0;
  width: 375px;
  min-height: 667px;
  background-color: #fff;
  overflow: hidden;
`

const componentMap = {
  'Banner': (props, select, index) => <Banner key={index} onClick={select} {...props} />
}

function SandBox({componentList, setSelectComponent}) {

  const select = (e) => {
    console.log(e)
    setSelectComponent(e)
  }

  return (
    <Viewer>
      {
        componentList.map((item, index) => {
          return componentMap[item.name](item.props, () => select(item), index)
        })
      }
    </Viewer>
  )
}

export default SandBox
