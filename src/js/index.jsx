import React from 'react'
import { render } from 'react-dom'
import Tree from './components/tree'
import { createFileTree, createRootElement, getBrowserApi } from './lib'

import './style.css'

const { document, MutationObserver, FontFace, parseInt = Number.parseInt } = window

function waitForElm (selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  })
}

class Top extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tree: null
    }
  }

  componentDidMount () {
    this.calculateTree()
  }

  loadTree () {
    const { tree } = createFileTree()
    this.setState({ tree })
  }

  calculateTree () {
    const isFilteredToCommit = Boolean(document.querySelector('.js-commits-filtered'))
    const fileCount = parseInt((document.getElementById('files_tab_counter') || { innerText: 0 }).innerText, 10)
    const { tree, count } = createFileTree()

    this.setState({ tree })

    if (isFilteredToCommit) {
      return
    }

    if (fileCount !== count) {
      setTimeout(this.calculateTree.bind(this), 100)
    }
  }

  render () {
    const { tree } = this.state
    if (!tree) {
      return null
    }
    return <Tree root={tree} reloadTree={() => this.loadTree()} />
  }
}

const renderTree = () => {
  const diffViewElement = Boolean(document.querySelector('.diff-view'))
  const fileCount = parseInt((document.getElementById('files_tab_counter') || { innerText: 0 }).innerText, 10)
  const rootElement = createRootElement()
  const enabled = Boolean(rootElement && diffViewElement && fileCount > 0)
  document.body.classList.toggle('enable_better_github_pr', enabled)
  if (!enabled) {
    return
  }

  render(<Top />, rootElement)
}

const loadFonts = () => {
  const fonts = [
    { name: 'FontAwesome', fileName: 'fontawesome.woff2' },
    { name: 'Mfizz', fileName: 'mfixx.woff2' },
    { name: 'Devicons', fileName: 'devopicons.woff2' },
    { name: 'file-icons', fileName: 'file-icons.woff2' },
    { name: 'octicons', fileName: 'octicons.woff2' }
  ]

  fonts
    .map(({ name, fileName }) => new FontFace(
      name,
      `url("${getBrowserApi().runtime.getURL(`fonts/${fileName}`)}") format("woff2")`,
      { style: 'normal', weight: 'normal' }
    ))
    .forEach(async fontFace => {
      const loadedFont = await fontFace.load()
      document.fonts.add(loadedFont)
    })
}

loadFonts()
renderTree()
waitForElm('#files_tab_counter').then(() => {
  renderTree()
})
