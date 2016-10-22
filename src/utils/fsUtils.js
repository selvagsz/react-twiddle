export const findFilePath = (root, value) => {
  let paths = ['']
  let found = false

  function traverse(tree) {
    Object.keys(tree).some((node) => {
      if (found) {
        return true
      }
      let subtree = tree[node]
      if (subtree === value) {
        paths.push(node)
        found = true
        return true
      }
      if (typeof subtree === 'object' && subtree.toString() === '[object Object]') {
        paths.push(node)
        traverse(subtree)
      }
    })
    if (!found) paths.pop()
  }

  traverse(root)
  return paths.join('/')
}

const fileModesMap = new Map()
fileModesMap.set(/(js|jsx|json)/, 'jsx')
fileModesMap.set(/(css)/, 'css')
fileModesMap.set(/html/, 'htmlmixed')
fileModesMap.set(/(md|markdown)/, 'markdown')


export const getFileMode = (file = '') => {
  let ext = file.split('.').pop()

  for (var [key, value] of fileModesMap) {
    if (key.test(ext)) return value
  }
}
