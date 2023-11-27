import { ethers, network, run } from 'hardhat';

async function main() {
	const helloWorldContract = await ethers.deployContract('HelloWorld');

	await helloWorldContract.waitForDeployment();

	const contractAddress = helloWorldContract.target;

	console.log(`Contract deployed to ${contractAddress}`);

	// ignore verification for hardhat network
	if (network.name !== 'hardhat') {
		// TODO: Currently not working. It just says "The contract <contractAddress> has already been verified on Etherscan." even though it hasn't.
		// const verify = await run('verify:verify', {
		// 	address: contractAddress,
		// 	constructorArguments: []
		// });
		// console.log('Verify response:');
		// console.log(verify);
	}
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
