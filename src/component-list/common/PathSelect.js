import React from 'react'
import { Select } from 'antd'
import { useSelector } from 'react-redux'

const { Option } = Select

function PathSelect() {

  const pageList = useSelector(state => state.pageListReducer)
  const currentPage = useSelector(state => state.currentSelectPageReducer)

  console.log(currentPage)

  return (
    <div>
      <Select style={{ width: '100%' }} placeholder="请选择...">
        {
          pageList.map(item => {
            const isCurrent = currentPage === item.id
            return <Option key={item.id} disabled={isCurrent}>{item.title}{isCurrent ? '(当前页)' : ''}</Option>
          })
        }
      </Select>
    </div>
  )
}

export default PathSelect
