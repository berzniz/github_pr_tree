import React from 'react'
import Branch from './branch.jsx'

class Tree extends React.Component {
  constructor (props) {
    super(props)

    this.onClose = this.onClose.bind(this)

    this.state = {
      show: true
    }
  }

  onClose () {
    const show = false
    this.setState({ show })
    document.body.classList.toggle('enable_better_github_pr', show)
  }

  render () {
    const { root } = this.props
    const { show } = this.state

    if (!show) {
      return null
    }

    return (
      <div>
        <button onClick={this.onClose} className='close_button'>✖</button>
        {root.list.map(node => (
          <span key={node.nodeLabel}>
            <Branch {...node} />
          </span>
        ))}
      </div>
    )
  }
}

export default Tree
