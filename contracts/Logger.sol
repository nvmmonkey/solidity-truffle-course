// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//It's a way for designer to say that
//"Any child of the abstract contract has to implement specified methods"

abstract contract Logger {
    uint public testNum;

    constructor() {
        testNum = 1000;
    }

    function emitLog() public pure virtual returns (bytes32);

    function test3() internal pure returns (uint) {
        return 100;
    }

    //private only constructor of the contract can call the function
    //internal constructor and  inheriting contract can call the function
    //inside and outside call both call the function
    //external can only be call outside the contract and other contract

    function test5() external pure returns (uint) {
        test3();
        return 10;
    }
}
