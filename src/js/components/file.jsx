import React from 'react'
import fileIcons from 'file-icons-js'

const highlightColor = '#ebebeb'
const transparentColor = 'transparent'

const File = ({ name, href, hasComments, isVisible }) => {
  const className = fileIcons.getClassWithColor(name)
  return (
    <div className='github-pr-file' style={{ background: isVisible ? highlightColor : transparentColor }}>
      <span className={`icon ${className}`} />
      <a href={href} className='link-gray-dark'>{name}</a> {hasComments ? ' 💬' : ''}
    </div>
  )
}

export default File
