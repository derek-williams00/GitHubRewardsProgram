npx env-enc set-pw

npx hardhat functions-simulate-script

npx env-enc set

PRIVATE_KEY
<your private key>

ETHEREUM_SEPOLIA_RPC_URL
https://rpc.sepolia.org

npx hardhat functions-deploy-consumer --network ethereumSepolia --show-stack-traces

npx hardhat functions-request --network ethereumSepolia --contract 0x1C9d0390F48AD211ff9C309075F9Bc744D954727 --subid 1844

npx hardhat functions-read --contract 0x1C9d0390F48AD211ff9C309075F9Bc744D954727 --network ethereumSepolia
