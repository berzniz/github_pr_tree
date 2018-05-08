import React from 'react'
import TreeView from 'react-treeview'
import File from './file'

const Branch = ({ nodeLabel, list, href, hasComments }) => {
  if (href) {
    return <File name={nodeLabel} href={href} hasComments={hasComments} />
  }

  return (
    <TreeView nodeLabel={nodeLabel} defaultCollapsed={false}>
      {list.map(node => (
        <span key={node.nodeLabel}>
          <Branch {...node} />
        </span>
      ))}
    </TreeView>
  )
}

export default Branch
