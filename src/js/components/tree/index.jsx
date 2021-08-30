import React from 'react'
import Actions from '../actions'
import { createFileTree, isElementVisible, StorageSync, getBrowserApi, isElementTargetAndVisible } from '../../lib'
import { createTree } from '../../createTree'

const MIN_RESIZE_WIDTH = 55
const MAX_RESIZE_WIDTH = 700

const widthLocalStorageKey = '__better_github_pr_tree_width'
const fullScreenStorageKey = '__better_github_pr_full_screen'

class Tree extends React.Component {
  constructor (props) {
    super(props)
    this.onReloadTree = this.props.reloadTree

    this.handleClose = this.handleClose.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.onResizerMouseDown = this.onResizerMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.handleFullWidth = this.handleFullWidth.bind(this)
    this.filterFiles = this.filterFiles.bind(this)
    this.onClick = this.onClick.bind(this)

    this.isResizing = false
    this.resizeDelta = 0

    this.treeContainer = document.querySelector('.__better_github_pr')
    this.reviewContainers = document.querySelectorAll('.enable_better_github_pr #files, .enable_better_github_pr .commit.full-commit.prh-commit')

    this.setInitialWidth()

    if (window.localStorage.getItem(fullScreenStorageKey) === 'true') {
      document.querySelector('body').classList.add('full-width')
    }

    this.state = {
      root: this.props.root,
      show: true,
      visibleElement: null,
      filter: '',
      options: {}
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.root !== prevProps.root) {
      this.setState({ root: this.props.root })
    }
  }

  async componentDidMount () {
    window.addEventListener('DOMContentLoaded', this.onScroll, false)
    window.addEventListener('load', this.onScroll, false)
    window.addEventListener('scroll', this.onScroll, false)
    window.addEventListener('resize', this.onScroll, false)

    this.resizer.addEventListener('mousedown', this.onResizerMouseDown, false)
    document.addEventListener('mousemove', this.onMouseMove, false)
    document.addEventListener('mouseup', this.onMouseUp, false)
    document.addEventListener('click', this.onClick, false)

    const options = await StorageSync.get()
    if (!this.unmounted) {
      this.setState({ options })
    }
  }

  componentWillUnmount () {
    window.removeEventListener('DOMContentLoaded', this.onScroll, false)
    window.removeEventListener('load', this.onScroll, false)
    window.removeEventListener('scroll', this.onScroll, false)
    window.removeEventListener('resize', this.onScroll, false)

    this.resizer.removeEventListener('mousedown', this.onResizerMouseDown, false)
    document.removeEventListener('mousemove', this.onMouseMove, false)
    document.removeEventListener('mouseup', this.onMouseUp, false)
    document.removeEventListener('click', this.onClick, false)

    this.unmounted = true
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
    const newWidth = this.prevWidth + this.resizeDelta
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

  onClick (e) {
    if (e.target.type === 'checkbox') {
      setTimeout(() => this.setState({ root: this.props.root }), 0)
    }
  }

  onScroll () {
    const { visibleElement } = this.state
    const { root } = this.props
    const { diffElements = [] } = root
    const nextVisibleElement = diffElements.find(isElementTargetAndVisible) || diffElements.find(isElementVisible)
    if (nextVisibleElement !== visibleElement) {
      this.setState({
        visibleElement: nextVisibleElement
      })
    }
  }

  handleOptions () {
    window.open(getBrowserApi().runtime.getURL('options.html'))
  }

  handleClose () {
    const show = false
    this.setState({ show })
    document.body.classList.toggle('enable_better_github_pr', show)
    this.setWidth(0, false)
  }

  handleFullWidth () {
    const fullScreenState = document.querySelector('body').classList.toggle('full-width')
    window.localStorage.setItem(fullScreenStorageKey, fullScreenState)
  }

  setInitialWidth () {
    const savedWidth = window.localStorage.getItem(widthLocalStorageKey)
    if (savedWidth) {
      this.setWidth(parseInt(savedWidth, 10))
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
        <div className='_better_github_pr_resizer' ref={node => { this.resizer = node }} />
        <Actions
          filter={filter}
          filterFiles={this.filterFiles}
          onFullWidth={this.handleFullWidth}
          onOptions={this.handleOptions}
          onClose={this.handleClose}
          onReloadTree={this.onReloadTree}
        />
        <div className='file-container'>
          <div>
            {root.list.map(node => (
              <span key={node.nodeLabel}>
                {createTree({ ...node, visibleElement, filter })}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Tree
