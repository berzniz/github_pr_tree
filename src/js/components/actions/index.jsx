import React from 'react'

const Actions = ({ filter, filterFiles, onFullWidth, onOptions, onClose, onToggleComments }) => (
  <div className='actions'>
    <input type='text' value={filter} className='actions-filter' placeholder='Type to filter files' onChange={filterFiles} />

    <div className='actions-small-button'>
      <button onClick={onToggleComments} className='full-width-button' title='Toggle comments'>
        <svg className='octicon' xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>
          <path fillRule='evenodd' d='M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2 2v-2H2V2h12v8z' />
        </svg>
      </button>
    </div>

    <div className='actions-small-button'>
      <button onClick={onFullWidth} className='full-width-button' title='Toggle maximum width of github content'>
        <svg className='octicon' xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'>
          <path d='M24 9h-2v-7h-7v-2h9v9zm-9 15v-2h7v-7h2v9h-9zm-15-9h2v7h7v2h-9v-9zm9-15v2h-7v7h-2v-9h9z' />
        </svg>
      </button>
    </div>

    <div className='actions-small-button'>
      <button onClick={onOptions} className='settings-button'>
        <svg className='octicon octicon-gear' viewBox='0 0 14 16' width='14' height='16' aria-hidden='true'>
          <path fillRule='evenodd' d='M14 8.77v-1.6l-1.94-.64-.45-1.09.88-1.84-1.13-1.13-1.81.91-1.09-.45-.69-1.92h-1.6l-.63 1.94-1.11.45-1.84-.88-1.13 1.13.91 1.81-.45 1.09L0 7.23v1.59l1.94.64.45 1.09-.88 1.84 1.13 1.13 1.81-.91 1.09.45.69 1.92h1.59l.63-1.94 1.11-.45 1.84.88 1.13-1.13-.92-1.81.47-1.09L14 8.75v.02zM7 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z' />
        </svg>
      </button>
    </div>

    <div className='actions-small-button'>
      <button onClick={onClose} className='close-button'>
        <svg className='octicon octicon-x' viewBox='0 0 12 16' width='12' height='16' aria-hidden='true'>
          <path fillRule='evenodd' d='M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z' />
        </svg>
      </button>
    </div>
  </div>
)

export default Actions
