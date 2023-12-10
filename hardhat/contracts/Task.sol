// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/Ownable.sol";

// Contract for individual tasks (Corresponds to a single issue in a GitHub repository)
contract Task is Ownable {

    // Contributor information
    address payable public contributor;
    string public contributorGithubId;

    // GitHub Issue information
    string public repoId;
    string public taskId;

    // Main Contract Address
    address public mainContractAddress;

    enum TaskStatus { OPEN, IN_PROGRESS, COMPLETE, CANCELED }
    TaskStatus public taskStatus;
     
    constructor(address _admin, string memory _repoId, string memory _taskId, address _mainContractAddress) Ownable(_admin) {
        // The task admin is the owner of the contract
        //transferOwnership(_admin);
        repoId = _repoId;
        taskId = _taskId;
        mainContractAddress = _mainContractAddress;
        taskStatus = TaskStatus.OPEN;
        contributor = payable(address(0x0));
    }

    // Fallback function
    fallback() external payable {}

    // Receive function
    receive() external payable {}

    function assignContributor(address _contributor, string memory _contributorGithubId) external onlyOpen onlyMainContract {
        contributor = payable(_contributor);
        contributorGithubId = _contributorGithubId;
        taskStatus = TaskStatus.IN_PROGRESS;
    }

    function removeContributor() external onlyNotClosed onlyMainContract {
        contributor = payable(0x0);
        contributorGithubId = "";
        taskStatus = TaskStatus.OPEN;
    }

    function setTaskCanceled() external onlyNotClosed onlyMainContract {
        payable(owner()).transfer(address(this).balance); // Refund the admin
        taskStatus = TaskStatus.CANCELED;
    }
    
    function setTaskComplete() external onlyNotClosed onlyMainContract {
        taskStatus = TaskStatus.COMPLETE;
        payable(contributor).transfer(address(this).balance);
    }

    function notClosed() public view returns (bool) {
        return (taskStatus != TaskStatus.CANCELED) && (taskStatus != TaskStatus.COMPLETE);
    }

    /* MODIFIERS */

    modifier onlyMainContract() {
        require(msg.sender == mainContractAddress, "Only the main contract can call this function.");
        _;
    }
    
    modifier onlyOpen() {
        require(taskStatus == TaskStatus.OPEN, "This function can only be called for open tasks.");
        _;
    }

    modifier onlyNotClosed() {
        require(notClosed(), "This function can only be called for tasks that are not closed.");
        _;
    }

}



