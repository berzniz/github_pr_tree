import React from 'react'
import TreeView from 'react-treeview'
import { StorageSync } from '../../lib'

class Folder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
    const options = await StorageSync.get()

    if (this.unmounted) {
      return
    }

    this.setState({ options })
  }

  render () {
    const { children, nodeLabel, isViewed, fileCount } = this.props
    const { options = {} } = this.state
    const fileCountLabel = fileCount > 1 ? 'files' : 'file'

    const display = (
      <div className='github-pr-folder-label'>
        {nodeLabel} {options.fileCount && fileCount && <span className='github-pr-folder-count-label'>({fileCount} {fileCountLabel})</span>}
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
