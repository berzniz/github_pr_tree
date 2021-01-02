import React from 'react'
import { StorageSync } from '../../lib'

const chromeStoreUrl = 'https://chrome.google.com/webstore/detail/github-pull-request-tree/nfhdjopbhlggibjlimhdbogflgmbiahc'
const firefoxStoreUrl = 'https://addons.mozilla.org/en-US/firefox/addon/better-pull-request-for-github/'

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

  isChrome () {
    return typeof browser === 'undefined'
  }

  render () {
    return (
      <div className='container'>
        <div className='text-center'>
          <h1>Better Pull Request</h1>
          <p>
            Thanks for using Better Pull Request {this.isChrome() ? 'Chrome' : 'Firefox'} Extension! 🎉
          </p>
          <p>
            If you're enjoying this extension, please <a href={this.isChrome() ? chromeStoreUrl : firefoxStoreUrl} target='_blank'>rate it
            on the {this.isChrome() ? 'Chrome' : 'Firefox'} Store</a>.
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
          <label className='label-enabled'>
            <input
              id='singleDiff'
              type='checkbox'
              checked={Boolean(this.state.singleDiff)}
              onChange={this.updateOptions}
            />
            <span className='label-body'>Show <strong>Single Diff</strong> for a selected file</span>
          </label>
        </div>
      </div>
    )
  }
}

export default Options
