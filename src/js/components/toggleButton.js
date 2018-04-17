import React from 'react'

class ToggleButton extends React.Component {
  constructor (props) {
    super(props)
    let buttonText = props.buttonText
    this.state = {
      active: props.show === 'true',
      buttonStatus: buttonText
    }
  };

  toggleClass () {
    const currentState = this.state.active
    document.body.classList.toggle('__hide_better_github_pr')
    this.setState({
      active: !currentState,
      buttonStatus: currentState ? 'Show Tree' : 'Hide Tree'
    })
  };

  render () {
    return (
      <div className='diffbar-item'>
        <label title={this.state.buttonStatus} className={`switch ${this.state.active ? 'checked' : ''}`}>
          <input type='checkbox' onChange={this.toggleClass.bind(this)} defaultChecked={this.state.active} />
          <div />
        </label>
      </div>
    )
  }
}
export default ToggleButton
