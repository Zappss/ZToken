import React, { Component } from 'react'
import MintableToken from '../build/contracts/MintableToken.json'
import DutchAuction from '../build/contracts/DutchAuction.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      auctionContract: null,
      web3: null,
      accounts: [],
    }

    this.handleBid = this.handleBid.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const auction = contract(DutchAuction)
    const token = contract(MintableToken)
    auction.setProvider(this.state.web3.currentProvider)
    token.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var auctionInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      auction.deployed().then((instance) => {
        auctionInstance = instance
        // Stores a given value, 5 by default.
        this.setState({
          accounts: accounts,
          auctionContract: auctionInstance
        })
        return auctionInstance.calcTokenPrice();
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  handleBid() {
    return this.state.web3.eth.sendTransaction({to:this.state.auctionContract.address, from:this.state.accounts[0], value:200000}, (err, txHash) => {
      if(!err){
        console.log("Bid successful. Hash: ", txHash);
      }
    })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Z Token</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Bid on the dutch auction</h2>
              <button onClick={this.handleBid}> BID </button>
              <p>Current price: {this.state.storageValue} wei/token </p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
