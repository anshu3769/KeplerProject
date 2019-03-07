import React from 'react';

class StartButton extends React.Component {
   render() {
     console.log("button")
     return(
      <div style = {{marginTop:1, marginBottom:20}}>
       <button onClick={this.props.startCountDown}>Start</button>
     </div>
      );

  }

}

export default StartButton;
