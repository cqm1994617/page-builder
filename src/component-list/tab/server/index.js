import React, { useState } from 'react'
import styled from 'styled-components'

const TabBar = styled.div`
  display: flex;
`
const TabBarItem = styled.div`
  flex: 1;
`
const TabContent = styled.div `

`

function Tab({ tabList }) {

  const [activeIndex, setActiveIndex] = useState(
    tabList && tabList[0] ? tabList[0].id : null
  )

  return (
    <div >
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
