import React, { Component } from 'react';
import { VscMute, VscUnmute } from 'react-icons/vsc';

class MuteSound extends Component {
  constructor(props) {
    super();
    const { music } = props;

    this.state = {
      isMuted: false,
      music,
    };
  }
  
  click = () => {
    const { isMuted, music } = this.state;
    
    music.muted = !music.muted;
    this.setState({ isMuted: !isMuted })
  }

  render() {
    const { isMuted } = this.state;
    const { click } = this;

    return (
      <>
      {
        isMuted ? (
          <VscMute onClick={ click } className="mute-sound-icon" />
        ) : (
          <VscUnmute onClick={ click } className="mute-sound-icon" />
        )
      }
      </>
    )
  };
};

export default MuteSound;