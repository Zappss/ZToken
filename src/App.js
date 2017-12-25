import React, { Component } from 'react'
import MintableToken from '../build/contracts/MintableToken.json'
import DutchAuction from '../build/contracts/DutchAuction.json'
import getWeb3 from './utils/getWeb3'

import MainAction from './MainAction.js'
import StatisticContainer from './StatisticContainer.js'
import ComplexBid from './ComplexBid.js'
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
      saleData: null,
      web3: null,
      accounts: [],
    }

    this.handleBid = this.handleBid.bind(this);
    this.advanceBlock = this.advanceBlock.bind(this);
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
    setInterval(this.fetchNode,
      10000
    );
    setInterval(this.advanceBlock,
      10000
    );
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
        return this.fetchNode()
      })
    })
  }

  advanceBlock(){
    console.log("inside advanceBlock");
    this.state.web3.currentProvider.sendAsync({
      jsonrpc: '2.0',
      method: 'evm_mine',
      id: Date.now(),
    }, function(err, res){
      if(err){
        console.log("err", err);
      } else {
        console.log("res",res);
      }
    })
  }

  fetchNode(){
    if(this.state.auctionContract == null) {
      return
    }

    let saleState = {}
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
      saleState.totalReceived = total.toNumber();
      return this.state.auctionContract.inicialPrice()
    })
    .then((price) => {
      saleState.inicialPrice = price.toNumber();
      return this.state.auctionContract.decreaseRate()
    })
    .then((rate) => {
      saleState.decreaseRate = rate.toNumber()
      return this.state.auctionContract.calcTokenPrice()
    })
    .then((price) => {
      saleState.currentPrice = this.state.web3.fromWei(price.toNumber(), 'ether')
      this.setState({
        saleData: saleState,
      })
    })
  }

  handleBid() {
    return this.state.web3.eth.sendTransaction({to:this.state.auctionContract.address, from:this.state.accounts[0], value:1000000000000000000, nonce:189}, (err, txHash) => {
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
      </div>
    );
  }
}
export default App
