import React from 'react'
import fileIcons from 'file-icons-js'

const highlightColor = '#ebebeb'
const transparentColor = 'transparent'

const AdditionBlock = <span className='change-block addition' />
const DeletionBlock = <span className='change-block deletion' />

const File = ({ name, href, hasComments, isDeleted, isVisible, diffStats }) => {
  const className = fileIcons.getClassWithColor(name)
  const style = {
    background: isVisible ? highlightColor : transparentColor,
    textDecoration: isDeleted ? 'line-through' : null
  }
  const changeBlocks = []
  let changeNumber
  if (diffStats) {
    for (let i = 0; i < Math.log(diffStats.additions); i++) {
      changeBlocks.push(AdditionBlock)
    }
    for (let i = 0; i < Math.log(diffStats.deletions); i++) {
      changeBlocks.push(DeletionBlock)
    }
    changeNumber = diffStats.additions + diffStats.deletions
    changeNumber = changeNumber.toLocaleString()
  }
  return (
    <div className='github-pr-file' style={style}>
      <span className={`icon ${className}`} />
      <a href={href} className='link-gray-dark'>{name}</a>
      {diffStats &&
        <span className='changes'>
          <span className='number'>{changeNumber}</span>
          {changeBlocks}
        </span>
      }
      {hasComments ? ' 💬' : ''}
    </div>
  )
}

export default File
