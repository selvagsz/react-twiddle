import { observable, action } from 'mobx'
import webpack from 'webpack'

export default class EditorManager {
  @observable tab = {}

  constructor(options = {}) {
    Object.assign(this, options)
  }

  @action openFile(filePath, content) {
    this.tab = {
      filePath,
      content: content.toString()
    }
  }

  @action generateOutput() {
    let fs = this.fileStore.fs
    let htmlString = fs.readFileSync('/app/index.html')
    let parser = new DOMParser()
    let htmlDocument = parser.parseFromString(htmlString, 'text/html')
    let script = htmlDocument.querySelector('script#injectedScript')

    if (!script) {
      script = document.createElement('script')
      script.setAttribute('id', 'injectedScript')
      htmlDocument.body.appendChild(script)
    }

    script.innerHTML = fs.readFileSync('/dist/bundle.js')
    return htmlDocument.documentElement.outerHTML
  }

  @action run() {
    let compiler = webpack({
      inputFileSystem: this.fileStore.fs,
      outputFileSystem: this.fileStore.fs,
      entry: './app',
      output: {
        path: '/dist',
        filename: 'bundle.js'
      }
    })

    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) return reject(err.stack)

        let output = this.generateOutput()
        resolve({
          output,
          stats
        })
      })
    })
  }
}
