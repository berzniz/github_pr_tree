import React from 'react'
import { isFileViewed } from './lib'
import File from './components/file'
import Folder from './components/folder'

export const createTree = ({ nodeLabel, list, href, hasComments, isDeleted, diffElement, diffStats, visibleElement, filter, fileCount }) => {
  if (href) {
    const isVisible = (diffElement === visibleElement)
    const isViewed = isFileViewed(diffElement)

    return (
      <File
        key={href}
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

  const rawChildren = list.map(node => createTree({ ...node, visibleElement, filter }))

  return (
    <Folder key={nodeLabel} nodeLabel={nodeLabel} fileCount={fileCount} isViewed={rawChildren.every(child => child.props.isViewed)}>
      {rawChildren.map(node => (
        <span key={node.key}>
          {node}
        </span>
      ))}
    </Folder>
  )
}
