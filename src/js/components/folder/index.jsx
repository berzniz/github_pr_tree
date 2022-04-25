import React from 'react'
import TreeView from 'react-treeview'

class Folder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  getHighlight ({ nodeLabel, filter, index }) {
    const prefix = nodeLabel.substring(0, index)
    const middle = nodeLabel.substring(index, index + filter.length)
    const suffix = nodeLabel.substring(index + filter.length)
    return (
      <>
        {prefix}
        {middle ? <span className='github-pr-file-highlight-filter'>{middle}</span> : null}
        {suffix}
      </>
    )
  }

  render () {
    const { children, nodeLabel, isViewed, filter } = this.props

    const index = filter ? (nodeLabel.toLowerCase() || '').indexOf(filter.toLowerCase()) : -1
    const displayName = (index === -1) ? nodeLabel : this.getHighlight({ nodeLabel, filter, index })

    const display = (
      <div>
        {displayName}
        {isViewed
          ? (
            <svg className='github-pr-file-checkmark octicon octicon-check' viewBox='0 0 12 16' version='1.1' width='12' height='16' aria-hidden='true'>
              <path fillRule='evenodd' d='M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z' />
            </svg>
            )
          : null}
      </div>
    )

    return (
      <TreeView nodeLabel={display} defaultCollapsed={false}>
        {children}
      </TreeView>
    )
  }
}

export default Folder
