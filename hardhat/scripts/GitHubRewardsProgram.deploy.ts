import '@nomiclabs/hardhat-ethers';
import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const GitHubRewardsProgram = await ethers.getContractFactory("GitHubRewardsProgram");
    const gitHubRewardsProgram = await GitHubRewardsProgram.deploy();
  
    console.log("GitHubRewardsProgram address:", gitHubRewardsProgram.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
