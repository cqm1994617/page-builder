import React from 'react'
import styled from 'styled-components'

const ImageContent = styled.div `
  background: url(${props => props.imgUrl});
  background-size: cover;
  width: 100%;
  height: ${props => props.imgHeight || 200}px;
`

const modeMap = {
  
}

function Image({onClick, height, imgUrl}) {

  return <div onClick={onClick}>
    <ImageContent 
      imgUrl={imgUrl} 
      imgHeight={height}
    />
  </div>
}

export default Image
