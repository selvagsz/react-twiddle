import React, { Component } from 'react'
import { Icon } from 'react-fa'
import { observable, action } from 'mobx'
import cx from 'classnames'
import Folder from './Folder'
import RenderTree from './RenderTree'
import { observer } from 'mobx-react'

@observer
export default class FolderContainer extends Component {
  @observable isOpen = false

  constructor() {
    super(...arguments)
    this.toggleFolder = ::this.toggleFolder
  }

  @action toggleFolder(e) {
    this.isOpen = !this.isOpen
    e.stopPropagation()
  }

  render() {
    let { node, leaf } = this.props
    let isOpen = this.isOpen
    return (
      <li className={ cx({'folder-open': isOpen}) } onClick={this.toggleFolder} >
        <Folder name={leaf} isOpen={isOpen}/>
        { node && <RenderTree className='subtree-container' tree={node} /> }
      </li>
    )
  }
}
