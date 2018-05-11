import React from 'react'
import TreeView from 'react-treeview'
import File from './file'

const Branch = ({ nodeLabel, list, href, hasComments, diffElement, visibleElement }) => {
  if (href) {
    const isVisible = (diffElement === visibleElement)
    return <File name={nodeLabel} href={href} hasComments={hasComments} isVisible={isVisible} />
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
