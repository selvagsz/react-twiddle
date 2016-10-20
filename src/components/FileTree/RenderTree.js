import React, { Component } from 'react'
import cx from 'classnames'
import FolderContainer from './FolderContainer'
import File from './File'

export default class RenderTree extends Component {
  render() {
    let { tree, className } = this.props
    return (
      <ul className={cx('list-unstyled file-tree', className)}>
        {
          Object.keys(tree).map((leaf, idx) => {
            if (leaf !== '') {
              let node = tree[leaf]
              if (node[''] === true) {
                return <FolderContainer key={idx} node={node} leaf={leaf} />
              } else {
                return <li><File key={idx} name={leaf} /></li>
              }
            }
          })
        }
      </ul>
    )
  }
}

