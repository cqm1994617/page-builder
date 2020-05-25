import React from 'react'
import { Modal, Form, Input } from 'antd'

function NewPageModal({ newPageModalShow, newPageInfo, hideNewPageModal, newPageModalSubmit, inputNewPageInfo }) {

  return (
    <Modal
      visible={newPageModalShow}
      onCancel={hideNewPageModal}
      onOk={newPageModalSubmit}
    >
      <Form style={{ marginTop: '30px' }}>
        <Form.Item label="页面标题">
          <Input
            style={{ width: '400px' }}
            value={newPageInfo.title}
            onChange={inputNewPageInfo('title')}
          />
        </Form.Item>
        <Form.Item label="页面路径" extra={<div>页面路径只能包含字母、数字、下划线</div>}>
          <Input style={{ width: '400px' }} value={newPageInfo.path} onChange={inputNewPageInfo('path')} suffix=".html" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default NewPageModal
