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

const Download = styled.a `
  display: block;
  margin: 20px 0;
`

function PackageModal({ publishModalShow, hidePublishModal, publishStatus, resultFile }) {



  return (
    <Modal
      visible={publishModalShow}
      onCancel={hidePublishModal}
      onOk={hidePublishModal}
      width={800}
      maskClosable={false}
    >
      <Command>
        {
          publishStatus.map((item, index) => <div key={index}>{item.text}</div>)
        }
      </Command>
      {resultFile.path && <Download href={resultFile.path}>下载 {resultFile.folderId}.zip</Download>}
    </Modal>
  )

}

export default PackageModal
