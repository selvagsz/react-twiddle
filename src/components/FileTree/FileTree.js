import React, { Component } from 'react'
import FolderContainer from './FolderContainer'
import './FileTree.scss'
import { inject, observer } from 'mobx-react'

// {
//   src: {
//     '': true,
//     components: {
//       '': true,
//       'App.js': new Buffer('Foo Bar Baz', 'utf-8')
//     }
//   }
// }

@inject(['fileStore'])
@observer
export default class FileTree extends Component {
  render() {
    let root = this.props.fileStore.getFileTree

    return (
      <div>
        <FolderContainer root={root} />
      </div>
    )
  }
}
