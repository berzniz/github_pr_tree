import React from 'react'
import { StorageSync } from '../../lib'

const url = 'https://chrome.google.com/webstore/detail/github-pull-request-tree/nfhdjopbhlggibjlimhdbogflgmbiahc'

class Options extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.updateOptions = this.updateOptions.bind(this)
  }

  async componentDidMount () {
    this.setState(await StorageSync.get())
  }

  async updateOptions () {
    await StorageSync.save()
    this.setState(await StorageSync.get())
  }

  render () {
    return (
      <div className='container'>
        <div className='text-center'>
          <h1>Better Pull Request</h1>
          <p>
            Thanks for using Better Pull Request Chrome Extension! 🎉
          </p>
          <p>
            If you're enjoying this extension, please <a href={url}>rate it on the Chrome Store</a>.
          </p>
        </div>
        <div>
          <h4>Customize</h4>
          <label className='label-enabled'>
            <input
              id='diffStats'
              type='checkbox'
              checked={Boolean(this.state.diffStats)}
              onChange={this.updateOptions}
            />
            <span className='label-body'>Show <strong>Diff Stats</strong> next to files</span>
          </label>

          <label className='label-disabled'>
            <input type='checkbox' disabled />
            <span className='label-body'>Enable <strong>Dark Mode</strong> (coming soon)</span>
          </label>
        </div>
      </div>
    )
  }
}

export default Options
