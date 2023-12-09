// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/Ownable.sol";

import {Task} from "./Task.sol";
//import {GitHubUpkeep} from "./GitHubUpkeep.sol";

// Main contract
contract GitHubRewardsProgram {
    // Store Addresses of Task contract instances
    //   Mapping of repoId => taskId => Task
    mapping(string => mapping(string => address)) private taskContracts;
    
    function getTask(string memory _repoId, string memory _taskId) public view returns (address) {
        require(taskContracts[_repoId][_taskId] != address(0x0), "Task does not exist");
        return taskContracts[_repoId][_taskId];
    }

    /**************************/
    /* ADMIN FUNCTIONS        */
    /**************************/

    function createTask(string memory _repoId, string memory _taskId) public payable {
        require(taskContracts[_repoId][_taskId] == address(0x0), "Task already exists");
        //address newTask = address(new Task(msg.sender, _repoId, _taskId));
        Task newTask = new Task(msg.sender, _repoId, _taskId, address(this));
        taskContracts[_repoId][_taskId] = address(newTask);

        // TODO: create cooresponding upkeep contract and set address in task contract
        // LIKE THIS?
        //GitHubUpkeep ghu = new GitHubUpkeep(payable(address(newTask)));
        //newTask.setUpkeepContractAddress(address(ghu));

        //Transfer attached funds to the new task contract (msg.value)
        // TODO: We might need to change this to be compatible with CCIP
        payable(newTask).transfer(msg.value);
    }

    function cancelTask(string memory _repoId, string memory _taskId) public onlyAdmin(_repoId, _taskId) {
        Task task = Task(payable(taskContracts[_repoId][_taskId]));
        require(task.exists());
        task.setTaskCanceled();
    }

    function kickContributor(string memory _repoId, string memory _taskId) public {
        Task task = Task(payable(taskContracts[_repoId][_taskId]));
        require(task.exists());
        require(task.notClosed());
        task.removeContributor();
    }

    /**************************/
    /* CONTRIBUTOR FUNCTIONS  */
    /**************************/

    function joinTask(string memory _repoId, string memory _taskId, string memory _contributorGithubId) public {
        Task task = Task(payable(taskContracts[_repoId][_taskId]));
        require(task.exists());
        require(task.notClosed());
        task.assignContributor(msg.sender, _contributorGithubId);
    }

    function leaveTask(string memory _repoId, string memory _taskId) public {
        Task task = Task(payable(taskContracts[_repoId][_taskId]));
        require(task.exists());
        require(task.notClosed());
        require(task.contributor() == msg.sender);
        task.removeContributor();
    }

    /**************************/
    /* INTERNAL FUNCTIONS     */
    /**************************/


    /**************************/
    /* MODIFIERS              */
    /**************************/

    modifier onlyAdmin(string memory _repoId, string memory _taskId) {
        require(msg.sender == Task(payable(taskContracts[_repoId][_taskId])).owner(), "Only the admin can call this function.");
        _;
    }

    modifier onlyContributor(string memory _repoId, string memory _taskId) {
        require(msg.sender == Task(payable(taskContracts[_repoId][_taskId])).contributor(), "Only the contributor can call this function.");
        _;
    }

    modifier onlyOpen(string memory _repoId, string memory _taskId) {
        require(Task(payable(taskContracts[_repoId][_taskId])).taskStatus() == Task.TaskStatus.OPEN, "This function can only be called for open tasks.");
        _;
    }

}