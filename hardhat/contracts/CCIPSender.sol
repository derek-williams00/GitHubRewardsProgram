// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

/* TODO:
    Cross-Chain Communication:
        Flesh out CCIP contracts to handle the specifics of cross-chain communication.
        Use Chainlink's CCIP interfaces and libraries for this.

    Token Transfer Logic:
        Implement functions to facilitate token transfers across chains, including fee calculation
        and token locking/burning and minting/unlocking mechanisms.
    
    Event Handling:
        Include events and logs to track cross-chain transactions, which are important for debugging and monitoring.
*/


// @title 
contract CCIPSender is OwnerIsCreator {
    IRouterClient private router;
    LinkTokenInterface private linkToken;

    // Define a struct to hold message data
    struct MessageData {
        address receiver;
        uint256 amount;
        //TODO: Add more fields as needed
    }

    // Event for logging cross-chain transfers
    event CrossChainTransferInitiated(uint64 destinationChainSelector, address receiver, uint256 amount);

    constructor(address _router, address _linkToken) {
        require(_router != address(0) && _linkToken != address(0), "Invalid address");
        router = IRouterClient(_router);
        linkToken = LinkTokenInterface(_linkToken);
    }

    function transferTokens(uint64 destinationChainSelector, address receiver, uint256 amount) public onlyOwner {
        // Ensure the contract has enough LINK to pay for fees
        require(linkToken.balanceOf(address(this)) >= amount, "Insufficient LINK for fees");

        // Create the message data
        MessageData memory data = MessageData(receiver, amount);

        // Encode the message data
        bytes memory encodedData = abi.encode(data);

        // Create a CCIP message
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: encodedData,
            tokenAmounts: new Client.EVMTokenAmount[](0), // No token transfer in this message
            extraArgs: abi.encode(Client.EVMExtraArgsV1({gasLimit: 200000, strict: false})),
            feeToken: address(linkToken)
        });

        // Estimate the fee
        uint256 fee = router.getFee(destinationChainSelector, message);

        // Approve the router to spend LINK
        linkToken.approve(address(router), fee);

        // Send the message
        bytes32 messageId = router.ccipSend(destinationChainSelector, message);

        // Emit event
        emit CrossChainTransferInitiated(destinationChainSelector, receiver, amount);
    }

    // Function to fund the contract with LINK for fees
    function fundContract() public payable onlyOwner {
        // Implementation to fund the contract with LINK
    }

    //TODO: Add more functions as needed, such as for setting router address, withdrawing LINK, etc.
 
}