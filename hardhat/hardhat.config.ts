import findConfig from 'find-config';
import dotenv from 'dotenv';
const envPath = findConfig('.env');
dotenv.config({ path: envPath });

import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
	solidity: '0.8.22',
	networks: {
		zkEVM: {
			url: `https://rpc.public.zkevm-test.net`,
			accounts: [process.env.ACCOUNT_PRIVATE_KEY]
		}
	},
	etherscan: {
		apiKey: {
			zkEVM: process.env.POLYGONSCAN_API_KEY
		},
		customChains: [
			{
				network: 'zkEVM',
				chainId: 1442,
				urls: {
					apiURL: 'https://api-testnet-zkevm.polygonscan.com/api',
					browserURL: 'https://testnet-zkevm.polygonscan.com'
				}
			}
		]
	},
	sourcify: {
		enabled: false
	}
};

export default config;
