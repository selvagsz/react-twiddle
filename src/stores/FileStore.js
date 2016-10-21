import fs from 'fs'
import { observable, computed, action } from 'mobx'

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
    return new Promise((resolve, reject) => {
      this.fs.mkdirp(path, (err, res) => {
        if (err) {
          reject(err)
        } else {
          this.readData()
          resolve(res)
        }
      })
    })
  }

  @action createFile(name, content = new Buffer('', 'utf-8')) {
    return new Promise((resolve, reject) => {
      this.fs.writeFile(name, content, (err, res) => {
        if (err) {
          reject(err)
        } else {
          this.readData()
          resolve(res)
        }
      })
    })
  }

  @action removeFile(path) {
    return new Promise((resolve, reject) => {
      this.fs.unlink(path, (err, res) => {
        if (err) {
          reject(err)
        } else {
          this.readData()
          resolve(res)
        }
      })
    })
  }
}
