export const createRootElement = () => {
  const injectionElement = document.querySelector('.pr-toolbar')
  if (!injectionElement) {
    return
  }
  const rootId = '__better_github_pr'
  let element = document.getElementById(rootId)
  if (!element) {
    element = document.createElement('div')
    element.id = rootId
    injectionElement.appendChild(element)
  }
  return element
}

const sorter = (a, b) => {
  const isFileA = a.href
  const isFileB = b.href
  if (isFileA && isFileB) {
    return (b.part > a.part) ? ((b.part < a.part) ? 1 : 0) : -1
  } else if (isFileA && !isFileB) {
    return 1
  } else {
    return -1
  }
}

export const createFileTree = () => {
  const fileInfo = [...document.querySelectorAll('.file-info > a')]
  const files = fileInfo.map(({ title, href }) => ({ title, href, parts: title.split('/') }))
  const tree = {
    nodeLabel: '/',
    list: []
  }

  files.forEach(({ parts, href }) => {
    let location = tree
    parts.forEach(part => {
      let node = location.list.find(node => node.nodeLabel === part)
      if (!node) {
        node = { nodeLabel: part, list: [] }
        location.list.push(node)
      }
      location.list = location.list.sort(sorter)
      location = node
    })
    location.href = href
  })
  return {
    tree,
    count: fileInfo.length
  }
}
