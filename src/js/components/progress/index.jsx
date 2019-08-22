import React from 'react'

const Progress = ({ progress }) => (
  <span className='tooltipped text-gray-light'
    aria-label={`${progress}% lines of code reviewed`}>
    <span className='Progress'>
      <div className='bg-green js-review-progress'
        style={{ transition: 'width 0.2s ease-out 0s', width: `${progress}%` }} />
    </span>
  </span>
)

export default Progress
