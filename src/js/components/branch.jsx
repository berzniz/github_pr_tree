import React from 'react'
import TreeView from 'react-treeview'

const Branch = ({ nodeLabel, list, href }) => {
  if (href) {
    return (
      <div>
        <a href={href} className='link-gray-dark'>{nodeLabel}</a>
      </div>
    )
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
