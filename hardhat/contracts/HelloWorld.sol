// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "hardhat/console.sol";

contract HelloWorld {
    mapping(address => string) private userStrings;

    event StringSet(address indexed setter, string newValue);

    function setString(string memory _newString) public {
        userStrings[msg.sender] = _newString;
        emit StringSet(msg.sender, _newString);
        console.log("setString was called with value: %s", _newString);
    }

    function getString() public view returns (string memory) {
        string memory storedString = userStrings[msg.sender];
        console.log("getString was called and returned: %s", storedString);
        return storedString;
    }
}
