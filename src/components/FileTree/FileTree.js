import React, { Component } from 'react'
import { Icon } from 'react-fa'

function getNodes(path) {
  return path.split(/\/+/)
}

function isFile(name) {
  return new RegExp(/\./).test(name)
}

function constructTree(filePaths = []) {
  return filePaths.reduce((prev, curr, idx, arr) => {
    let nodes = getNodes(curr)
    function constructSubtree(nodes, subtree) {
      return nodes.reduce((prev, curr, idx, arr) => {
        if (idx > 0) return prev
        let node = prev[curr] = prev[curr] || {}
        node.isFile = isFile(curr)
        let nextIdx = idx + 1
        if (nextIdx < arr.length) {
          let children = node.children = node.children || {}
          children[arr[nextIdx]] = constructSubtree(arr.slice(nextIdx), {})
        }
        return node
      }, subtree)
    }
    constructSubtree(nodes, prev)
    return prev
  }, {})
}

const RenderTree = ({ tree }) => (
  <ul className='list-unstyled file-tree'>
    {
      Object.keys(tree).map((root) => (
        <li>
          <div className='name-container'>
            <Icon name='folder-o' />
            <span>{root}</span>
          </div>
          {tree[root].children && <RenderTree tree={tree[root].children} />}
        </li>
      ))
    }
  </ul>
)

export default class FileTree extends Component {
  render() {
    let filePaths = [
      'src/components/Header.js',
      'src/styles/app.scss',
      'src/index.js',
      '.babelrc',
      '.editorconfig',
      'webpack.config.js'
    ]

    let tree = constructTree(filePaths)

    return (
      <div>
        <RenderTree tree={tree} />
      </div>
    )
  }
}
