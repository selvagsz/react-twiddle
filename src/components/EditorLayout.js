import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'

import CodeEditor from './CodeEditor'
import FileTree from './FileTree'

@inject(['editorManager'])
@observer
export default class EditorLayout extends Component {
  render() {
    let props = this.props
    return (
      <div className='editor-container'>
        <div className='editor-item folder-tree'>
          <FileTree />
        </div>

        <div className='editor-item code-editor'>
          <CodeEditor tab={props.editorManager.tab} />
        </div>

        <div className='editor-item output'>
        </div>
      </div>
    )
  }
}
