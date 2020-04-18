import React from 'react'
import { Select } from 'antd'
import { useSelector } from 'react-redux'

const { Option } = Select

function PathSelect({ onChange }) {

  const pageList = useSelector(state => state.pageListReducer)
  const currentPage = useSelector(state => state.currentSelectPageReducer)

  const selectPage = (e) => {
    const page = pageList.find(item => item.id === e)
    if (onChange) {
      onChange(page)
    }
  }

  return (
    <div>
      <Select style={{ width: '100%' }} placeholder="请选择..." onChange={selectPage}>
        {
          pageList.map(item => {
            const isCurrent = currentPage === item.id
            return <Option key={item.id} disabled={isCurrent} value={item.id}>{item.title}{isCurrent ? '(当前页)' : ''}</Option>
          })
        }
      </Select>
    </div>
  )
}

export default PathSelect
