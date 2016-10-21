import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'
import cx from 'classnames'
import { Icon } from 'react-fa'
import FolderContainer from './FolderContainer'
import FileNode from './FileNode'
import FolderNode from './FolderNode'

function recurseBuilder(node, value, initialVal) {
  Object.keys(node).reduce((prev, curr, idx, arr) => {
    if (prev.found) {
      return prev
    }

    if (node[curr] === value) {
      prev.found = true
      prev.push(curr)
    } else if (typeof node[curr] === 'object' && node[curr].toString() === '[object Object]') {
      prev.push(curr)
      recurseBuilder(node[curr], value, prev)
    }
    return prev
  }, initialVal)
}

function getAbsolutePath(root, value) {
  let rootKeys = ['']
  Object.keys(root).map((key) => {
    if (rootKeys.found) return
    rootKeys.push(key)
    let node = root[key]
    if (node === value) {
      rootKeys.found = true
      return rootKeys
    } else {
      recurseBuilder(node, value, rootKeys)
    }
  })
  return rootKeys.join('/')
}


@inject(['fileStore'])
@observer
export default class FolderTree extends Component {
  @observable isOpen = false

  constructor() {
    super(...arguments)
    this.toggleFolder = ::this.toggleFolder
    this.addNewFile = ::this.addNewFile
    this.deleteFile = ::this.deleteFile
  }

  @action deleteFile(event) {
    debugger
    let filePath = getAbsolutePath(this.props.root, this.props.currentNode)
    this.props.fileStore.removeFile(filePath)
    event.stopPropagation()
  }

  @action addNewFile(event) {
    let folderPath = getAbsolutePath(this.props.root, this.props.currentNode)
    let fileName = window.prompt('Enter the file name', folderPath)
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

  render() {
    let { root, currentNode, name } = this.props
    let isOpen = this.isOpen

    return (
      <li onClick={this.toggleFolder} >
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

          <FileNode name={name} onDeleteFile={this.deleteFile} />
        }
      </li>
    )
  }
}