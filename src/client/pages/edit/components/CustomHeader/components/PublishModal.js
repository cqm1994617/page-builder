import React from 'react'
import { Modal } from 'antd'
import styled from 'styled-components'

const Command = styled.div `
  margin-top: 20px;
  background-color: #111;
  color: #fff;
  padding: 15px;
  width: 700px;
  height: 400px;
  overflow: auto;
`

function PackageModal({ publishModalShow, hidePublishModal, publishStatus, filePath }) {

  return (
    <Modal
      visible={publishModalShow}
      onCancel={hidePublishModal}
      onOk={hidePublishModal}
      width={800}
    >
      <Command>
        {
          publishStatus.map((item, index) => <div key={index}>{item.text}</div>)
        }
      </Command>
      {filePath && <a href={filePath}>下载压缩包</a>}
    </Modal>
  )

}

export default PackageModal
