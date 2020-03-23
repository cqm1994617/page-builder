import React from 'react'
import styled from 'styled-components'
import { CloseOutlined } from '@ant-design/icons'


const Panel = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 300px;
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

function ComponentList() {

  return (
    <Panel>
      <HeaderTitle>
        <h3>添加组件</h3>
        <span>
          <CloseOutlined />
        </span>
      </HeaderTitle>
    </Panel>
  )
}

export default ComponentList
