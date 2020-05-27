import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, message } from 'antd'
import styled from 'styled-components'

const Content = styled.div`
  margin-top: 30px;
`

function EditAppModal({ visible, editAppInfo, closeModal, selectItem }) {

  const [formData, setFormData] = useState({
    name: '',
    desc: ''
  })

  useEffect(() => {
    setFormData({
      name: selectItem.name,
      desc: selectItem.desc
    })
  }, [selectItem])

  const changeValue = label => e => {
    setFormData({
      ...formData,
      [label]: e.target.value
    })
  }

  const _closeModal = () => {
    closeModal()
    setFormData({
      name: '',
      desc: ''
    })
  }

  const submit = () => {
    if (!formData.name) {
      return message.info('应用名称不得为空')
    }

    const result = editAppInfo({
      ...formData,
      id: selectItem.id
    })
    if (result) {
      _closeModal()
    }
  }

  const onCancel = () => {
    _closeModal()
  }


  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      onOk={submit}
    >
      <Content>
        <Form labelCol={{ span: 4 }}>
          <Form.Item label="应用名称" required>
            <Input value={formData.name} onChange={changeValue('name')} />
          </Form.Item>
          <Form.Item label="应用描述">
            <Input value={formData.desc} onChange={changeValue('desc')} />
          </Form.Item>
        </Form>
      </Content>
    </Modal>
  )

}

export default EditAppModal
