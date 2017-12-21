import React, { Component } from 'react'
import MintableToken from '../build/contracts/MintableToken.json'
import DutchAuction from '../build/contracts/DutchAuction.json'
import getWeb3 from './utils/getWeb3'

import MainAction from './MainAction.js'
import StatisticContainer from './StatisticContainer.js'
import { Container, Row, Col } from 'reactstrap';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './css/bootstrap.min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      saleContract: null,
      saleState: {
        currentPrice: null,
      },
      saleData: null,
      web3: null,
      accounts: [],
    }

    this.handleBid = this.handleBid.bind(this);
    this.fetchNode = this.fetchNode.bind(this);
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

  componentDidMount() {
    console.log("Inside Did Mount");
    // setInterval(this.fetchNode,
    //   10000
    // );
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
        return this.setState({ saleState: { ...this.state.saleState, currentPrice: result} });
      })
    })
  }

  fetchNode(){
    console.log("Inside fetch node");
    if(this.state.auctionContract == null) {
      return
    }

    let saleState = {}
    console.log(this.state.auctionContract);
    return this.state.auctionContract.startTime()
    .then((result) => {
      saleState.startTime = result;
      return this.state.auctionContract.endTime()
    })
    .then((result) => {
      saleState.endTime = result;
      return this.state.auctionContract.totalReceived()
    })
    .then((total) => {
      saleState.totalReceived = total;
      this.setState({
        saleData: saleState,
      })
      console.log(this.state.saleData);
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
        <Container>
          <Row>
            <Col>
              <MainAction sale={this.state.auctionContract} accounts={this.state.accounts} bidHandler={this.handleBid}/>
            </Col>
          </Row>
          <Row>
            <StatisticContainer saleData={this.state.saleData}/>
          </Row>
        </Container>

        {/* <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1 className="splash-head">Z Token</h1>
              <h2>Bid on the dutch auction</h2>
              <button className="pure-button pure-button-primary" onClick={this.handleBid}> BID </button>
              <p>Current price: {this.state.storageValue} wei/token </p>
            </div>
          </div>
        </main> */}

      </div>
    );
  }
}

// saleState: {
//   startTime: null,
//   endTime: null,
//   totalReceived: null,
//   inicialPrice: null,
//   decreaseRate: null,
//   currentPrice: null,
// },

export default App
