import React, { Component } from 'react'
import { Icon } from 'react-fa'

export default class File extends Component {
  render() {
    let { name } = this.props

    return (
      <div className='name-container'>
        <span className='folder-actions pull-right'>
          <Icon name='trash-o' onClick={this.props.onDeleteFile} />
        </span>

        <Icon name='file-o' />
        <span>{name}</span>
      </div>
    )
  }
}
