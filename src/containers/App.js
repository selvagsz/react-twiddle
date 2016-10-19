import React, { Component } from 'react'
import '../styles/app.scss'
import Header from '../components/Header'
import EditorLayout from '../components/EditorLayout'
import Devtools from 'mobx-react-devtools'

export default class App extends Component {
  render() {
    return (
      <main>
        <Devtools />
        <Header />
        <EditorLayout />
      </main>
    )
  }
}
