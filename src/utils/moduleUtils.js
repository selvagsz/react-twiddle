export const loadAnonymousModule = (string) => {
  let anon = new Function('module = {}', `${string}\n return module`)
  return anon().exports
}
