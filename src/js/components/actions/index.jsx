import React from 'react'

const Actions = ({ filter, filterFiles, onFullWidth, onOptions, onClose }) => (
  <div className='actions'>
    <input type='text' value={filter} className='actions-filter' placeholder='Type to filter files' onChange={filterFiles} />

    <div className='actions-small-button'>
      <button onClick={onFullWidth} className='full-width-button' title='Toggle maximum width of github content'>
        <img
          src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGlkPSLQodC70L7QuV8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnIGlkPSJGdWxsc2NyZWVuIj48cGF0aCBkPSJNMzIsMWMwLTAuNTU4LTAuNDQyLTEtMS0xbC04Ljk4NSwwYy0wLjU2OCwwLTAuOTkxLDAuNDQ4LTAuOTkyLDEuMDE2QzIxLjAyMywxLjU4MywyMS40NDcsMiwyMi4wMTUsMkwzMCwyICAgbC0wLjAxNiw4LjAyM2MwLDAuNTY4LDAuNDMyLDEsMSwxYzAuNTY4LTAuMDAxLDEtMC40MzIsMS0xTDMyLDEuMDE1YzAtMC4wMDMtMC4wMDEtMC4wMDUtMC4wMDEtMC4wMDdDMzEuOTk5LDEuMDA1LDMyLDEuMDAzLDMyLDF6ICAgIiBmaWxsPSIjMTIxMzEzIi8+PHBhdGggZD0iTTEwLjAxNiwwSDEuMDMxQzEuMDI4LDAsMS4wMjYsMC4wMDEsMS4wMjMsMC4wMDFDMS4wMjEsMC4wMDEsMS4wMTgsMCwxLjAxNiwwYy0wLjU1OCwwLTEsMC40NDItMSwxICAgTDAsMTAuMDA4QzAsMTAuNTc2LDAuNDQ4LDExLDEuMDE2LDExQzEuNTgzLDExLDIsMTAuNTc2LDIsMTAuMDA4TDIuMDE2LDJoOGMwLjU2OCwwLDEtMC40MzIsMS0xQzExLjAxNSwwLjQzMiwxMC41ODMsMCwxMC4wMTYsMHoiIGZpbGw9IiMxMjEzMTMiLz48cGF0aCBkPSJNOS45ODUsMzBIMnYtOGMwLTAuNTY4LTAuNDMyLTEtMS0xYy0wLjU2OCwwLTEsMC40MzItMSwxdjguOTg1YzAsMC4wMDMsMC4wMDEsMC4wMDUsMC4wMDEsMC4wMDcgICBDMC4wMDEsMzAuOTk1LDAsMzAuOTk3LDAsMzFjMCwwLjU1OCwwLjQ0MiwxLDEsMWg4Ljk4NWMwLjU2OCwwLDAuOTkxLTAuNDQ4LDAuOTkyLTEuMDE2QzEwLjk3NywzMC40MTcsMTAuNTUzLDMwLDkuOTg1LDMweiIgZmlsbD0iIzEyMTMxMyIvPjxwYXRoIGQ9Ik0zMC45ODQsMjEuMDIzYy0wLjU2OCwwLTAuOTg1LDAuNDI0LTAuOTg0LDAuOTkyVjMwbC04LDBjLTAuNTY4LDAtMSwwLjQzMi0xLDFjMCwwLjU2OCwwLjQzMiwxLDEsMSAgIGw4Ljk4NSwwYzAuMDAzLDAsMC4wMDUtMC4wMDEsMC4wMDctMC4wMDFDMzAuOTk1LDMxLjk5OCwzMC45OTcsMzIsMzEsMzJjMC41NTgsMCwxLTAuNDQyLDEtMXYtOC45ODUgICBDMzIsMjEuNDQ3LDMxLjU1MiwyMS4wMjMsMzAuOTg0LDIxLjAyM3oiIGZpbGw9IiMxMjEzMTMiLz48L2c+PGcvPjxnLz48Zy8+PGcvPjxnLz48Zy8+PC9zdmc+'
          width={16}
          height={16}
          alt='Toggle full width'
        />
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
