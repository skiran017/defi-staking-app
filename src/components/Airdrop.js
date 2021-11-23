import React, { Component } from 'react';

class Airdrop extends Component {
  //Airdrop to have a timer that counts down
  //only start timer when user stakes some amount 50usdt
  constructor() {
    super();

    this.state = {
      time: {},
      seconds: 30,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;

    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  secondsToTime(secs) {
    let hours, minutes, seconds;
    hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  airdropReleaseTokens() {
    let stakingBal = this.props.stakingBalance;
    //50*10^18
    if (stakingBal >= '50000000000000000000') {
      this.startTimer();
      //if the timer hits 0 release the tokens from the scripts.js ???
    }
  }

  render() {
    this.airdropReleaseTokens();
    return (
      <div style={{ color: 'black' }}>
        {this.state.time.m}:{this.state.time.s}
      </div>
    );
  }
}

export default Airdrop;
