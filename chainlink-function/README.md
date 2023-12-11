# Chainlink Function

`Instructions.md` - contains instructions for deploying the Chainlink function and triggering it with a Hardhat task

`tasks/Functions-consumer/request.js` - contains the Hardhat task that triggers the Chainlink function

`Functions-request-config.js` - referenced by the Hardhat task, contains the Chainlink function's request parameters

`github-app-api-request.js` - contains the JS code for the Chainlink function to make an API request to the GitHub API

`contracts/FunctionsConsumer.sol` - contains the Solidity code for the Chainlink function that calls the JS code & uses the result to act on the main contract

`contracts/GitHubRewardsProgram.sol` - main contract that the Chainlink function acts on