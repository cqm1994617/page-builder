import React from 'react'
import { Modal } from 'antd'

function PackageModal({ publishModalShow, hidePublishModal }) {

  return (
    <Modal
      visible={publishModalShow}
      onCancel={hidePublishModal}
      onOk={hidePublishModal}
    >
      <div>
        {(() => {
          if (publishStatus === 1) {
            return '未开始'
          }
          if (publishStatus === 2) {
            return '打包中'
          }
          if (publishStatus === 3) {
            return '打包完成'
          }
        })()}
      </div>
    </Modal>
  )

}

export default PackageModal
