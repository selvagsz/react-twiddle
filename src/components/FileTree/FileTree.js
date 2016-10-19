import React, { Component } from 'react'
import Folder from './Folder'
import File from './File'
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


class RenderTree extends Component {
  render() {
    let { tree } = this.props
    return (
      <div>
        <ul className='list-unstyled file-tree'>
          {
            Object.keys(tree).map((leaf) => {
              if (leaf !== '') {
                let node = tree[leaf]

                if (node[''] === true) {
                  if (Object.keys(node).length > 1) {
                    return (
                      <li>
                        <Folder name={leaf} />
                        <RenderTree tree={node} />
                      </li>
                    )
                  } else {
                    return <li><Folder name={leaf} /></li>
                  }
                } else {
                  return <li><File name={leaf} /></li>
                }
              }
            })
          }
        </ul>
      </div>
    )
  }
}

@inject(['fileStore'])
@observer
export default class FileTree extends Component {
  render() {
    let tree = this.props.fileStore.getFileTree

    return (
      <div>
        <RenderTree tree={tree} />
      </div>
    )
  }
}
