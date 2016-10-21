import React from 'react'
import Codemirror from 'react-codemirror'
import FileTree from './FileTree'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'

export default (props) => (
  <div className='editor-container'>
    <div className='editor-item folder-tree'>
      <FileTree />
    </div>

    <div className='editor-item code-editor'>
      <Codemirror
        value="function myScript() {
          return 100;
        }"
        options={
          {
            mode: 'javascript',
            lineNumbers: true,
            tabSize: 2,
          }
        }
      />
    </div>

    <div className='editor-item output'>
    </div>
  </div>
)
