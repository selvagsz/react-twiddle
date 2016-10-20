import React, { Component } from 'react'
import cx from 'classnames'
import FolderContainer from './FolderContainer'

export default class RenderTree extends Component {
  render() {
    let { root, className } = this.props
    let subTree = this.props.subTree || root

    return (
      <ul className={cx('list-unstyled file-tree', className)}>
        {
          Object.keys(subTree).map((name, idx) => {
            if (name !== '') {
              let currentNode = subTree[name]
              return (
                <FolderContainer
                  key={idx}
                  root={root}
                  subTree={subTree || root}
                  currentNode={currentNode}
                  name={name}
                />
              )
            }
          })
        }
      </ul>
    )
  }
}

