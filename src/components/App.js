/* eslint-disable no-lone-blocks */
import React, { Component } from 'react';
import Web3 from 'web3';

import Navbar from './Navbar';
import Main from './Main';
import ParticleSettings from './ParticleSettings';
import Tether from '../truffle_abis/Tether.json';
import Kiri from '../truffle_abis/Kiri.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';

import './App.css';

class App extends Component {
  async UNSAFE_componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('No ethereum broswer detected! You can check out MetaMask!');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    this.setState({ account: account[0] });
    const networkId = await web3.eth.net.getId();

    //Load Tether Contract
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      this.setState({ tether });
      let tetherBalance = await tether.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ tetherBalance: tetherBalance.toString() });
    } else {
      window.alert('Error! Tether contract not deployed - no detected network');
    }

    //Load Reward Token Contract
    const rewardData = Kiri.networks[networkId];
    if (rewardData) {
      const rwd = new web3.eth.Contract(Kiri.abi, rewardData.address);
      this.setState({ rwd: rwd });
      let rewardBalance = await rwd.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ rwdBalance: rewardBalance.toString() });
    } else {
      window.alert('Reward Token contract not deployed');
    }

    //Load DecentralBank Contract
    const dBankData = DecentralBank.networks[networkId];
    if (dBankData) {
      const decentralBank = new web3.eth.Contract(
        DecentralBank.abi,
        dBankData.address
      );
      this.setState({ decentralBank: decentralBank });
      let stakingBalance = await decentralBank.methods
        .stakingBalance(this.state.account)
        .call();
      this.setState({ stakingBalance: stakingBalance.toString() });
    } else {
      window.alert('Decentral Bank Contract not deployes');
    }
    this.setState({ loading: false });
  }

  //Staking Function
  stakeTokens = (amount) => {
    this.setState({ loading: true });

    this.state.tether.methods
      .approve(this.state.decentralBank._address, amount)
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        this.state.decentralBank.methods
          .depositTokens(amount)
          .send({ from: this.state.account })
          .on('transactionHash', (hash) => {
            this.setState({ loading: false });
          });
      });
  };

  //Unstake Function
  unstakeTokens = () => {
    this.setState({ loading: true });
    this.state.decentralBank.methods
      .unstakeTokens()
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        this.setState({ loading: false });
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: '0x0',
      tether: {},
      rwd: {},
      decentralBank: {},
      tetherBalance: '0',
      rwdBalance: '0',
      stakingBalance: '0',
      loading: true,
    };
  }
  render() {
    let content;
    {
      this.state.loading
        ? (content = (
            <p
              id="loader"
              className="text-center"
              style={{ margin: '30px', color: 'white' }}
            >
              LOADING PLEASE..
            </p>
          ))
        : (content = (
            <Main
              tetherBalance={this.state.tetherBalance}
              rwdBalance={this.state.rwdBalance}
              stakingBalance={this.state.stakingBalance}
              stakeTokens={this.stakeTokens}
              unstakeTokens={this.unstakeTokens}
            />
          ));
    }
    return (
      <div className="app" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute' }}>
          <ParticleSettings />
        </div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: '600px', minHeight: '100vm' }}
            >
              <div>{content}</div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
