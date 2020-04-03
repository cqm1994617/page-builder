import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'

const Panel = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 400px;
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

function ComponentList({ componentList, setComponentList }) {

  const store = useSelector(state => state)
  const dispatch = useDispatch()

  const addBanner = () => {
    setComponentList(componentList.concat([{
      name: 'Banner',
      key: uuidv4(),
      props: {
        bannerList: [
          {
            imgUrl: 'http://qiniu.xingheaoyou.com/1.jpg',
            to: 'https://www.baidu.com'
          },
          {
            imgUrl: 'http://qiniu.xingheaoyou.com/2.jpg',
            to: 'https://www.taobao.com'
          }
        ],
        height: '200px'
      }
    }]))
  }



  const test = () => {

    dispatch({type: 'COMPONENT_LIST/SET_COMPONENT_LIST', payload: [1,2,3]})

    const res = [{
      name: 'Banner',
      key: uuidv4(),
      props: {
        bannerList: [
          {
            imgUrl: 'http://qiniu.xingheaoyou.com/3.jpg',
            to: 'https://www.baidu.com'
          },
          {
            imgUrl: 'http://qiniu.xingheaoyou.com/3.jpg',
            to: 'https://www.taobao.com'
          }
        ],
        height: '200px'
      }
    }].concat(componentList.slice(1))

    setComponentList(res)
  }

  console.log('store', store)


  return (
    <Panel>
      <HeaderTitle>
        <h3>添加组件</h3>
        <span>
          <CloseOutlined />
        </span>
      </HeaderTitle>
      <Button onClick={addBanner}>添加Banner</Button>
      <Button onClick={test}>测试</Button>
    </Panel>
  )
}

export default ComponentList
