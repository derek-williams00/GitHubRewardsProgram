// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Task is Ownable {

    // Contributor information
    address public contributor;
    string public contributorGithubId;
    string private contributorPreferredPaymentMehtod;

    // Task information
    string public repoId;
    string public taskId;


    enum TaskStatus { OPEN, IN_PROGRESS, COMPLETE, CANCELED }
    TaskStatus public taskStatus;
     
    // Upkeep information
    address public upkeepContractAddress;

    // Main contract address
    address public mainContractAddress;

    // Payment information
    // TODO: add payment information
    // How-To: https://www.youtube.com/watch?v=FQe91txqP6k

    constructor(address _admin, string memory _repoId, string memory _taskId) Ownable(_admin) {
        // The task admin is the owner of the contract
        //transferOwnership(_admin);
        repoId = _repoId;
        taskId = _taskId;
        taskStatus = TaskStatus.OPEN;
        contributor = address(0x0);
        mainContractAddress = msg.sender;
    }

    function assignContributor(address _contributor, string memory _contributorGithubId) public onlyOwner onlyOpen {
        contributor = _contributor;
        contributorGithubId = _contributorGithubId;
        taskStatus = TaskStatus.IN_PROGRESS;
    }

    function removeContributor() public onlyOwner {
        contributor = address(0x0);
        contributorGithubId = "";
        contributorPreferredPaymentMehtod = "";
        taskStatus = TaskStatus.OPEN;
    }

    function setTaskCanceled() public onlyOwner {
        taskStatus = TaskStatus.CANCELED;
        // TODO: refund the admin
    }
    
    function setTaskComplete() public onlyUpkeepContract {
        taskStatus = TaskStatus.COMPLETE;
        // TODO: send the money to the contributor??
    }

    function setContributorPreferredPaymentMethod(string memory _contributorPreferredPaymentMethod) public onlyContributor {
        contributorPreferredPaymentMehtod = _contributorPreferredPaymentMethod;
    }

    modifier onlyContributor() {
        require(msg.sender == contributor, "Only the contributor can call this function.");
        _;
    }

    modifier onlyUpkeepContract() {
        require(msg.sender == upkeepContractAddress, "Only the upkeep contract can call this function.");
        _;
    }

    modifier onlyMainContract() {
        require(msg.sender == mainContractAddress, "Only the main contract can call this function.");
        _;
    }

    modifier onlyOpen() {
        require(taskStatus == TaskStatus.OPEN, "The task is not open.");
        _;
    }

}



