import React from 'react'

function Image({onClick, imgUrl}) {
  return <div onClick={onClick}>
    <img src={imgUrl} />
  </div>
}

export default Image
