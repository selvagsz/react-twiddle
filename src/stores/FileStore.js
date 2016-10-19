import fs from 'fs'
import { extendObservable, observable, computed, action, autorun } from 'mobx'

export default class FileStore {
  @observable data

  constructor() {
    this.fs = fs
    this.data = fs.getData()
  }

  // Looks like a hack. Need to investigate
  readData() {
    this.data = Object.assign({}, this.fs.getData())
  }

  @computed get getFileTree() {
    return this.data
  }

  @action addFile(path) {
    this.fs.mkdirpSync(path)
    this.readData()
  }
}
