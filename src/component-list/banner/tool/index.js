import React, { useState, useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { editComponent } from '@/client/actions/componentList'
import { useGetComponentList, useGetCurrentSelectComponent } from '@/client/hooks'
import ToolContainer from '@/component-list/common/ToolContainer'
import BannerListItem from './BannerListItem'

function Tool() {

  const dispatch = useDispatch()
  const componentList = useGetComponentList()
  const currentSelect = useGetCurrentSelectComponent()

  const [height, setHeight] = useState(currentSelect.props.height)
  const [bannerList, setBannerList] = useState(currentSelect.props.bannerList)

  useEffect(() => {
    setHeight(currentSelect.props.height)
    setBannerList(currentSelect.props.bannerList)
  }, [currentSelect])

  const changeHeight = (e) => {
    setHeight(e.target.value)
  }
  const changeImgUrl = (e, id) => {
    const newList = bannerList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          imgUrl: e.target.value
        }
      }
      return item
    })
    setBannerList(newList)
  }
  const changeTo = (e, id) => {
    const newList = bannerList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          to: e.target.value
        }
      }
      return item
    })
    setBannerList(newList)
  }

  const addBanner = () => {

    const last = bannerList[bannerList.length - 1] || {}

    if (last.imgUrl && last.to) {

      const newList = bannerList.concat([{
        id: uuidv4(),
        imgUrl: '',
        to: ''
      }])

      setBannerList(newList)
    } else {
      message.info('上一添加项尚未完成')
    }
  }

  const deleteBannerItem = (id) => {
    if (bannerList.length > 1) {
      const list = bannerList.filter(item => item.id !== id)
      setBannerList(list)
    } else {
      message.info('已是最后一项，无法删除')
    }
  }


  const submit = () => {
    let newArr = [...componentList]

    let currentTarget = null

    newArr.forEach((item, index) => {
      if (item.key === currentSelect.key) {
        currentTarget = {
          name: 'Banner',
          key: uuidv4(),
          props: {
            bannerList,
            height
          }
        }
        newArr[index] = currentTarget
      }
    })
    dispatch(setComponentList(newArr))
  }

  return (
    <ToolContainer>
      <Form>
        {
          bannerList && bannerList.map(
            (item, index) =>
              <BannerListItem
                changeImgUrl={changeImgUrl}
                changeTo={changeTo}
                bannerItem={item}
                key={item.id}
                index={index}
                deleteBannerItem={deleteBannerItem}
              />
          )
        }
        <Form.Item>
          <Button type="default" onClick={addBanner}>新增修改项</Button>
        </Form.Item>
        <Form.Item label="高度(px)">
          <Input placeholder="高度" onChange={changeHeight} value={height} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={submit}>确认</Button>
        </Form.Item>
      </Form>
    </ToolContainer>
  )
}

export default Tool