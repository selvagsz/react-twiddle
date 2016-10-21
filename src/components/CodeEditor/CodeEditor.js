import React, { Component } from 'react'
import Codemirror from 'react-codemirror'
import { observer } from 'mobx-react'
import { getFileMode } from 'utils/fsUtils'

let defaultOptions = {
  lineNumbers: true
}

@observer
export default class CodeEditor extends Component {
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
          options={options}
        />
      </div>
    )
  }
}
