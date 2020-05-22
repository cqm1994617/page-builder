import React from 'react'
import { Modal, Form, Input } from 'antd'
import styled from 'styled-components'

const Content = styled.div `
  margin-top: 30px;
`

function CreateAppModal({visible, onCancel}) {

  const submit = () => {
    console.log('submit')
  }

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      onOk={submit}
    >
      <Content>
        <Form>
          <Form.Item label="应用名称">
            <Input />
          </Form.Item>
        </Form>
      </Content>
    </Modal>
  )

}

export default CreateAppModal
