import React, { useState } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Content = styled.div`
  margin-top: 30px;
`

function CreateAppModal({ visible, closeModal, addApp }) {

  const history = useHistory()
  const [formData, setFormData] = useState({
    name: '',
    desc: ''
  })

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
    const appId = addApp({
      name: formData.name,
      desc: formData.desc
    })
    if (appId) {
      _closeModal()

      setTimeout(() => {
        history.push(`/edit?appId=${appId}`)
      }, 500)
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

export default CreateAppModal
