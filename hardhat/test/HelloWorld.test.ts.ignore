import {
	time,
	loadFixture
} from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs';
import { expect } from 'chai';
import { ethers } from 'hardhat';

// We define a fixture to reuse the same setup in every test.
// We use loadFixture to run this setup once, snapshot that state,
// and reset Hardhat Network to that snapshot in every test.
async function deployContractFixture() {
	// Contracts are deployed using the first signer/account by default
	const [owner, otherAccount] = await ethers.getSigners();

	const helloWorld = await ethers.getContractFactory('HelloWorld');
	const contract = await helloWorld.deploy();

	return { contract, owner, otherAccount };
}

describe('Deployment', function () {
	it('Initial string should be empty', async function () {
		const { contract } = await loadFixture(deployContractFixture);

		const defaultString = await contract.getString();
		console.log('defaultString:', defaultString);

		expect(defaultString).to.equal('');
	});
});

describe('setString() should save string', function () {
	it('Should revert with the right error if called too soon', async function () {
		const { contract } = await loadFixture(deployContractFixture);

		const string = 'Hello world';

		await contract.setString(string);

		const savedString = await contract.getString();
		console.log('savedString:', savedString);

		expect(savedString).to.equal(string);
	});

	it('Should emit an event on setString()', async function () {
		const { contract } = await loadFixture(deployContractFixture);

		const promise = contract.setString('Hello world');

		await expect(promise).to.emit(contract, 'StringSet');
	});

	it('Account 1 should not interfere with account 2 setString()', async function () {
		const { contract, owner, otherAccount } = await loadFixture(
			deployContractFixture
		);

		const contract1 = contract.connect(owner);
		const contract2 = contract.connect(otherAccount);

		const string1 = 'Hello world 1';
		const string2 = 'Hello world 2';

		await contract1.setString(string1);
		await contract2.setString(string2);

		const savedString1 = await contract1.getString();
		console.log('savedString1:', savedString1);
		const savedString2 = await contract2.getString();
		console.log('savedString2:', savedString2);

		expect(savedString1).to.equal(string1);
		expect(savedString2).to.equal(string2);
	});
});
