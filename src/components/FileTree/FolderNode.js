import React, { Component } from 'react'
import { Icon } from 'react-fa'
import { observer } from 'mobx-react'

@observer
export default class FolderNode extends Component {
  render() {
    let { name, isOpen } = this.props
    return (
      <div className='name-container'>
        <span className='folder-actions pull-right'>
          <Icon name='plus-square-o' onClick={this.props.onNew}/>
        </span>
        {
          isOpen ? <Icon name='folder-open-o' /> : <Icon name='folder-o' />
        }
        <span>{name}</span>
      </div>
    )
  }
}
