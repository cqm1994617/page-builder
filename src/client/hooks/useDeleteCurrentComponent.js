import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteComponent } from '@/client/actions/componentList'
import useGetCurrentSelectComponent from './useGetCurrentSelectComponent'
import { Modal } from 'antd'

function useDeleteCurrentComponent() {

  const dispatch = useDispatch()
  const currentSelectComponent = useGetCurrentSelectComponent()

  const remove = () => {
    Modal.confirm({
      content: '确认要删除当前组件？',
      onOk() {
        dispatch(
          deleteComponent(currentSelectComponent)
        )
      }
    })
  }

  return remove
}

export default useDeleteCurrentComponent
