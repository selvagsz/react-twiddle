import React, { Component } from 'react'
import Codemirror from 'react-codemirror'
import { observer } from 'mobx-react'

@observer
export default class OutputFrame extends Component {
  render() {
    return (
      <div className='output-frame-container'>
        <div>
          <button className='pull-right' onClick={this.props.onRun}>Run</button>
        </div>
        <iframe
          className='output-frame'
          sandbox='allow-forms allow-modals allow-scripts'
          srcDoc={this.props.output}>
        </iframe>
      </div>
    )
  }
}
