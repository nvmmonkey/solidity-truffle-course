// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
    uint public numberOfFunders;
    mapping(address => bool) private funders;

    //private -> can be accesible only within the smart contract
    //internal -> can be accesible within smart contract and also derived from smart contract

    receive() external payable {}

    function addFunds() external payable {
        address funder = msg.sender;

        if (!funders[funder]) {
            numberOfFunders++;
            funders[funder] = true;
        }
    }

    //truffle console
    //const instance = await Faucet.deployed()
    //instance.addFunds({from:accounts[0], value:"200000000"})
    //instance.addFunds({from:accounts[1], value:"200000000"})
    //instance.getFunderAtIndex(0)

    //instance.getAllFunders()

    //e.g. > instance.addFunds({value:"200000", from: accounts[0})
}
