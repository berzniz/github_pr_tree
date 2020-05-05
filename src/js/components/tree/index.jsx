import React from 'react'
import Actions from '../actions'
import Branch from '../branch'
import { createFileTree, isElementVisible, StorageSync, getBrowserApi } from '../../lib'
import BodyColor from '../bodyColor'

const MIN_RESIZE_WIDTH = 55
const MAX_RESIZE_WIDTH = 700

const widthLocalStorageKey = '__better_github_pr_tree_width'
const fullScreenStorageKey = '__better_github_pr_full_screen'

const appendIconClassName = '__toggle_comments_append'
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
    this.onClick = this.onClick.bind(this)
    this.onToggleComments = this.onToggleComments.bind(this)

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

  onClick (e) {
    if (e.target.type === 'checkbox') {
      setTimeout(() => this.setState({ root: this.props.root }), 0)
    }
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
    window.open(getBrowserApi().runtime.getURL('options.html'))
  }

  onClose () {
    const show = false
    this.setState({ show })
    document.body.classList.toggle('enable_better_github_pr', show)
    this.setWidth(0, false)
  }

  onToggleComments () {
    document.querySelectorAll('.js-toggle-file-notes').forEach((el) => {
      el.click()
    })

    document.querySelectorAll('.js-diff-progressive-container .inline-comments').forEach((el) => {
      // last TD in previouse line
      const td = el.previousElementSibling.lastElementChild
      const lastEl = td.lastElementChild
      if (lastEl.classList.contains(appendIconClassName)) {
        // already appended, remove
        lastEl.remove()
      } else {
        const span = document.createElement('span')
        span.className = appendIconClassName
        const svg = '<svg className="octicon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">' +
          '<path fillRule="evenodd" fill="red" d="M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2" />' +
          '</svg>'
        span.innerHTML = svg
        td.append(span)
      }
    })
  }

  onFullWidth () {
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
    const { root, filter, show, visibleElement, options } = this.state

    if (!show) {
      return null
    }

    return (
      <div>
        <div className='_better_github_pr_resizer' ref={node => { this.resizer = node }} />
        <Actions
          filter={filter}
          filterFiles={this.filterFiles}
          onFullWidth={this.onFullWidth}
          onOptions={this.onOptions}
          onClose={this.onClose}
          onToggleComments={this.onToggleComments}
        />
        <div className='file-container'>
          <div>
            {root.list.map(node => (
              <span key={node.nodeLabel}>
                <Branch {...node} visibleElement={visibleElement} filter={filter} />
              </span>
            ))}
          </div>
        </div>
        <BodyColor isDark={options.darkMode} />
      </div>
    )
  }
}

export default Tree
