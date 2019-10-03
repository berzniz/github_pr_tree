import React from 'react'
import TreeView from 'react-treeview'
import File from '../file'
import { isFileViewed } from '../../lib'

const Branch = ({ nodeLabel, list, href, hasComments, isDeleted, diffElement, diffStats, visibleElement, filter }) => {
  if (href) {
    const isVisible = (diffElement === visibleElement)
    const isViewed = isFileViewed(diffElement)
    return (
      <File
        name={nodeLabel}
        href={href}
        hasComments={hasComments}
        isDeleted={isDeleted}
        isVisible={isVisible}
        diffStats={diffStats}
        isViewed={isViewed}
        filter={filter}
      />
    )
  }

  return (
    <TreeView nodeLabel={nodeLabel} defaultCollapsed={false}>
      {list.map(node => (
        <span key={node.nodeLabel}>
          <Branch {...node} visibleElement={visibleElement} filter={filter} />
        </span>
      ))}
    </TreeView>
  )
}

export default Branch
