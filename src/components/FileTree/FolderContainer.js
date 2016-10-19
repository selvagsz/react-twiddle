import React, { Component } from 'react'
import { Icon } from 'react-fa'
import { observable, action } from 'mobx'
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
      <li className={ isOpen && 'folder-open' }>
        {isOpen}
        {
          Object.keys(node).length > 1 ?
            (
              <div onClick={this.toggleFolder}>
                <Folder name={leaf} isOpen={isOpen}/>
                <RenderTree className='subtree-container' tree={node} />
              </div>
            ) :
            <Folder name={leaf} isOpen={isOpen}/>
        }
      </li>
    )
  }
}
