// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Owned.sol";

contract Faucet {
    uint public numberOfFunders;

    mapping(address => bool) private funders;
    mapping(uint => address) private lutFunders;

    modifier limitWithdraw(uint withdrawAmount) {
        require(
            withdrawAmount <= 100000000000000000,
            "Cannot withdraw more than 0.1 ether "
        );
        _;
    }

    //private -> can be accesible only within the smart contract
    //internal -> can be accesible within smart contract and also derived from smart contract

    function transferOwnership(address newOwner) external onlyOwner {
        owner = newOwner;
    }

    receive() external payable {}

    function addFunds() external payable {
        address funder = msg.sender;

        if (!funders[funder]) {
            uint index = numberOfFunders++;
            //index start at zero only when declare varible
            funders[funder] = true;
            lutFunders[index] = funder;
        }
    }

    function test1() external onlyOwner {
        //someting managing stuff that only admin should have access to
    }

    function test2() external onlyOwner {
        //someting managing stuff that only admin should have access to
    }

    function withdraw(
        uint withdrawAmount
    ) external limitWithdraw(withdrawAmount) {
        payable(msg.sender).transfer(withdrawAmount);
    }

    function getAllFunders() external view returns (address[] memory) {
        address[] memory _funders = new address[](numberOfFunders);

        for (uint i = 0; i < numberOfFunders; i++) {
            _funders[i] = lutFunders[i];
        }

        return _funders;
    }

    function getFunderAtIndex(uint8 index) external view returns (address) {
        return lutFunders[index];
    }

    //truffle console
    //const instance = await Faucet.deployed()
    //instance.addFunds({from:accounts[0], value:"2000000000000000000"})
    //instance.addFunds({from:accounts[1], value:"2000000000000000000"})

    //instance.withdraw("500000000000000000", {from: accounts[1]})

    //instance.getFunderAtIndex(0)
    //instance.getAllFunders()

    //e.g. > instance.addFunds({value:"200000", from: accounts[0})
}
