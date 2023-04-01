// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
    address[] public funders;

    receive() external payable {}

    function addFunds() external payable {
        funders.push(msg.sender);
    }

    function getAllFunders() external view returns (address[] memory) {
        return funders;
        //use view here because the address array alters the storage state
    }

    //truffle console
    //const instance = await Faucet.deployed()
    //instance.addFunds({value:"$eth gwei"})
}
