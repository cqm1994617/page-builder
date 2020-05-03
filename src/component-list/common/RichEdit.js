import React, { useEffect, useState, useRef } from 'react'
import BraftEditor from 'braft-editor'
import styled from 'styled-components'
import 'braft-editor/dist/index.css'


const Container = styled.div`

`

function RichEdit({ html, onChange, height = '200px' }) {

  const [editorState, setEditorState] = useState(null)
  const controls = useRef([
    'bold', 'italic', 'underline', 'line-height', 'link', 'text-color', 'font-size', 'text-align', 'media'
  ])

  useEffect(() => {
    setEditorState(BraftEditor.createEditorState(html))
  }, [html])

  const changeValue = (editorState) => {
    setEditorState(editorState)
    onChange(editorState.toHTML())
  }

  return (
    <Container >
      <BraftEditor
        value={editorState}
        onChange={changeValue}
        controls={controls.current}
        contentStyle={{ height: '200px' }}
      />
    </Container>
  )

}

export default RichEdit
