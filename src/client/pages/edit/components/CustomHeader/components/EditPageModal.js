import React from 'react'
import { Modal, Form, Input } from 'antd'

function EditPageModal({ editPageModalShow, hideEditPageModal, editPageModalSubmit, editPageInfo, inputEditPageInfo }) {

  return (
    <Modal
      visible={editPageModalShow}
      onCancel={hideEditPageModal}
      onOk={editPageModalSubmit}
    >
      <Form style={{ marginTop: '30px' }}>
        <Form.Item label="页面标题">
          <Input
            style={{ width: '400px' }}
            value={editPageInfo.title}
            onChange={inputEditPageInfo('title')}
          />
        </Form.Item>
        <Form.Item label="页面路径" extra={<div>页面路径只能包含字母、数字、下划线</div>}>
          <Input style={{ width: '400px' }} value={editPageInfo.path} onChange={inputEditPageInfo('path')} suffix=".html" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditPageModal
