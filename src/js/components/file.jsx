import React from 'react'
import fileIcons from 'file-icons-js'

const File = ({ name, href, hasComments }) => {
  const className = fileIcons.getClassWithColor(name)
  return (
    <div className='github-pr-file'>
      <span className={`icon ${className}`} />
      <a href={href} className='link-gray-dark'>{name}</a> {hasComments ? ' 💬' : ''}
    </div>
  )
}

export default File
