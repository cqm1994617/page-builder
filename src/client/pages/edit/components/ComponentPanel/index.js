import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { selectComponent, cleanEmpty } from '@/client/actions/componentList'
import { setComponentPanelVisible } from '@/client/actions/componentPanel'
import componentList from '@/component-list/componentList'

const Panel = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
`
const PanelContainer = styled.div`
  width: 400px;
  height: 100%;
  position: relative;
  z-index: 999;
  background-color: #fff;
  box-shadow: 3px 0 16px rgba(0, 0, 0, 0.06);
`
const HeaderTitle = styled.div`
  box-sizing: border-box;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > h3 {
    font-size: 14px;
  }
  & > span {
    color: #999;
    padding: 10px 10px 10px 15px;
    margin-right: -10px;
    cursor: pointer;
    :hover {
      color: #ccc;
    }
  }
`
const Mask = styled.div`
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.1);
`
const List = styled.div`
  display: flex;
  box-sizing: border-box;
  padding-left: 20px;
`

const TagList = styled.div`
  width: 90px;
`

const TagItem = styled.div`
  height: 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
  & > div {
    padding: 5px 10px;
    color: ${props => props.isActive ? '#fff' : '#666'};
    background: ${props => props.isActive ? '#1890ff' : '#fff'};
    border-radius: 4px;
  }
`

const ComponentSelect = styled.div`
  margin: 0 25px;
`
const ComponentItem = styled.div`
  cursor: pointer;
  & > img {
    display: block;
    width: 100%;
    transition: 0.2s all;
    &:hover {
      transform: scale(1.05)
    }
  }
  & > div {
    margin-top: 10px;
    color: #666;
    font-size: 14px;
  }
`

function ComponentPanel() {

  const dispatch = useDispatch()
  const [selectItem, setSelectItem] = useState(componentList[0])

  // const addBanner = () => {
  //   dispatch(
  //     selectComponent({
  //       type: 'banner',
  //       key: uuidv4(),
  //       props: {
  //         bannerList: [
  //           {
  //             id: uuidv4(),
  //             imgUrl: 'http://qiniu.xingheaoyou.com/1.jpg',
  //             to: 'https://www.baidu.com'
  //           },
  //           {
  //             id: uuidv4(),
  //             imgUrl: 'http://qiniu.xingheaoyou.com/2.jpg',
  //             to: 'https://www.taobao.com'
  //           }
  //         ],
  //         height: 200
  //       }
  //     })
  //   )
  // }

  const closePanel = () => {
    dispatch(setComponentPanelVisible(false))
    dispatch(cleanEmpty())
  }

  const selectTagList = (item) => {
    setSelectItem(item)
  }

  const componentConfirm = (item) => () => {

    dispatch(
      selectComponent({
        type: item.componentType,
        key: uuidv4(),
        props: {
          ...item.defaultProps
        }
      })
    )
  }

  return (
    <Panel>
      <PanelContainer>
        <HeaderTitle>
          <h3>添加组件</h3>

          <span>
            <CloseOutlined onClick={closePanel} />
          </span>
        </HeaderTitle>
        {/* <Button onClick={addBanner}>添加Banner</Button> */}
        <List>
          <TagList>
            {
              componentList.map(item => (
                <TagItem onClick={() => selectTagList(item)} isActive={item.id === selectItem.id} key={item.id}>
                  <div>{item.name}</div>
                </TagItem>
              ))
            }
          </TagList>
          <ComponentSelect>
            {
              selectItem.children.map(item => (
                <ComponentItem key={item.id} onClick={componentConfirm(item)}>
                  <img src={item.imgUrl} />
                  <div>{item.name}</div>
                </ComponentItem>
              ))
            }
          </ComponentSelect>
        </List>
      </PanelContainer>
      <Mask onClick={closePanel} />
    </Panel>
  )
}

export default ComponentPanel
