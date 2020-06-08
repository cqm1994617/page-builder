import React, { useState } from 'react'
import styled from 'styled-components'

const TabBar = styled.div`
  display: flex;
  height: 40px;
`
const TabBarItem = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`
const TabContent = styled.div `

`

function Tab({ onClick, tabList }) {

  const [activeIndex, setActiveIndex] = useState(
    tabList && tabList[0] ? tabList[0].id : null
  )

  return (
    <div onClick={onClick}>
      <TabBar>
        {
          tabList && tabList.map(item => <TabBarItem key={item.id}>{item.tabName}</TabBarItem>)
        }
      </TabBar>
      <TabContent>

      </TabContent>
    </div>
  )
}

export default Tab
