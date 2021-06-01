import React from 'react'

const Actions = ({ filter, filterFiles, onFullWidth, onOptions, onClose, onReloadTree }) => (
  <div className='actions'>
    <input type='text' value={filter} className='actions-filter' placeholder='Type to filter files' onChange={filterFiles} />

    <div className='actions-small-button'>
      <button onClick={onReloadTree} className='reload-tree-button'>
        <span className='tooltipped tooltipped-s' aria-label='Manually reload the tree'>
          <svg className='octicon octicon-sync' xmlns="http://www.w3.org/2000/svg" transform="translate(0,4)" width="24" height="20" viewBox="0 0 12 16">
            <path fillRule="evenodd" d="M10.24 7.4a4.15 4.15 0 0 1-1.2 3.6 4.346 4.346 0 0 1-5.41.54L4.8 10.4.5 9.8l.6 4.2 1.31-1.26c2.36 1.74 5.7 1.57 7.84-.54a5.876 5.876 0 0 0 1.74-4.46l-1.75-.34zM2.96 5a4.346 4.346 0 0 1 5.41-.54L7.2 5.6l4.3.6-.6-4.2-1.31 1.26c-2.36-1.74-5.7-1.57-7.85.54C.5 5.03-.06 6.65.01 8.26l1.75.35A4.17 4.17 0 0 1 2.96 5z"/>
          </svg>
        </span>
      </button>
    </div>

    <div className='actions-small-button'>
      <button onClick={onFullWidth} className='full-width-button' title='Toggle full width mode'>
        <span className='tooltipped tooltipped-s' aria-label='Toggle full width mode'>
          <svg className='octicon' xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'>
            <path d='M24 9h-2v-7h-7v-2h9v9zm-9 15v-2h7v-7h2v9h-9zm-15-9h2v7h7v2h-9v-9zm9-15v2h-7v7h-2v-9h9z' />
          </svg>
        </span>
      </button>
    </div>

    <div className='actions-small-button'>
      <button onClick={onOptions} className='settings-button'>
        <span className='tooltipped tooltipped-s' aria-label='Show settings'>
          <svg className='octicon octicon-gear' viewBox='0 0 14 16' width='14' height='16' aria-hidden='true'>
            <path fillRule='evenodd' d='M14 8.77v-1.6l-1.94-.64-.45-1.09.88-1.84-1.13-1.13-1.81.91-1.09-.45-.69-1.92h-1.6l-.63 1.94-1.11.45-1.84-.88-1.13 1.13.91 1.81-.45 1.09L0 7.23v1.59l1.94.64.45 1.09-.88 1.84 1.13 1.13 1.81-.91 1.09.45.69 1.92h1.59l.63-1.94 1.11-.45 1.84.88 1.13-1.13-.92-1.81.47-1.09L14 8.75v.02zM7 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z' />
          </svg>
        </span>
      </button>
    </div>

    <div className='actions-small-button'>
      <button onClick={onClose} className='close-button'>
        <span className='tooltipped tooltipped-s' aria-label='Close'>
          <svg className='octicon octicon-x' viewBox='0 0 12 16' width='12' height='16' aria-hidden='true'>
            <path fillRule='evenodd' d='M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z' />
          </svg>
        </span>
      </button>
    </div>
  </div>
)

export default Actions
