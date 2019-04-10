import React from 'react'

const className = '__better_github_pr_dark_mode'

class BodyColor extends React.Component {
  componentDidMount () {
    document.body.classList.toggle(className, Boolean(this.props.isDark))
  }

  componentDidUpdate () {
    document.body.classList.toggle(className, Boolean(this.props.isDark))
  }

  componentWillUnmount () {
    document.body.classList.remove(className)
  }

  render () {
    return null
  }
}

export default BodyColor
