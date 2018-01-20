import React from 'react'
import { render } from 'react-dom'
import Tree from './components/tree'
import { createFileTree, createRootElement } from './lib'
import './style.css'

const { document, MutationObserver } = window

let observer
const observe = () => {
  observer && observer.disconnect()
  const pjaxContainer = document.querySelector('[data-pjax-container]')
  observer = new MutationObserver(start)
  observer.observe(pjaxContainer, { childList: true })
}

const start = () => {
  observe()
  const rootElement = createRootElement()
  if (!rootElement) {
    return
  }
  const tree = createFileTree()
  render(<Tree root={tree} />, rootElement)
}

observe()
start()
