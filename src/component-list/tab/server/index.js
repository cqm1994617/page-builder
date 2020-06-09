import React, { useState, useMemo } from 'react'
import styled from 'styled-components'

const TabBar = styled.div`
  position: relative;
  display: flex;
  border-bottom: 1px solid #eee;
`
const TabBarItem = styled.div`
  position: relative;
  height: 40px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`
const TabBarActive = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 40px;
  height: 2px;
  background-color: #1890ff;
`
const TabContent = styled.div`

`
const ListItem = styled.div`
  display: flex;
  box-sizing: border-box;
  margin-left: 15px;
  padding: 15px 15px 15px 0;
  border-bottom: 1px solid #eee;
  &:last-of-type {
    margin-left: 0;
    padding-left: 15px;
  }
`
const ListImage = styled.img`
  flex: none;
  width: 70px;
  height: 70px;
`
const ListContent = styled.div`
  flex: 1;
  overflow: hidden;
  margin-left: 10px;
  & > h3 {
    font-weight: 500;
    color: #111;
    margin-bottom: 0;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & > div {
    font-size: 14px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`

function Tab({ tabList }) {

  const [activeIndex, setActiveIndex] = useState(
    tabList && tabList[0] ? tabList[0].id : null
  )

  const activeContent = useMemo(() => {
    return tabList.filter(item => item.id === activeIndex)[0].tabContent
  }, [tabList, activeIndex])

  const changeTab = (id) => () => {
    setActiveIndex(id)
  }

  const to = (item) => () => {
    window.location.href = item.redirectUrl
  }

  return (
    <div>
      <TabBar>
        {
          tabList && tabList.map(item =>
            <TabBarItem onClick={changeTab(item.id)} key={item.id}>
              {item.tabName}
              {item.id === activeIndex && <TabBarActive />}
            </TabBarItem>
          )
        }
      </TabBar>
      <TabContent>
        {
          activeContent.map(item => {
            return (
              <ListItem key={item.id} onClick={to(item)}>
                <ListImage src={item.imgUrl} />
                <ListContent>
                  <h3>{item.title}</h3>
                  <div>{item.content}</div>
                </ListContent>
              </ListItem>
            )
          })
        }
      </TabContent>
    </div>
  )
}

export default Tab
