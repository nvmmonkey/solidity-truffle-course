// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
    address[] private funders;

    //private -> can be accesible only within the smart contract
    //internal -> can be accesible within smart contract and also derived from smart contract

    receive() external payable {}

    function addFunds() external payable {
        funders.push(msg.sender);
    }

    function getAllFunders() public view returns (address[] memory) {
        return funders;
        //use view here because the address array alters the storage state
        //public can be call in other functions
    }

    function getFunderAtIndex(uint8 index) external view returns (address) {
        address[] memory _funders = getAllFunders();
        return _funders[index];
    }

    //truffle console
    //const instance = await Faucet.deployed()
    //instance.addFunds({value:"$eth gwei"})
    
    //e.g. > instance.addFunds({value:"200000", from: accounts[0})
}
