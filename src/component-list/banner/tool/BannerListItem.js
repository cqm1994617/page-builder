import React, { useState } from 'react'
import styled from 'styled-components'
import {Input} from 'antd'

const BannerItem = styled.div`
  margin-bottom: 10px;
`
const BannerItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
`
const BannerItemUrl = styled.div`
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
const BannerItemEdit = styled.div`
  display: flex;
  & > div {
    margin-left: 5px;
    color: #1890ff;
    font-size: 14px;
    flex: none;
    text-align: right;
    cursor: pointer;
  }
`
const BannerItemPanel = styled.div`
  margin-top: 10px;
  padding: 10px 15px;
  box-sizing: border-box;
  background-color: #f6f6f6;
  & > div {
    margin-bottom: 15px;
  }
`
const BannerItemTitle = styled.div`
  margin-bottom: 5px;
`

function BannerListItem({ index, bannerItem, changeImgUrl, changeTo, deleteBannerItem }) {

  const [showDetail, setShowDetail] = useState(!(bannerItem.imgUrl && bannerItem.to))

  return <BannerItem>
    <BannerItemHeader>
      <BannerItemUrl>项{index + 1}. {bannerItem.imgUrl || '暂无'}</BannerItemUrl>
      <BannerItemEdit>
        <div onClick={() => setShowDetail(!showDetail)}>{showDetail ? '收起' : '编辑'}</div>
        <div onClick={() => deleteBannerItem(bannerItem.id)}>删除</div>
      </BannerItemEdit>
    </BannerItemHeader>
    {
      showDetail && <BannerItemPanel>
        <div>
          <BannerItemTitle>图片链接</BannerItemTitle>
          <div>
            <Input value={bannerItem.imgUrl} onChange={(e) => changeImgUrl(e, bannerItem.id)} />
          </div>
        </div>
        <div>
          <BannerItemTitle>跳转链接</BannerItemTitle>
          <div>
            <Input value={bannerItem.to} onChange={(e) => changeTo(e, bannerItem.id)} />
          </div>
        </div>
      </BannerItemPanel>
    }
  </BannerItem>
}

export default BannerListItem
