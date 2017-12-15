var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var MintableToken = artifacts.require("./token/MintableToken.sol");
var DutchAuction = artifacts.require("./DutchAuction.sol");


module.exports = function(deployer) {
  const owner = accounts[0]
  const wallet = accounts[1]
  let tokenAddress;
  let dutchAuction;

  deployer.then(function(){
    return MintableToken.new({from: owner})
  })
  .then(function(tokenInstance){
    tokenAddress = tokenInstance.address
    return DutchAuction.new(wallet, tokenAddress, Math.pow(10,21), {from: owner})
  })
  .then(function(dutchInstance){
    dutchAuction = dutchInstance;
    return dutchAuction.setup(20, 2 * Math.pow(10,18), 0.1);
  })
  .then(function(err, txHash){
    if(!err) {
      dutchAuction.startAuction();
    }
  })
};
