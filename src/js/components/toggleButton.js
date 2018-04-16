import React from 'react'


const ToggleButton = (props) => {
  let action = props.action;
  let checkboxValue = (action && action === 'on' ? 'on' : 'off');
  let state = {};
  
  const setTitle = (status) => {
    if (status == 'on') {
      state.title = "Hide Tree";
    }else if(status == 'off') {
      state.title = "Show Tree";
    }
  }
  setTitle(action);
  const handleOnClick = () => {
    let buttonStatus = document.body.classList.toggle('__hide_better_github_pr');
    if (buttonStatus) {
      setTitle('off');
    }else{
      setTitle('on');
    }
    console.log(this, state);
  }
  console.log(this, state);
  return (
          <div className='diffbar-item'>
            <label title={state.title} className="switch">
              <input type="checkbox" onChange={handleOnClick} value={checkboxValue} />
              <div></div>
            </label>
          </div>
      )
}

// // class ToggleButton extends React.Component {
// //   // This syntax ensures `this` is bound within handleClick.
// //   // Warning: this is *experimental* syntax.
// //   render() {
// //     return (
// //       <div className='diffbar-item'>
// //         <label title={title} className="switch">
// //           <input type="checkbox" />
// //           <div></div>
// //         </label>
// //       </div>
// //     );
// //   }
// // }

// class ToggleButton extends React.Component {
//   // This syntax ensures `this` is bound within handleClick.
//   // Warning: this is *experimental* syntax.
//   // handleClick = () => {
//   //   console.log('test comment');
//   // }

//   render() {
//     return (
//         <div className='diffbar-item'>
//             <label title={title} className="switch">
//               <input type="checkbox"/>
//                  <div></div>
//                </label>
//          </div>
//     );
//   }
// }
export default ToggleButton

