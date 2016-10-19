import React, { Component } from 'react'
import { Icon } from 'react-fa'

export default class File extends Component {
  render() {
    let { name } = this.props

    return (
      <div className='name-container'>
        <Icon name='file-o' />
        <span>{name}</span>
      </div>
    )
  }
}
