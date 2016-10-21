import React, { Component } from 'react'
import { Icon } from 'react-fa'

export default class FileNode extends Component {
  render() {
    let { name } = this.props

    return (
      <div className='name-container' onClick={this.props.onOpenFile}>
        <span className='folder-actions pull-right'>
          <Icon name='trash-o' onClick={this.props.onDeleteFile} />
        </span>

        <Icon name='file-o' />
        <span>{name}</span>
      </div>
    )
  }
}
