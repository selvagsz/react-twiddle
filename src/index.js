import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import { Provider } from 'mobx-react'
import FileStore from './stores/FileStore'

const fileStore = new FileStore()

render(
  <Provider fileStore={fileStore}>
    <App />
  </Provider>,
  document.getElementById('root')
)
