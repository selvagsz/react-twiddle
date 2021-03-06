import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'
import cx from 'classnames'
import { Icon } from 'react-fa'
import FolderContainer from './FolderContainer'
import FileNode from './FileNode'
import FolderNode from './FolderNode'
import { findFilePath } from 'utils/fsUtils'

@inject('fileStore')
@inject('editorManager')
@observer
export default class FolderTree extends Component {
  @observable isOpen = false

  constructor() {
    super(...arguments)
    this.toggleFolder = ::this.toggleFolder
    this.addNewFile = ::this.addNewFile
    this.deleteFile = ::this.deleteFile
    this.openFile = ::this.openFile
  }

  @action deleteFile(event) {
    let filePath = findFilePath(this.props.root, this.props.currentNode)
    this.props.fileStore.removeFile(filePath)
    event.stopPropagation()
  }

  @action addNewFile(event) {
    let folderPath = findFilePath(this.props.root, this.props.currentNode)
    let fileName = window.prompt('Enter the file name', `${folderPath}/`)
    if (!fileName) {
      return
    }

    this.props.fileStore.createFile(fileName)
    this.isOpen = true
    event.stopPropagation()
  }

  @action toggleFolder(event) {
    this.isOpen = !this.isOpen
    event.stopPropagation()
  }

  @action openFile(event) {
    let filePath = findFilePath(this.props.root, this.props.currentNode)
    this.props.editorManager.openFile(filePath, this.props.currentNode)
    event.stopPropagation()
  }

  render() {
    let { root, currentNode, name } = this.props
    let isOpen = this.isOpen

    return (
      <li onClick={this.toggleFolder} className={cx({'is-file-opened': this.isActive})}>
        {
          currentNode[''] === true ?
          <div className={cx({'folder-open': isOpen})} >
            <FolderNode
              name={name}
              isOpen={isOpen}
              onNew={this.addNewFile}
              onDeleteFolder={this.deleteFolder}
            />
            <FolderContainer
              className='subtree-container'
              root={root}
              subTree={currentNode}
            />
          </div> :

          <FileNode
            name={name}
            onOpenFile={this.openFile}
            onDeleteFile={this.deleteFile}
          />
        }
      </li>
    )
  }
}
