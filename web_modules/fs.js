import MemoryFileSystem from 'memory-fs'

MemoryFileSystem.prototype.getData = function() {
  return this.data
}

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


const fs = new MemoryFileSystem({
  app: {
    '': true,
    'index.html': new Buffer(defaultHTML, 'utf-8')
  },
  'README.md': new Buffer('# React Twiddle', 'utf-8')
})

export default fs
