import React from 'react'
import TreeView from 'react-treeview'
import File from './file'

const Branch = ({ nodeLabel, list, href, has_comments }) => {
  if (href) {
    return <File name={nodeLabel} href={href} has_comments={has_comments}/>
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
