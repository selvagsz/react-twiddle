import React, { Component } from 'react'
import '../styles/app.scss'
import Header from '../components/Header'
import EditorLayout from '../components/EditorLayout'

export default class App extends Component {
  render() {
    return (
      <main>
        <Header />
        <EditorLayout />
      </main>
    )
  }
}
