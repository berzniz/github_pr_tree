import React from 'react'
import { render } from 'react-dom'
import Tree from './components/tree'
import { createFileTree, createRootElement, getBrowserApi } from './lib'

import './style.css'

const { document, MutationObserver, FontFace, parseInt = Number.parseInt } = window

let observer
const observe = () => {
  observer && observer.disconnect()
  const pjaxContainer = document.querySelector('[data-pjax-container]')
  const pjaxContentContainer = document.querySelector('#repo-content-pjax-container')
  observer = new MutationObserver(start)
  pjaxContainer && observer.observe(pjaxContainer, { childList: true })
  pjaxContentContainer && observer.observe(pjaxContentContainer, { childList: true })
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

  loadTree() {
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

const start = () => {
  observe()
  renderTree()
}

loadFonts()
observe()
start()
