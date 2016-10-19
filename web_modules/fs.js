import MemoryFileSystem from 'memory-fs'

MemoryFileSystem.prototype.getData = function() {
  return this.data
}

const fs = new MemoryFileSystem({
  src: {
    '': true,
    components: {
      '': true,
      'App.js': new Buffer('App.js', 'utf-8')
    }
  },
  node_modules: {
    '': true
  },
  'README.md': new Buffer('# React Twiddle', 'utf-8')
})

export default fs
