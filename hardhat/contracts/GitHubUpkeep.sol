// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";
import "./Task.sol";

// TODO: make sure this contract is compatible with CCIP and compliant with the Chainlink Keeper contract interface

// TODO: We might need to use Data Streams to get the data from GitHub
// https://docs.chain.link/chainlink-automation/reference/automation-interfaces/#streamslookupcompatibleinterface

contract GitHubUpkeep is KeeperCompatibleInterface {
    
    uint256 public interval = 10 minutes;

    uint256 public lastUpdated;

    address public task;

    //TODO: Is this constructor correct?
    constructor(address _task) KeeperCompatibleInterface() {
        task = _task;
    }

    function timeSinceUpdate() public view returns (uint256) {
        return block.timestamp - lastUpdated;
    }

    function upkeepDue() public view returns (bool) {
        return timeSinceUpdate() >= interval;
    }

    function checkUpkeep(bytes calldata checkData) external override returns (bool upkeepNeeded, bytes memory performData) {
        // Logic to check if any task status needs updating
        // e.g., check a variable updated by an oracle or off-chain computation
        upkeepNeeded = upkeepDue();
        performData = checkData;
    }

    function performUpkeep(bytes calldata performData) external override {
        // Logic to update task status and distribute rewards
        // e.g., call a function in Task.sol to update status and trigger reward distribution

        // Update lastUpdated
        lastUpdated = block.timestamp;

        // Determine if GitHub issue is closed
        if (true /* performData == "complete" */) { // TODO: Figure out how to get this data from the GitHub API
            // If closed, call Task.setTaskComplete()
            Task t = Task(task);
            require(t.exists());
            t.setTaskComplete();
        }
        else {
            // If not closed, task is still open
        }
    }


}
