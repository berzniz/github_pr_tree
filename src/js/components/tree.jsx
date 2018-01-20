import React from 'react'
import Branch from './branch.jsx'

export default ({ root }) => {
  return (
    <div>
      {root.list.map(node => (
        <span key={node.nodeLabel}>
          <Branch {...node} />
        </span>
      ))}
    </div>
  )
}
