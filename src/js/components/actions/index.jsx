import React, { useState } from 'react'

const Actions = ({ filter, filterFiles, onFullWidth, onOptions, onClose, onReloadTree, onShowViewed, onHideViewed }) => {
  const [isViewedHidden, setIsViewedHidden] = useState(false)

  const handleHideViewed = () => {
    if (isViewedHidden) onShowViewed()
    else onHideViewed()

    setIsViewedHidden(!isViewedHidden)
  }

  return (
    <div className='actions'>
      <input type='text' value={filter} className='actions-filter' placeholder='Type to filter files' onChange={filterFiles} />

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
        <button onClick={onReloadTree} className='reload-tree-button'>
          <span className='tooltipped tooltipped-s' aria-label='Reload tree'>
            <svg className='octicon octicon-sync' xmlns='http://www.w3.org/2000/svg' width='16px' height='16px' viewBox='0 0 16 16'>
              <path fillRule='evenodd' d='M8 2.5a5.487 5.487 0 0 0-4.131 1.869l1.204 1.204A.25.25 0 0 1 4.896 6H1.25A.25.25 0 0 1 1 5.75V2.104a.25.25 0 0 1 .427-.177l1.38 1.38A7.001 7.001 0 0 1 14.95 7.16a.75.75 0 1 1-1.49.178A5.501 5.501 0 0 0 8 2.5zM1.705 8.005a.75.75 0 0 1 .834.656a5.501 5.501 0 0 0 9.592 2.97l-1.204-1.204a.25.25 0 0 1 .177-.427h3.646a.25.25 0 0 1 .25.25v3.646a.25.25 0 0 1-.427.177l-1.38-1.38A7.001 7.001 0 0 1 1.05 8.84a.75.75 0 0 1 .656-.834z' />
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
        <button onClick={handleHideViewed} className='settings-button'>
          <span className='tooltipped tooltipped-s' aria-label={isViewedHidden ? 'Show viewed files' : 'Hide viewed files'}>
            {isViewedHidden
              ? (<svg viewBox='0 0 640 312' width='16' height='16' aria-hidden='true' focusable='false' data-prefix='fas' data-icon='eye-slash' class='svg-inline--fa fa-eye-slash fa-w-20' role='img' xmlns='http://www.w3.org/2000/svg'><path fill='currentColor' d='M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z' /></svg>)
              : (<svg viewBox='0 0 640 312' width='16' height='16' aria-hidden='true' focusable='false' data-prefix='fas' data-icon='eye' class='svg-inline--fa fa-eye fa-w-18' role='img' xmlns='http://www.w3.org/2000/svg'><path fill='currentColor' d='M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z' /></svg>)}
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
}

export default Actions
