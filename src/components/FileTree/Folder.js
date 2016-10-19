import React, { Component } from 'react'
import { Icon } from 'react-fa'
import { observer } from 'mobx-react'

@observer
export default class Folder extends Component {
  render() {
    let { name, isOpen } = this.props
    return (
      <div className='name-container'>
        {
          isOpen ? <Icon name='folder-open-o' /> : <Icon name='folder-o' />
        }
        <span>{name}</span>
      </div>
    )
  }
}
