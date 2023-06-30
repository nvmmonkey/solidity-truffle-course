// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Storage {
    //total of 2^256-1 slot
    //each slot has 32bytes
    //indexing same like array/mapping, key & value pair

    //***V2 Storage Mapping */
    mapping(uint => uint) public aa; //slot 0
    mapping(address => uint) public bb; //slot 1

    //keccak256(key . slot)

    uint8 public a = 7; //1 byte
    uint16 public b = 10; //2 bytes
    address public c = 0xe3C05279aeA40E5fAC8bA9d1A8803D1707B1774b; //20 bytes
    bool d = true; //1 byte
    uint64 public e = 15; //8 bytes
    //32 bytes, all value stored in slot 2
    //truffle console
    //const instance = await Storage.deployed()
    //web3.eth.getStorageAt("0xC3754386b7FC994c0Eb4c049DAB7d75Da040d4f1", 3)
    //0x 000000000000000f 01 e3c05279aea40e5fac8ba9d1a8803d1707b1774b 000a 07

    uint256 public f = 200; //32 bytes --> slot 3
    //0x00000000000000000000000000000000000000000000000000000000000000 c8

    uint8 public g = 40; //1 bytes -> slot 4
    //0x00000000000000000000000000000000000000000000000000000000000000 28

    uint256 public h = 789; //32 bytes -> slot 5

    //0x000000000000000000000000000000000000000000000000000000000000 0315
    // *** Slot Optimization for Gas Consumption ***

    constructor() {
        aa[2] = 4;
        aa[3] = 10;

        bb[0xe3C05279aeA40E5fAC8bA9d1A8803D1707B1774b] = 100;
    }
}
