import 'webext-dynamic-content-scripts'
import React from 'react'
import { render } from 'react-dom'
import Tree from './components/tree'
import { createFileTree, createRootElement } from './lib'
import './style.css'

const { document, MutationObserver, parseInt } = window

let observer
const observe = () => {
  observer && observer.disconnect()
  const pjaxContainer = document.querySelector('[data-pjax-container]')
  observer = new MutationObserver(start)
  observer.observe(pjaxContainer, { childList: true })
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

  calculateTree () {
    const isFilteredToCommit = Boolean(document.querySelector('.js-commits-filtered'))
    const fileCount = parseInt((document.getElementById('files_tab_counter') || { innerText: 0 }).innerText, 10)
    const { tree, count } = createFileTree()

    this.setState({ tree })

    if (isFilteredToCommit) {
      return
    }

    if (fileCount !== count) {
      setTimeout(renderTree.bind(this, this.calculateTree.bind(this)), 100)
    }
  }

  render () {
    const { tree } = this.state
    if (!tree) {
      return null
    }
    return <Tree root={tree} />
  }
}

const renderTree = () => {
  const fileCount = parseInt((document.getElementById('files_tab_counter') || { innerText: 0 }).innerText, 10)
  const rootElement = createRootElement()
  const enabled = Boolean(rootElement && fileCount > 0)
  document.body.classList.toggle('enable_better_github_pr', enabled)
  if (!enabled) {
    return
  }

  render(<Top />, rootElement)
}

const start = () => {
  observe()
  renderTree()
}

observe()
start()
