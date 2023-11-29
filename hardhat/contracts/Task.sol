// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/Ownable.sol";

// Contract for individual tasks
//  Coorresponds to a single issue in a GitHub repository
contract Task is Ownable {

    // Contributor information
    address public contributor;
    string public contributorGithubId;
    string private contributorPreferredPaymentMehtod;

    // Task information
    string public repoId;
    string public taskId;

    // Task exists
    bool public exists = false;


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
        exists = true;
    }

    function assignContributor(address _contributor, string memory _contributorGithubId) public onlyOwner onlyOpen {
        contributor = _contributor;
        contributorGithubId = _contributorGithubId;
        taskStatus = TaskStatus.IN_PROGRESS;
    }

    function removeContributor() public onlyOwner onlyNotClosed() {
        contributor = address(0x0);
        contributorGithubId = "";
        contributorPreferredPaymentMehtod = "";
        taskStatus = TaskStatus.OPEN;
    }

    function setTaskCanceled() public onlyOwner {
        // Refund the admin
        // TODO: We might need to change this to be compatible with CCIP
        payable(owner()).transfer(address(this).balance);

        // TODO: get upkeep contract address and stop it
        taskStatus = TaskStatus.CANCELED;
    }
    
    function setTaskComplete() public onlyUpkeepContract onlyNotClosed {
        taskStatus = TaskStatus.COMPLETE;
        
        // Send the reward to the contributor
        // TODO: We might need to change this to be compatible with CCIP
        payable(contributor).transfer(address(this).balance);
    }

    function setContributorPreferredPaymentMethod(string memory _contributorPreferredPaymentMethod) public onlyContributor onlyNotClosed {
        contributorPreferredPaymentMehtod = _contributorPreferredPaymentMethod;
    }

    function notClosed() public view returns (bool) {
        return (taskStatus != TaskStatus.CANCELED) && (taskStatus != TaskStatus.COMPLETE);
    }

    /* MODIFIERS */

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
        require(taskStatus == TaskStatus.OPEN, "This function can only be called for open tasks.");
        _;
    }

    modifier onlyNotClosed() {
        require(notClosed(), "This function can only be called for tasks that are not closed.");
        _;
    }

}



