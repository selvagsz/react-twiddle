import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import { Provider } from 'mobx-react'
import FileStore from './stores/FileStore'
import EditorManager from './stores/EditorManager'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'

const fileStore = new FileStore()
const editorManager = new EditorManager()

render(
  <Provider fileStore={fileStore} editorManager={editorManager}>
    <App />
  </Provider>,
  document.getElementById('root')
)
