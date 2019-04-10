import React from 'react'
import { StorageSync } from '../../lib'
import BodyColor from '../bodyColor'

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
        <BodyColor isDark={this.state.darkMode} />
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

          <label className='label-enabled'>
            <input
              id='darkMode'
              type='checkbox'
              checked={Boolean(this.state.darkMode)}
              onChange={this.updateOptions}
            />
            <span className='label-body'>Enable <strong>Dark Mode</strong></span>
          </label>
        </div>
      </div>
    )
  }
}

export default Options
