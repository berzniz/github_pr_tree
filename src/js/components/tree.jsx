import React from 'react'
import Branch from './branch.jsx'
import { isElementVisible } from '../lib'

class Tree extends React.Component {
  constructor (props) {
    super(props)

    this.onClose = this.onClose.bind(this)
    this.onScroll = this.onScroll.bind(this)

    this.state = {
      show: true,
      visibleElement: null
    }
  }

  componentDidMount () {
    window.addEventListener('DOMContentLoaded', this.onScroll, false)
    window.addEventListener('load', this.onScroll, false)
    window.addEventListener('scroll', this.onScroll, false)
    window.addEventListener('resize', this.onScroll, false)
  }

  componentWillUnmount () {
    window.removeEventListener('DOMContentLoaded', this.onScroll, false)
    window.removeEventListener('load', this.onScroll, false)
    window.removeEventListener('scroll', this.onScroll, false)
    window.removeEventListener('resize', this.onScroll, false)
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

  onClose () {
    const show = false
    this.setState({ show })
    document.body.classList.toggle('enable_better_github_pr', show)
  }

  render () {
    const { root } = this.props
    const { show, visibleElement } = this.state

    if (!show) {
      return null
    }

    return (
      <div>
        <button onClick={this.onClose} className='close_button'>✖</button>
        {root.list.map(node => (
          <span key={node.nodeLabel}>
            <Branch {...node} visibleElement={visibleElement} />
          </span>
        ))}
      </div>
    )
  }
}

export default Tree
