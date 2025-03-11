// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SimpleStorage {
    // number to be stored in the network
    uint256 private number;

    event NumberUpdated(uint256 newNumber);

    // setter
    function setNumber(uint256 _number) public {
        number = _number;
        emit NumberUpdated(_number);
    }

    // setter
    function getNumber() public view returns (uint256) {
        return number;
    }
}
