import React, { useEffect } from 'react'
import styled from 'styled-components'

const TabBar = styled.div`
  
`
const TabBarItem = styled.div`

`

function Tab({ onClick, tabList }) {

  const [activeIndex, setActiveIndex] = useState(
    tabList && tabList[0] ? tabList[0].id : null
  )

  return (
    <div>
      <TabBar>
        {
          tabList.map(item => <TarBarItem key={item.id}></TarBarItem>)
        }
      </TabBar>
      <TabContent>
        
      </TabContent>
    </div>
  )
}

export default Tab
