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

const renderTree = () => {
  const fileCount = parseInt((document.getElementById('files_tab_counter') || { innerText: 0 }).innerText, 10)
  const rootElement = createRootElement()
  const enabled = Boolean(rootElement && fileCount > 0)
  document.body.classList.toggle('enable_better_github_pr', enabled)
  if (!enabled) {
    return
  }

  const { tree, count } = createFileTree()
  render(<Tree root={tree} />, rootElement)
  if (fileCount !== count) {
    setTimeout(renderTree.bind(this, rootElement), 100)
  }
}

const start = () => {
  observe()
  renderTree()
}

observe()
start()
