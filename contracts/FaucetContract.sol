// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
    //this is a special function
    //its called when you make a tx that does
    //not specify function name to call

    //External function are part of the contract
    //which meas they can be called via contracts and other
    //txs

    receive() external payable {}

    function addFunds() external payable {}

    //truffle console
    //const instance = await Faucet.deployed()
    //instance.addFunds({value:"$eth gwei"})
}

//Block info
//Nouce- a hash that when combined with the minHash proofs that
//the block has gone tru proof of work (POW)
//8 bytes =>64bits
