import MemoryFileSystem from 'memory-fs'

MemoryFileSystem.prototype.getData = function() {
  return this.data
}

let helloWorld =
`import React from 'react'

export default class HelloWorld extends React.Component {
  render() {
    return (
      <h1>Hello World</h1>
    )
  }
}`

let defaultHTML =
`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>

  <body>
    <h1>React Twiddle</h1>
  </body>
</html>`

let defaultIndex = `console.log('Hello')`

let defaultWebpackConfig =
`module.exports = {
  entry: {
    app: ['/app']
  },

  output: {
    path: '/dist',
    filename: 'bundle.js'
  }
}`

let twiddleJSON =
`module.exports = {
  "react-twiddle": 0.0.0
}`

const fs = new MemoryFileSystem({
  app: {
    '': true,
    'index.js': new Buffer(defaultIndex, 'utf-8'),
    'HelloWorld.js': new Buffer(helloWorld, 'utf-8'),
    'index.html': new Buffer(defaultHTML, 'utf-8')
  },
  'webpack.config.js': new Buffer(defaultWebpackConfig, 'utf-8'),
  'twiddle.json': new Buffer(twiddleJSON, 'utf-8'),
  'README.md': new Buffer('# React Twiddle', 'utf-8')
})

export default fs
