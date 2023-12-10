npx env-enc set-pw

npx hardhat functions-simulate-script

npx env-enc set

PRIVATE_KEY
<your private key>

ETHEREUM_SEPOLIA_RPC_URL
https://rpc.sepolia.org

npx hardhat functions-deploy-consumer --network ethereumSepolia

npx hardhat functions-request --network ethereumSepolia --contract 0x41a17722C51fa0524d89930cE5b6038C1f42f940 --subid 1844

npx hardhat functions-read --contract 0x41a17722C51fa0524d89930cE5b6038C1f42f940 --network ethereumSepolia
