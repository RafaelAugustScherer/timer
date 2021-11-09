import React, { Component } from 'react';
import { VscDebugStart, VscDebugPause, VscDebugRestart } from 'react-icons/vsc';
import Input from './components/Input';
import TimeoutVideo from './components/TimeoutVideo';
import Soundtrack from './components/Soundtrack';
import MuteSound from './components/MuteSound';
import './App.css';

class App extends Component {
  constructor() {
    super();

    const soundtrack = new Soundtrack(this.updateMusicName);

    this.state = {
      time: {
        hour: '00',
        minute: '00',
        second: '00',
      },
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

    soundtrack.pause();

    clearInterval(timer);
    clearInterval(fieldsBlinker);
  }

  startTimer = () => {
    const { soundtrack } = this.state;
    if (!soundtrack.isPlaying()) soundtrack.play();

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

  endTimer = () => {
    const { soundtrack } = this.state;
    soundtrack.pause();

    const fieldsBlinker = setInterval(() => {
      this.setState(({ timerDisplay }) => ({
        timerDisplay: !timerDisplay,
      }));
    }, 500);
    this.setState({ fieldsBlinker, isEnded: true, isStarted: false, isPaused: false });
  };

  timerHandler = (timer) => {
    let { time } = this.state;
    let [hour, minute, second] = Object.values(time).map((value) => Number(value));
    const CLOCK_MAX = 59;

    if (hour === 0 && minute === 0 && second === 0) {
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

    time = Object.entries({ hour, minute, second }).reduce(
      (acc, [timeUnit, value]) => ({
        ...acc,
        [timeUnit]: value < 10 ? `0${value}` : String(value),
      }),
      {}
    );
    this.setState({ time });
  };

  endIntro = () => this.setState({ introEnded: true });
  
  endTimeoutVideo = () => {
    const { fieldsBlinker } = this.state;

    clearInterval(fieldsBlinker);
    this.setState({ isEnded: false, fieldsBlinker: null, timerDisplay: true });
  }

  onChange = ({ target: { name, value } }) => {
    const { time, soundtrack } = this.state;
    const CLOCK_MAX = name === 'hour' ? 99 : 59;

    value = Number(value);
    value = value < 10 ? `0${value}` : String(value);
    
    if (value.length <= 2 && Number(value) <= CLOCK_MAX) {
      this.setState({
        time: {
          ...time,
          [name]: value,
        },
      });
    }
    if (name === 'hour' && value === '69') {
      soundtrack.changeMusic('Connie Allen - Rocket 69');
    }
    console.log(name, value);
  };

  updateMusicName = (musicName) => this.setState({ musicName });

  render() {
    const { time, isStarted, isPaused, isEnded, introEnded, musicName, timerDisplay, soundtrack } =
      this.state;
    const { hour, minute, second } = time;
    const { startTimer, pauseTimer, resetTimer, onChange, endIntro, endTimeoutVideo } =
      this;

    // https://create-react-app.dev/docs/using-the-public-folder/
    const publicFolder = process.env.PUBLIC_URL;
    
    document.title = `Pip Boy's Timer (${hour}:${minute}:${second})`
    return (
      <div className="App">
        <img
          key="pip-boy-image"
          src={`${publicFolder}/assets/pip-boy.png`}
          alt="Pip Boy"
          className="pip-boy-image"
        />
        <TimeoutVideo key="timeout-video" canPlay={isEnded} handleEnd={endTimeoutVideo} />
        <div key="pip-boy-screen" className="pip-boy-screen">
          <MuteSound music={ soundtrack.music } />
          {!introEnded && (
            <video autoPlay muted onEnded={endIntro} className="intro-video">
              <source src={`${publicFolder}/assets/initialize.mp4`} type="video/mp4" />
            </video>
          )}
          <h2 className="music-name">{musicName}</h2>
          {
            <div
              className={`timer${!isStarted ? '-input' : ''}${
                !timerDisplay ? ' hidden' : ''
              }`}
            >
              {Object.entries(time).map(([timeUnit, value], idx, arr) => (
                <>
                  {!isStarted ? (
                    <Input
                      key={timeUnit}
                      name={timeUnit}
                      value={value}
                      onChange={onChange}
                    />
                  ) : (
                    <span key={timeUnit}>{value}</span>
                  )}
                  {idx !== arr.length - 1 && ':'}
                </>
              ))}
            </div>
          }
          {!isStarted ? (
            <button key="start-timer-button" type="button" onClick={startTimer}>
              <VscDebugStart />
            </button>
          ) : !isPaused ? (
            <button key="pause-timer-button" type="button" onClick={pauseTimer}>
              <VscDebugPause />
            </button>
          ) : (
            <div>
              <button key="start-timer-button" type="button" onClick={startTimer}>
                <VscDebugStart />
              </button>
              <button key="restart-timer-button" type="button" onClick={resetTimer}>
                <VscDebugRestart />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
