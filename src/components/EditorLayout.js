import React from 'react'
import Codemirror from 'react-codemirror'
import FileTree from './FileTree'

export default (props) => (
  <div className='editor-container'>
    <div className='editor-item folder-tree'>
      <FileTree />
    </div>

    <div className='editor-item code-editor'>
      <Codemirror options={
        {
          code: "console.log(\'React Twiddle\')",
          mode: 'javascript',
          lineNumbers: true,
          tabSize: 2
        }
      }/>
    </div>

    <div className='editor-item code-editor'>
      <Codemirror options={
        {
          code: "console.log(\'React Twiddle\')",
          mode: 'javascript',
          lineNumbers: true,
          tabSize: 2
        }
      }/>
    </div>

    <div className='editor-item output'>
    </div>
  </div>
)
