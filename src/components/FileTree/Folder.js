import React, { Component } from 'react'
import { Icon } from 'react-fa'

export default class Folder extends Component {
  render() {
    let { name, isOpen } = this.props
    return (
      <div className='name-container'>
        {
          isOpen ? <Icon name='folder-o-closed' /> : <Icon name='folder-o' />
        }
        <span>{name}</span>
      </div>
    )
  }
}
