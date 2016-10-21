import { observable, action } from 'mobx'

export default class EditorManager {
  @observable tab = {}

  @action openFile(filePath, content) {
    this.tab = {
      filePath,
      content: content.toString()
    }
  }
}
