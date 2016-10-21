import React, { Component } from 'react'
import Codemirror from 'react-codemirror'
import { observer, inject } from 'mobx-react'
import { getFileMode } from 'utils/fsUtils'

let defaultOptions = {
  lineNumbers: true
}

@inject('fileStore')
@observer
export default class CodeEditor extends Component {
  constructor() {
    super(...arguments)
    this.updateFile = ::this.updateFile
  }

  updateFile(value) {
    this.props.fileStore.updateFile(this.props.tab.filePath, value)
  }

  render() {
    let { tab } = this.props
    let mode = getFileMode(tab.filePath)
    let options = Object.assign({}, defaultOptions, {
      mode
    })

    return (
      <div>
        <Codemirror
          value={tab.content}
          onChange={this.updateFile}
          options={options}
        />
      </div>
    )
  }
}
