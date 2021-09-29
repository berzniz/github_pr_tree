import React from 'react'
import { isFileViewed } from './lib'
import File from './components/file'
import Folder from './components/folder'

export const createTree = ({ nodeLabel, list, href, hasComments, isDeleted, diffElement, diffStats, visibleElement, filter, hideViewed }) => {
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
        hideViewed={hideViewed}
      />
    )
  }

  const rawChildren = list.map(node => createTree({ ...node, visibleElement, filter, hideViewed }))

  return (
    <Folder key={nodeLabel} nodeLabel={nodeLabel} isViewed={rawChildren.every(child => child.props.isViewed)} hideViewed={hideViewed}>
      {rawChildren.map(node => (
        <span key={node.key}>
          {node}
        </span>
      ))}
    </Folder>
  )
}
