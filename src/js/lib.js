export const createRootElement = () => {
  const injectionElement = document.querySelector('.pr-toolbar')
  if (!injectionElement) {
    return
  }
  const rootId = '__better_github_pr'
  let element = document.querySelector('.' + rootId)
  if (!element) {
    element = document.createElement('div')
    element.className = rootId
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

const parseChangeNumber = (n) => {
  if (!n.replace) return 0
  const number = parseInt(n.replace(',', ''), 10)
  return isNaN(number) ? 0 : number
}

const getDiffStatsForDiffElement = (diffElement) => {
  const diffStatSpan = diffElement.getElementsByClassName('diffstat')[0]
  const changesTxt = diffStatSpan && diffStatSpan.getAttribute('aria-label')
  const changes = changesTxt &&
    changesTxt.match(/([\d,]*) additions? & ([\d,]*) deletions?/)
  return changes && {
    additions: parseChangeNumber(changes[1]),
    deletions: parseChangeNumber(changes[2])
  }
}

const getDiffElement = (fileId) => {
  const el = document.getElementById(fileId)
  if (el) {
    return el
  }

  const gitHubEnterpriseEl = document.querySelector(`[data-anchor="${fileId}"]`)
  if (gitHubEnterpriseEl) {
    return gitHubEnterpriseEl.parentElement
  }

  return null
}

const countCommentsForFileId = (fileId) => {
  const diffTable = getDiffElement(fileId)
  if (!diffTable) {
    return 0
  }

  return diffTable.querySelectorAll('.inline-comments').length
}

const isDeletedForFileId = (fileId) => {
  const diffTable = getDiffElement(fileId)
  if (!diffTable) {
    return false
  }

  const hiddenDiffReason = diffTable.querySelector('.hidden-diff-reason')
  return hiddenDiffReason && (hiddenDiffReason.innerText.includes('file was deleted'))
}

const filterItem = (item, filter) => {
  if (filter === null || filter.trim() === EMPTY_FILTER) {
    return true
  }

  return item && item.toLowerCase().indexOf(filter.toLowerCase()) > -1
}

const getCurrentFileLocation = (title) => {
  if (title.split(' → ').length > 1) {
    return title.split(' → ')[1]
  }
  return title.split(' → ')[0]
}

export const folderConcat = (node) => {
  const isFileOrEmpty = (node.list === undefined || node.list.length === 0 || (node.href !== null && node.href !== undefined))
  if (isFileOrEmpty) {
    return node
  }

  const hasSingleChild = (node.list.length === 1)
  if (hasSingleChild) {
    const collapsed = folderConcat(node.list[0])
    const isLastCollapsedIsFolder = node.nodeLabel !== '/' && (collapsed.href === null || collapsed.href === undefined)
    if (isLastCollapsedIsFolder) {
      node.nodeLabel = node.nodeLabel + '/' + collapsed.nodeLabel
      node.hasComments = collapsed.hasComments || node.hasComments
      node.isDeleted = collapsed.isDeleted || node.isDeleted
      node.list = collapsed.list
    }
    return node
  }

  node.list.map(x => folderConcat(x))
  return node
}

export const createFileTree = (filter = EMPTY_FILTER) => {
  const fileInfo = [...document.querySelectorAll('.file-info > a')]
  const files = fileInfo.map(({ title, href }) => {
    title = getCurrentFileLocation(title)
    return { title, href, parts: title.split('/') }
  })
  const count = fileInfo.filter(({ href }) => href && href.includes('#diff')).length
  const tree = {
    nodeLabel: '/',
    list: [],
    diffElements: []
  }

  files.forEach(({ parts, href }) => {
    let location = tree
    if (filterItem(parts[parts.length - 1], filter)) {
      parts.forEach((part, index) => {
        let node = location.list.find(node => node.nodeLabel === part)
        if (!node) {
          const hrefSplit = href.split('#')
          const fileId = hrefSplit[hrefSplit.length - 1]
          const diffElement = getDiffElement(fileId)
          if (diffElement) {
            const hasComments = (countCommentsForFileId(fileId) > 0)
            const isDeleted = isDeletedForFileId(fileId)
            tree.diffElements.push(diffElement)
            node = {
              nodeLabel: part,
              list: [],
              href: (index === parts.length - 1) ? href : null,
              hasComments,
              isDeleted,
              diffElement,
              diffStats: getDiffStatsForDiffElement(diffElement)
            }
            location.list.push(node)
          }
        }
        location.list = location.list.sort(sorter)
        location = node
      })
    }
  })
  return {
    tree: folderConcat(tree),
    count
  }
}

export const isElementVisible = (el) => {
  if (!el) {
    return false
  }

  const GITHUB_HEADER_HEIGHT = 60

  const rect = el.getBoundingClientRect()

  const windowHeight = (window.innerHeight || document.documentElement.clientHeight)
  const windowWidth = (window.innerWidth || document.documentElement.clientWidth)

  const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= GITHUB_HEADER_HEIGHT)
  const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0)

  return (vertInView && horInView)
}

export const isElementTarget = (el) => {
  if (!el) {
    return false
  }

  return el.matches(':target')
}

export const isElementTargetAndVisible = (el) => isElementTarget(el) && isElementVisible(el)

const EMPTY_FILTER = ''

export const getBrowserApi = () => {
  let browserApi = window.chrome
  if (typeof browser !== 'undefined') {
    browserApi = browser
  }
  return browserApi
}

export const StorageSync = {
  save () {
    return new Promise(resolve => {
      const diffStats = document.getElementById('diffStats').checked
      const options = {
        diffStats
      }

      if (window.chrome) {
        window.chrome.storage.sync.set(options, resolve)
      } else {
        browser.storage.sync.set(options).then(resolve)
      }
    })
  },
  get () {
    return new Promise(resolve => {
      const defaults = {
        diffStats: false
      }
      if (window.chrome) {
        window.chrome.storage.sync.get(defaults, resolve)
      } else {
        browser.storage.sync.get(defaults).then(resolve)
      }
    })
  }
}

export const isFileViewed = diffElement => {
  const checkbox = diffElement.querySelector('.js-reviewed-checkbox')
  return checkbox && checkbox.checked
}
