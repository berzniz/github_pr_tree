import React from 'react'
import fileIcons from 'file-icons-js'
import DiffStats from './diffStats'
import { StorageSync } from '../lib'

const highlightColor = '#ebebeb'
const transparentColor = 'transparent'

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

  render () {
    const { name, href, hasComments, isDeleted, isVisible, diffStats } = this.props
    const { options = {} } = this.state
    const className = fileIcons.getClassWithColor(name)
    const style = {
      background: isVisible ? highlightColor : transparentColor,
      textDecoration: isDeleted ? 'line-through' : null
    }

    return (
      <div className='github-pr-file' style={style}>
        <span className={`icon ${className}`} />
        <a href={href} className='link-gray-dark'>{name}</a>
        {options.diffStats && diffStats && <DiffStats diffStats={diffStats} />}
        {hasComments ? ' 💬' : ''}
      </div>
    )
  }
}

export default File
