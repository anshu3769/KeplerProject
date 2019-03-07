import React from 'react'

class Player extends React.Component {
  render(){

    return (
      <div>
        <div>
        {this.props.player.name} ({this.props.player.id})

      </div>
    </div>
    )
  }
}

export default Player
