import React, { useState } from 'react'
import { Input, Form, Radio, Modal } from 'antd'
import CustomUpload from '@/component-list/common/CustomUpload'
import PathSelect from '@/component-list/common/PathSelect'
import styled from 'styled-components'

const EditText = styled.div`
  color: #1890ff;
  cursor: pointer;
`
const Tips = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
`
const TabItemTitle = styled.div`

`
const RadioBar = styled.div`
  margin: 10px 0;
`
const RemoveItemText = styled(EditText)`
  margin-top: 20px;
  margin-bottom: 40px;
  width: 80px;
`
const PreviewImage = styled.div `
  cursor: pointer;
  width: 100px;
  height: 100px;
  background: url(${props => props.imgUrl}) no-repeat;
  background-size: cover;
  background-position: center;
  margin-bottom: 30px;
`

function TabContentItem({ removeTabContent, contentItem, tabItem, changeTabContent }) {

  const [urlType, setUrlType] = useState(1)
  const [imgType, setImgType] = useState(1)
  const [imgUrl, setImgUrl] = useState(contentItem.imgUrl)
  const [imgName, setImgName] = useState('')

  const selectPath = (e) => {
    changeTabContent('redirectUrl', tabItem.id, contentItem.id)({
      target: {
        value: `./${e.path}.html`
      }
    })
  }

  const upload = (e) => {
    changeTabContent('imgUrl', tabItem.id, contentItem.id)({
      target: {
        value: e.url
      }
    })
    setImgName(e.imgName)
    setImgUrl(e.url)
  }

  const removeItem = () => {
    Modal.confirm({
      title: '确认删除此项?',
      onOk() {
        removeTabContent(tabItem.id, contentItem.id)
      }
    })
  }

  return (
    <div key={contentItem.id}>
      <Form.Item label="标题">
        <Input onChange={changeTabContent('title', tabItem.id, contentItem.id)} value={contentItem.title} />
      </Form.Item>
      <Form.Item label="内容">
        <Input onChange={changeTabContent('content', tabItem.id, contentItem.id)} value={contentItem.content} />
      </Form.Item>
      <TabItemTitle>封面图片</TabItemTitle>
      <RadioBar>
        <Radio.Group value={imgType} onChange={(e) => setImgType(e.target.value)}>
          <Radio value={1}>输入图片链接</Radio>
          <Radio value={2}>上传本地图片</Radio>
        </Radio.Group>
      </RadioBar>
      {
        imgType === 1 && <Form.Item label="图片URL">
          <Input style={{ width: '300px' }} placeholder="标题" onChange={(e) => setImgUrl(e.target.value)} value={imgUrl} />
        </Form.Item>
      }
      {
        imgType === 2 && <>
          <Tips>大小不得超过2M</Tips>
          <CustomUpload onChange={upload} imgName={imgName} />
        </>
      }
      <PreviewImage imgUrl={imgUrl} />
      <TabItemTitle>跳转链接</TabItemTitle>
      <RadioBar>
        <Radio.Group value={urlType} onChange={(e) => setUrlType(e.target.value)}>
          <Radio value={1}>外部链接</Radio>
          <Radio value={2}>本站页面</Radio>
        </Radio.Group>
      </RadioBar>
      {
        urlType === 1 ? <Input value={contentItem.redirectUrl} onChange={changeTabContent('redirectUrl', tabItem.id, contentItem.id)} /> :
          <PathSelect onChange={selectPath}></PathSelect>
      }
      <RemoveItemText onClick={removeItem}>删除此项</RemoveItemText>
    </div>
  )
}

export default TabContentItem
