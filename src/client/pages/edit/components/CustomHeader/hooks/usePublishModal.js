import React, { useState } from 'react'

function usePublishModal() {
  const [publishModalShow, setPublishModalShow] = useState(false)
  /*
  * 1. 未开始
  * 2. 打包中
  * 3. 打包完成
  */
  const [publishStatus, setPublishStatus] = useState(1)

  const openPublishModal = () => {
    setPublishModalShow(true)
  }

  const hidePublishModal = () => {
    setPublishModalShow(false)
  }

  return {
    publishStatus,
    setPublishStatus,
    publishModalShow,
    openPublishModal,
    hidePublishModal
  }

}

export default usePublishModal
