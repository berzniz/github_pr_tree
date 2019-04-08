import React from 'react'
import Actions from '../actions'
import Branch from '../branch'
import { createFileTree, isElementVisible } from '../../lib'

const MIN_RESIZE_WIDTH = 55
const MAX_RESIZE_WIDTH = 700

const widthLocalStorageKey = '__better_github_pr_tree_width'

class Tree extends React.Component {
  constructor (props) {
    super(props)

    this.onClose = this.onClose.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.onResizerMouseDown = this.onResizerMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onFullWidth = this.onFullWidth.bind(this)
    this.filterFiles = this.filterFiles.bind(this)

    this.isResizing = false
    this.resizeDelta = 0

    this.treeContainer = document.querySelector('.__better_github_pr')
    this.reviewContainers = document.querySelectorAll('.enable_better_github_pr #files, .enable_better_github_pr .commit.full-commit.prh-commit')

    this.setInitialWidth()

    this.state = {
      root: this.props.root,
      show: true,
      visibleElement: null,
      filter: ''
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.root !== prevProps.root) {
      this.setState({ root: this.props.root })
    }
  }

  componentDidMount () {
    window.addEventListener('DOMContentLoaded', this.onScroll, false)
    window.addEventListener('load', this.onScroll, false)
    window.addEventListener('scroll', this.onScroll, false)
    window.addEventListener('resize', this.onScroll, false)

    this.resizer.addEventListener('mousedown', this.onResizerMouseDown, false)
    document.addEventListener('mousemove', this.onMouseMove, false)
    document.addEventListener('mouseup', this.onMouseUp, false)
  }

  componentWillUnmount () {
    window.removeEventListener('DOMContentLoaded', this.onScroll, false)
    window.removeEventListener('load', this.onScroll, false)
    window.removeEventListener('scroll', this.onScroll, false)
    window.removeEventListener('resize', this.onScroll, false)

    this.resizer.removeEventListener('mousedown', this.onResizerMouseDown, false)
    document.removeEventListener('mousemove', this.onMouseMove, false)
    document.removeEventListener('mouseup', this.onMouseUp, false)
  }

  onResizerMouseDown () {
    this.isResizing = true
    this.treeContainer.classList.add('__better_github_pr_noselect')
    this.prevWidth = this.treeContainer.offsetWidth
    this.startResizeX = this.resizer.getBoundingClientRect().x
  }

  onMouseMove (e) {
    if (!this.isResizing) {
      return
    }

    this.resizeDelta = e.clientX - this.startResizeX
    let newWidth = this.prevWidth + this.resizeDelta
    setTimeout(() => this.setWidth(newWidth), 0)
  }

  onMouseUp () {
    if (!this.isResizing) {
      return
    }

    this.isResizing = false
    this.treeContainer.classList.remove('__better_github_pr_noselect')
    window.localStorage.setItem(widthLocalStorageKey, this.treeContainer.offsetWidth)
  }

  onScroll () {
    const { visibleElement } = this.state
    const { root } = this.props
    const { diffElements = [] } = root
    const nextVisibleElement = diffElements.find(isElementVisible)
    if (nextVisibleElement !== visibleElement) {
      this.setState({
        visibleElement: nextVisibleElement
      })
    }
  }

  onOptions () {
    if (window.chrome.runtime.openOptionsPage) {
      window.chrome.runtime.openOptionsPage()
    } else {
      window.open(window.chrome.runtime.getURL('options.html'))
    }
  }

  onClose () {
    const show = false
    this.setState({ show })
    document.body.classList.toggle('enable_better_github_pr', show)
    this.setWidth(0, false)
  }

  onFullWidth () {
    document.querySelector('body').classList.toggle('full-width')
  }

  setInitialWidth () {
    const savedWitdh = window.localStorage.getItem(widthLocalStorageKey)
    if (savedWitdh) {
      this.setWidth(parseInt(savedWitdh, 10))
    }
  }

  setWidth (width, withConstraints = true) {
    if (withConstraints) {
      if (width <= MIN_RESIZE_WIDTH) {
        width = MIN_RESIZE_WIDTH
      }
      if (width >= MAX_RESIZE_WIDTH) {
        width = MAX_RESIZE_WIDTH
      }
    }

    this.treeContainer.style.width = `${width}px`
    this.reviewContainers.forEach((element) => {
      element.style['margin-left'] = `${width + 10}px`
    })
  }

  filterFiles (event) {
    const filter = event.target.value || ''
    this.setState({
      root: createFileTree(filter).tree,
      filter
    })
  }

  render () {
    const { root, filter, show, visibleElement } = this.state

    if (!show) {
      return null
    }

    return (
      <div>
        <Actions
          filter={filter}
          filterFiles={this.filterFiles}
          onFullWidth={this.onFullWidth}
          onOptions={this.onOptions}
          onClose={this.onClose}
        />
        <div>
          <div className='_better_github_pr_resizer' ref={node => { this.resizer = node }} />
          {root.list.map(node => (
            <span key={node.nodeLabel}>
              <Branch {...node} visibleElement={visibleElement} />
            </span>
          ))}
        </div>
      </div>
    )
  }
}

export default Tree
