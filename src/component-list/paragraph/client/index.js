import React from 'react'

function Paragraph({ title, content, onClick }) {

  return (
    <div onClick={onClick}>
      <div>{title}</div>
      <div>{content}</div>
    </div>
  )
}

export default Paragraph