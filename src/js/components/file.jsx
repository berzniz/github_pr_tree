import React from 'react'
import fileIcons from 'file-icons-js'

const highlightColor = '#ebebeb'
const transparentColor = 'transparent'

const File = ({ name, href, hasComments, isDeleted, isVisible }) => {
  const className = fileIcons.getClassWithColor(name)
  const style = {
    background: isVisible ? highlightColor : transparentColor,
    textDecoration: isDeleted ? 'line-through' : null
  }
  return (
    <div className='github-pr-file' style={style}>
      <span className={`icon ${className}`} />
      <a href={href} className='link-gray-dark'>{name}</a> {hasComments ? ' 💬' : ''}
    </div>
  )
}

export default File
