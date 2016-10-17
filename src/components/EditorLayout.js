import React from 'react'
import FileTree from './FileTree'

export default (props) => (
  <div className='editor-container'>
    <div className='editor-item folder-tree'>
      <FileTree />
    </div>

    <div className='editor-item code-editor'>
    </div>

    <div className='editor-item code-editor'>
    </div>

    <div className='editor-item output'>
    </div>
  </div>
)
