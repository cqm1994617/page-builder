import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 15px;
  & > label {
    cursor: pointer;
    display: block;
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 5px 15px;
    background-color: #fff;
    flex: none;
  }
  & > span {
    text-overflow: ellipsis;
    flex: none;
    margin-left: 10px;
  }
`

function CustomUpload({ onChange, imgName }) {

  const upload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.addEventListener('load', () => {
      if (file.size < 2048000) {
        onChange({
          url: reader.result,
          imgName: file.name
        })
      } else {
        message.info('图片大小不得超过2M')
      }
    })
  }

  return (
    <Container>
      <label htmlFor="files">
        上传图片
      </label>
      <span>{imgName || ''}</span>
      <input id="files" style={{ visibility: 'hidden' }} type="file" onChange={upload} accept=".jpg,.png,.jpeg,.gif" />
    </Container>
  )
}

export default CustomUpload
