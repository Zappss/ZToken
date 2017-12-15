var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var MintableToken = artifacts.require("./token/MintableToken.sol");
var DutchAuction = artifacts.require("./DutchAuction.sol");


module.exports = function(deployer, network, accounts) {
  const owner = accounts[0]
  const wallet = accounts[1]
  let tokenAddress;
  let dutchAuction;

  deployer.then(function(){
    return deployer.deploy(MintableToken, { from: owner})
  })
  .then(function(){
    return MintableToken.deployed()
  })
  .then(function(tokenInstance){
    tokenAddress = tokenInstance.address
    return deployer.deploy(DutchAuction, wallet, tokenAddress, Math.pow(10,18), {from:owner})
  })
  .then(function(){
    return DutchAuction.deployed()
  })
  .then(function(dutchInstance){
    dutchAuction = dutchInstance;
    const starPrice = 2 * Math.pow(10,18)
    return dutchAuction.setup(20, starPrice, 100, {from:owner});
  }).then(function(err, txHash){
    return dutchAuction.startAuction({from:owner})
  })
};
