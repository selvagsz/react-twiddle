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

  @action addFolder(path) {
    this.fs.mkdirpSync(path)
    this.readData()
  }

  @action createFile(name, content = new Buffer('', 'utf-8')) {
    this.fs.writeFileSync(name, content)
    this.readData()
  }

  @action removeFile(path) {
    this.fs.unlinkSync(path)
    this.readData()
  }

}
