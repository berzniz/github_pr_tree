import React from 'react'
import TreeView from 'react-treeview'
import File from './file'

const Branch = ({ nodeLabel, list, href, hasComments, isDeleted, diffElement, diffStats, visibleElement }) => {
  if (href) {
    const isVisible = (diffElement === visibleElement)
    return <File name={nodeLabel} href={href} hasComments={hasComments} isDeleted={isDeleted} isVisible={isVisible} diffStats={diffStats} />
  }

  return (
    <TreeView nodeLabel={nodeLabel} defaultCollapsed={false}>
      {list.map(node => (
        <span key={node.nodeLabel}>
          <Branch {...node} visibleElement={visibleElement} />
        </span>
      ))}
    </TreeView>
  )
}

export default Branch
