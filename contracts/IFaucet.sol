// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//Interface cannot inherit from other smart contract
//they can only inherit from other interfaces

//Interface cannot declare a constractor
//Cannot declare state variables
//all declared functions have to be external

interface IFaucet {
    function addFunds() external payable;

    function withdraw(uint withdrawAmount) external;
}
