import React from 'react'
import TreeView from 'react-treeview'

class Folder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { children, nodeLabel, isViewed } = this.props

    const display = (
      <div>
        {nodeLabel}
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
