// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Storage {
    //total of 2^256-1 slot
    //each slot has 32bytes
    //indexing same like array/mapping, key & value pair

    uint8 public a = 7; //1 byte
    uint16 public b = 10; //2 bytes
    address public c = 0xe3C05279aeA40E5fAC8bA9d1A8803D1707B1774b; //20 bytes
    bool d = true; //1 byte
    uint64 public e = 15; //8 bytes
    //32 bytes, all value stored in slot 0

    uint256 public f = 200; //32 bytes --> slot 1

    uint8 public g = 40; //1 bytes -> slot 2

    uint256 public h = 789; //32 bytes -> slot 3
    // *** Slot Optimization for Gas Consumption ***
}
