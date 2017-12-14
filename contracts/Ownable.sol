pragma solidity 0.4.18;

contract Ownable {

    address private owner;

    event LogOwnerChanged(
        address oldOwner,
        address newOwner);

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function Ownable() public {
        owner = msg.sender;
    }

    function getOwner() public constant returns(address _owner) {
        return owner;
    }

    function changeOwner(address newOwner)
        public
        onlyOwner
        returns(bool success)
    {
        require(newOwner != 0);
        LogOwnerChanged(owner, newOwner);
        owner = newOwner;
        return true;
    }

}
