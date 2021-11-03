import React, { Component } from 'react';
import { VscDebugStart, VscDebugPause, VscDebugRestart } from 'react-icons/vsc';
import Input from './Input';
import TimeoutVideo from './TimeoutVideo';
import './App.css';

const musics = [
  "The Ink Spots - It's All Over But The Crying",
  'Billie Holiday - Easy Living',
  'Andrews Sisters & Danny Kaye - Civilization',
  "The Ink Spots - I Don't Want To Set The World On Fire",
  'Connie Allen - Rocket 69',
];

class App extends Component {
  constructor() {
    super();

    const publicFolder = process.env.PUBLIC_URL;
    const soundtrack = musics.map(
      (musicName) => new Audio(`${publicFolder}/assets/soundtrack/${musicName}.mp3`)
    );

    this.state = {
      hour: 0,
      minute: 0,
      second: 0,
      timer: null,
      isStarted: false,
      isPaused: false,
      isEnded: false,
      introEnded: false,
      soundtrack,
      musicName: 'Awaiting User',
      fieldsBlinker: null,
      timerDisplay: true,
    };
  }

  componentWillUnmount() {
    const { soundtrack, timer, fieldsBlinker } = this.state;
    clearInterval(timer);
    clearInterval(fieldsBlinker);
    soundtrack.forEach((music) => music.pause());
  }

  startTimer = () => {
    const { soundtrack } = this.state;
    if (soundtrack.every(({ paused }) => paused)) this.playTrack();

    const timer = setInterval(() => {
      this.timerHandler(timer);
    }, 1000);

    this.setState({
      isStarted: true,
      isPaused: false,
      timer,
    });
  };

  pauseTimer = () => {
    const { timer, fieldsBlinker } = this.state;
    clearInterval(timer);
    clearInterval(fieldsBlinker);

    this.setState({
      isPaused: true,
      timer: null,
      fieldsBlinker: null,
      timerDisplay: true,
    });
  };

  resetTimer = () => {
    this.setState({
      hour: 0,
      minute: 0,
      second: 0,
      isStarted: false,
      isPaused: false,
      isEnded: false,
      timer: null,
    });
  };

  timerHandler = (timer) => {
    let { hour, minute, second } = this.state;
    const timeArr = [Number(hour), Number(minute), Number(second)];
    const CLOCK_MAX = 59;

    if (timeArr.every((timeUnit) => timeUnit === 0)) {
      clearInterval(timer);
      this.endTimer();
    } else if (minute === 0 && second === 0) {
      hour -= 1;
      minute = CLOCK_MAX;
      second = CLOCK_MAX;
    } else if (second === 0) {
      minute -= 1;
      second = CLOCK_MAX;
    } else {
      second -= 1;
    }

    this.setState({
      hour,
      minute,
      second,
    });
  };

  endTimer = () => {
    const fieldsBlinker = setInterval(() => {
      this.setState(({ timerDisplay }) => ({
        timerDisplay: !timerDisplay,
      }));
    }, 500);

    this.setState({ fieldsBlinker, isEnded: true });
  };

  endTimeoutVideo = () => this.setState({ isEnded: false })

  endIntro = () => this.setState({ introEnded: true });

  onChange = ({ target: { name, value } }) => {
    const CLOCK_MAX = 59;

    value = String(value);
    if (value.length <= 2 && Number(value) <= CLOCK_MAX) {
      this.setState({ [name]: Number(value) });
    }
  };

  playTrack = () => {
    const { soundtrack } = this.state;

    soundtrack.forEach((music, idx) => {
      music.volume = 0.5;
      if (idx === 0) {
        music.play();

        const musicName = `${musics[idx]} ♪`;
        this.setState({ musicName });
      }
      if (idx !== soundtrack.length - 1) {
        music.addEventListener('ended', () => {
          const music = soundtrack[idx + 1];
          music.play();

          const musicName = `${musics[idx + 1]} ♪`;
          this.setState({ musicName });
        });
      }
      else {
        music.addEventListener('ended', () => this.playTrack());
      }
    });
  };
  render() {
    const { hour, minute, second, isStarted, isPaused, isEnded, introEnded, musicName, timerDisplay } =
      this.state;
    const { startTimer, pauseTimer, resetTimer, onChange, endIntro, endTimeoutVideo } = this;
    const timeArr = [hour, minute, second].map((timeUnit) =>
      String(timeUnit).padStart(2, '0')
    );

    // https://create-react-app.dev/docs/using-the-public-folder/
    const publicFolder = process.env.PUBLIC_URL;

    return (
      <div className="App">
        <img src={ `${publicFolder}/assets/pip-boy.png` } alt="Pip Boy" className="pip-boy-image" />
        <TimeoutVideo canPlay={ isEnded } handleEnd={ () => endTimeoutVideo() } />
        <div className="pip-boy-screen">
        {!introEnded && (
          <video autoPlay muted onEnded={endIntro} className="intro-video">
            <source src={ `${publicFolder}/assets/initialize.mp4` } type="video/mp4" />
          </video>
        )}
        <h2 className="music-name">{musicName}</h2>
        {!isStarted ? (
          <>
            <div className="timer-input">
              <Input name="hour" value={hour} onChange={onChange} />
              {':'}
              <Input name="minute" value={minute} onChange={onChange} />
              {':'}
              <Input name="second" value={second} onChange={onChange} />
            </div>
            <button type="button" onClick={startTimer}>
              <VscDebugStart />
            </button>
          </>
        ) : (
          <>
            <div className={`timer ${ !timerDisplay && 'hidden' }`}>
              <span>{timeArr[0]}</span>
              {':'}
              <span>{timeArr[1]}</span>
              {':'}
              <span>{timeArr[2]}</span>
            </div>
            {!isPaused ? (
              <button type="button" onClick={pauseTimer}>
                <VscDebugPause />
              </button>
            ) : (
              <div>
                <button type="button" onClick={startTimer}>
                  <VscDebugStart />
                </button>
                <button type="button" onClick={resetTimer}>
                  <VscDebugRestart />
                </button>
              </div>
            )}
          </>
        )}
        </div>
      </div>
    );
  }
}

export default App;
