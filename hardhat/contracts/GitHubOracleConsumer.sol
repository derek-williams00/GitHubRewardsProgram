// SPDX-License-Identifier: MIT

pragma solidity ^0.8.22;

import "./GitHubOracle.sol";

contract GitHubRewardsProgramConsumer {
    GitHubOracle private oracle;

    constructor(address _oracleAddress) {
        oracle = GitHubOracle(_oracleAddress);
    }

    function requestGitHubIssue(string memory _owner, string memory _repo, string memory _issue_number) public {
        oracle.requestGitHubIssueData(_owner, _repo, _issue_number);
    }

    // Function to receive the response from Oracle
    function onGitHubIssueResponse(string memory _issueData) internal {
        // Process the GitHub issue data
        // Example: Update task status, assign rewards, etc.
    }
}
