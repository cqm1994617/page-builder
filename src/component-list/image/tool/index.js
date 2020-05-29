import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Form, Input, Button, message, Radio, Modal } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import PositionMove from '@/component-list/common/PositionMove'
import { editComponent, deleteComponent } from '@/client/actions/componentList'
import { setCurrentSelectComponent } from '@/client/actions/currentSelectComponent'
import ToolContainer from '@/component-list/common/ToolContainer'
import { useGetComponentList, useGetCurrentSelectComponent, useDeleteCurrentComponent } from '@/client/hooks'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

const RadioGroup = styled.div`
  margin-bottom: 20px;
`
const Tips = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
`
const CustomUpload = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 15px;
  & > label {
    cursor: pointer;
    display: block;
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 5px 15px;
    flex: none;
  }
  & > span {
    text-overflow: ellipsis;
    flex: none;
    margin-left: 10px;
  }
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
const DetailImage = styled.img `
  width: 400px;
  height: auto;
`

function Tool() {

  const dispatch = useDispatch()
  const componentList = useGetComponentList()
  const currentSelectComponent = useGetCurrentSelectComponent()
  const deleteCurrentComponent = useDeleteCurrentComponent()

  const [imgUrl, setImgUrl] = useState(currentSelectComponent.props.imgUrl)
  const [imgName, setImgName] = useState('')
  const [previewVisible, setPreviewVisible] = useState(false)
  const [imgType, setImgType] = useState(1)
  const [height, setHeight] = useState(currentSelectComponent.props.height)

  const submit = () => {
    const newKey = uuidv4()

    dispatch(editComponent({
      type: 'image',
      key: newKey,
      props: {
        imgUrl,
        height
      }
    }))
    dispatch(setCurrentSelectComponent(newKey))
  }

  const upload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.addEventListener('load', () => {
      if (file.size < 2048000) {
        setImgUrl(reader.result)
        setImgName(file.name)
      } else {
        message.info('图片大小不得超过2M')
      }
    })
  }

  return (
    <ToolContainer>
      <Form>
        <Form.Item label="图片高度">
          <Input style={{ width: '300px' }} placeholder="高度" onChange={(e) => setHeight(e.target.value)} value={height} />
        </Form.Item>
        <RadioGroup>
          <Radio.Group value={imgType} onChange={(e) => setImgType(e.target.value)}>
            <Radio value={1}>输入图片链接</Radio>
            <Radio value={2}>上传本地图片</Radio>
          </Radio.Group>
        </RadioGroup>
        {
          imgType === 1 && <Form.Item label="图片URL">
            <Input style={{ width: '300px' }} placeholder="标题" onChange={(e) => setImgUrl(e.target.value)} value={imgUrl} />
          </Form.Item>
        }
        {
          imgType === 2 && <>
            <Tips>大小不得超过2M</Tips>
            <CustomUpload>
              <label htmlFor="files">
                上传图片
              </label>
              <span>{imgName}</span>
              <input id="files" style={{ visibility: 'hidden' }} type="file" onChange={upload} accept=".jpg,.png,.jpeg,.gif" />
            </CustomUpload>
          </>
        }
        <PreviewImage onClick={() => setPreviewVisible(true)} imgUrl={imgUrl} />
        <PositionMove component={currentSelectComponent} componentList={componentList} />
        <Form.Item style={{ marginTop: '40px' }}>
          <Button type="primary" onClick={submit}>确认</Button>
          <Button type="danger" style={{ marginLeft: '20px' }} onClick={deleteCurrentComponent}>删除</Button>
        </Form.Item>
      </Form>

      <Modal
        visible={previewVisible}
        onOk={() => setPreviewVisible(false)}
        onCancel={() => setPreviewVisible(false)}
      >
        <DetailImage src={imgUrl} />
      </Modal>
    </ToolContainer>
  )

}

export default Tool
