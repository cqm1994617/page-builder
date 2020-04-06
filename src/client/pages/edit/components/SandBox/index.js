import React from 'react'
import styled from 'styled-components'
import { BannerClient as Banner } from '@/component-list/banner'
import Wrap from '@/component-list/common/ComponentWrap'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentSelectComponent } from '@/client/actions/currentSelectComponent'
import { useGetComponentList } from '@/client/hooks'

const Viewer = styled.div`
  position: relative;
  margin: 40px auto 0;
  width: 375px;
  height: 667px;
  background-color: #fff;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 3px;
    background: rgba(0,0,0,0.06);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(0,0,0,0.12);
  }

`

const componentMap = {
  'Banner': (props, select) => <Banner onClick={select} {...props} />
}

function SandBox() {

  const dispatch = useDispatch()
  const componentList = useGetComponentList()
  
  const select = (key) => {
    dispatch(setCurrentSelectComponent(key))
  }

  return (
    <Viewer>
      {
        componentList.map((item) => {
          return <Wrap key={item.key} addComponentOver={() => console.log('over')} addComponentUnder={() => console.log('under')}>
            {componentMap[item.name](item.props, () => select(item.key))}
          </Wrap>
        })
      }
    </Viewer>
  )
}

export default SandBox
