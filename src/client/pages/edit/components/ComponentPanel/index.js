import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { selectComponent, cleanEmpty } from '@/client/actions/componentList'
import { setComponentPanelVisible } from '@/client/actions/componentPanel'

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
  z-index: 9;
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
  z-index: 2;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.1);
`

function ComponentList() {

  const dispatch = useDispatch()

  const addBanner = () => {
    dispatch(
      selectComponent({
        type: 'banner',
        key: uuidv4(),
        props: {
          bannerList: [
            {
              id: uuidv4(),
              imgUrl: 'http://qiniu.xingheaoyou.com/1.jpg',
              to: 'https://www.baidu.com'
            },
            {
              id: uuidv4(),
              imgUrl: 'http://qiniu.xingheaoyou.com/2.jpg',
              to: 'https://www.taobao.com'
            }
          ],
          height: 200
        }
      })
    )
  }

  const closePanel = () => {
    dispatch(setComponentPanelVisible(false))
    dispatch(cleanEmpty())
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
        <Button onClick={addBanner}>添加Banner</Button>
      </PanelContainer>
      <Mask onClick={closePanel} />
    </Panel>
  )
}

export default ComponentList
