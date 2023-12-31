import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const MetamaskSetup = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentChain, setCurrentChain] = useState(null);

  // Sepolia Chain ID = 84532 (0x14A34)
  // https://docs.metamask.io/guide/ethereum-provider.html#chain-ids
  // https://docs.base.org/network-information/
  const CHAIN_ID = '0x14A34';

  useEffect(() => {
    // Detect MetaMask and handle network and account changes
    const detectMetaMask = async () => {
      if (currentAccount) return;
      if (typeof window.ethereum !== 'undefined') {
        // MetaMask is installed
        await connectToSepolia();
        handleAccountChange();
        handleNetworkChange();
      } else {
        alert('Please Install Metamask!');
      }
    };

    detectMetaMask();
  }, []);

  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAIN_ID }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: CHAIN_ID,
                chainName: 'Sepolia',
                rpcUrls: ['https://rpc.sepolia.org/'],
              },
            ],
          });
        } catch (addError) {
          console.error('Failed to add Sepolia to MetaMask', addError);
        }
      } else {
        console.error('Failed to switch to Sepolia', switchError);
      }
    }
  };

  const connectToSepolia = async () => {
    await switchToSepolia();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const account = await signer.getAddress();
    const network = await provider.getNetwork();
    setCurrentAccount(account);
    setCurrentChain(network.chainId);
  };

  const handleAccountChange = () => {
    window.ethereum.on('accountsChanged', (accounts) => {
      setCurrentAccount(accounts[0]);
      // Optionally, you can trigger additional actions here
    });
  };

  const handleNetworkChange = () => {
    window.ethereum.on('chainChanged', (chainId) => {
      setCurrentChain(chainId);
      if (chainId !== CHAIN_ID) {
        // Optionally prompt the user to switch back to Sepolia
        switchToSepolia();
      }
    });
  };

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
  };

  return (
    <div>
      <h2 className="font-semibold text-2xl cursor-default">Set up MetaMask</h2>

      <button
        className="p-4 border-solid border-1 rounded-lg shadow-md m-3 cursor-pointer transition ease-in-out bg-github-black text-white hover:bg-black"
        onClick={handleConnect}>
        Connect MetaMask Wallet
      </button>

      <p className="text-sm">Current Account: {currentAccount}</p>
      <p className="text-sm">Current Network Chain ID: {currentChain}</p>
    </div>
  );
};

export default MetamaskSetup;
