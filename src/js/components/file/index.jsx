import React from 'react'
import { getClassWithColor } from 'file-icons-js'
import DiffStats from '../diffStats'
import { StorageSync } from '../../lib'

class File extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
    const options = await StorageSync.get()

    if (this.unmounted) {
      return
    }

    this.setState({ options })
  }

  componentWillUnmount () {
    this.unmounted = true
  }

  getHighlight ({ name, filter, index }) {
    const prefix = name.substring(0, index)
    const middle = name.substring(index, index + filter.length)
    const suffix = name.substring(index + filter.length)
    return (
      <>
        {prefix}
        {middle ? <span className='github-pr-file-highlight-filter'>{middle}</span> : null}
        {suffix}
      </>
    )
  }

  render () {
    const { name, href, hasComments, isDeleted, isVisible, diffStats, filter, isViewed } = this.props
    const { options = {} } = this.state
    const className = getClassWithColor(name)
    const topClassName = [
      'github-pr-file',
      isVisible && 'github-pr-file-highlight',
      isDeleted && 'github-pr-file-deleted',
      isViewed && 'github-pr-file-viewed'
    ].filter(Boolean).join(' ')

    const index = filter ? (name.toLowerCase() || '').indexOf(filter.toLowerCase()) : -1
    const highlightedName = (index === -1) ? name : this.getHighlight({ name, filter, index })

    return (
      <div className={topClassName}>
        <span className={`icon ${className}`} />
        <a href={href} className='link-gray-dark'>{highlightedName}</a>
        {options.diffStats && diffStats && <DiffStats diffStats={diffStats} />}
        {hasComments
          ? (
            <svg className='github-pr-file-comment octicon octicon-comment text-gray' viewBox='0 0 16 16' width='16' height='16' aria-hidden='true'>
              <path fillRule='evenodd' d='M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2 2v-2H2V2h12v8z' />
            </svg>
            )
          : null}
        {isViewed
          ? (
            <svg className='github-pr-file-checkmark octicon octicon-check' viewBox='0 0 12 16' version='1.1' width='12' height='16' aria-hidden='true'>
              <path fillRule='evenodd' d='M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z' />
            </svg>
            )
          : null}
      </div>
    )
  }
}

export default File
