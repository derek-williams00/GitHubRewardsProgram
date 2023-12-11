// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

import {GitHubRewardsProgram} from "./GitHubRewardsProgram.sol";

/**
 * @title Chainlink Functions example on-demand consumer contract example
 */
contract FunctionsConsumer is FunctionsClient, ConfirmedOwner {
  using FunctionsRequest for FunctionsRequest.Request;

  bytes32 public donId; // DON ID for the Functions DON to which the requests are sent

  bytes32 public s_lastRequestId;
  bytes public s_lastResponse;
  bytes public s_lastError;

  address private mainContractAddress = address(0x0 /* TODO: insert main contract address here */);

  constructor(address router, bytes32 _donId) FunctionsClient(router) ConfirmedOwner(msg.sender) {
    donId = _donId;
  }

  /**
   * @notice Set the DON ID
   * @param newDonId New DON ID
   */
  function setDonId(bytes32 newDonId) external onlyOwner {
    donId = newDonId;
  }

  /**
   * @notice Triggers an on-demand Functions request using remote encrypted secrets
   * @param source JavaScript source code
   * @param secretsLocation Location of secrets (only Location.Remote & Location.DONHosted are supported)
   * @param encryptedSecretsReference Reference pointing to encrypted secrets
   * @param args String arguments passed into the source code and accessible via the global variable `args`
   * @param bytesArgs Bytes arguments passed into the source code and accessible via the global variable `bytesArgs` as hex strings
   * @param subscriptionId Subscription ID used to pay for request (FunctionsConsumer contract address must first be added to the subscription)
   * @param callbackGasLimit Maximum amount of gas used to call the inherited `handleOracleFulfillment` method
   */
  function sendRequest(
    string calldata source,
    FunctionsRequest.Location secretsLocation,
    bytes calldata encryptedSecretsReference,
    string[] calldata args,
    bytes[] calldata bytesArgs,
    uint64 subscriptionId,
    uint32 callbackGasLimit
  ) external onlyOwner {
    FunctionsRequest.Request memory req;
    req.initializeRequest(FunctionsRequest.Location.Inline, FunctionsRequest.CodeLanguage.JavaScript, source);
    req.secretsLocation = secretsLocation;
    req.encryptedSecretsReference = encryptedSecretsReference;
    if (args.length > 0) {
      req.setArgs(args);
    }
    if (bytesArgs.length > 0) {
      req.setBytesArgs(bytesArgs);
    }
    s_lastRequestId = _sendRequest(req.encodeCBOR(), subscriptionId, callbackGasLimit, donId);
  }

  /**
   * @notice Store latest result/error
   * @param requestId The request ID, returned by sendRequest()
   * @param response Aggregated response from the user code
   * @param err Aggregated error from the user code or from the execution pipeline
   * Either response or error parameter will be set, but never both
   */
  function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
    s_lastResponse = response;
    s_lastError = err;

    // Parse the response
    // ---------------------
    string[] memory parts = new string[](3);
    uint partIndex = 0;
    bytes memory tempPart = new bytes(response.length);
    uint tempIndex = 0;
    for (uint i = 0; i < response.length; i++) {
        if (response[i] == bytes1(",")) {
            parts[partIndex] = bytesToString(tempPart, tempIndex); // Save this part
            partIndex++; // Move to next part
            tempIndex = 0; // Reset the tempIndex for next part
        } else {
            tempPart[tempIndex] = response[i]; // Copy the character into tempPart
            tempIndex++; // Move to next index in tempPart
        }
    }
    parts[partIndex] = bytesToString(tempPart, tempIndex);
    // ---------------------

    // Forward the response to the main contract
    if(keccak256(abi.encodePacked(string(parts[2]))) == keccak256(abi.encodePacked("closed"))) { // Compare the response to "closed"
      GitHubRewardsProgram grp = GitHubRewardsProgram(mainContractAddress);
      grp.updateCompletedTask(string(parts[0]), string(parts[1]));
    }
  }

  // Helper function to convert bytes to string
  function bytesToString(bytes memory byteArray, uint length) internal pure returns (string memory) {
      bytes memory strBytes = new bytes(length);
      for (uint i = 0; i < length; i++) {
          strBytes[i] = byteArray[i];
      }
      return string(strBytes);
  }

}
