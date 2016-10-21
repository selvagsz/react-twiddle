export default function findFilePath(root, value) {
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
