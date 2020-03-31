import React from 'react'

function Wrap(props) {

  return (
    <div onClick={props.onClick}>
      {props.children(props)}
    </div>
  )
}