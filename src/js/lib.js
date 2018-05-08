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
  const isFileA = Boolean(a.href)
  const isFileB = Boolean(b.href)
  if (isFileA === isFileB) {
    return (b.nodeLabel > a.nodeLabel) ? -1 : ((a.nodeLabel > b.nodeLabel) ? 1 : 0)
  } else if (isFileA && !isFileB) {
    return 1
  } else {
    return -1
  }
}

export const createFileTree = () => {
  const fileInfo = [...document.querySelectorAll('.file-info > a')]
  const files = fileInfo.map(({ title, href }) => {
    title = title.split(' → ')[0]
    return { title, href, parts: title.split('/') }
  })
  const tree = {
    nodeLabel: '/',
    list: []
  }

  files.forEach(({ parts, href }, index) => {
    let has_comments = !!document.getElementsByClassName('diff-table')[index].querySelectorAll('.inline-comments').length;
    let location = tree
    parts.forEach((part, index) => {
      let node = location.list.find(node => node.nodeLabel === part)
      if (!node) {
        node = { nodeLabel: part, list: [], href: (index === parts.length - 1) ? href : null, has_comments }
        location.list.push(node)
      }
      location.list = location.list.sort(sorter)
      location = node
    })
  })
  return {
    tree,
    count: fileInfo.length
  }
}
