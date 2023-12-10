import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const MetamaskSetup = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentChain, setCurrentChain] = useState(null);

  useEffect(() => {
    // Detect MetaMask and handle network and account changes
    const detectMetaMask = async () => {
      if (typeof window.ethereum !== 'undefined') {
        // MetaMask is installed
        await connectToSepolia();
        handleAccountChange();
        handleNetworkChange();
      } else {
        alert("Please Install Metamask!");
      }
    };

    detectMetaMask();
  }, []);

  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x149f4c' }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x149f4c',
              chainName: 'Sepolia',
              rpcUrls: ['https://rpc.sepolia.org/'],
            }],
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
      if (chainId !== '0x149f4c') {
        // Optionally prompt the user to switch back to Sepolia
        switchToSepolia();
      }
    });
  };

  return (
    <div>
      <h2>MetaMask Setup</h2>
      <p>Current Account: {currentAccount}</p>
      <p>Current Network Chain ID: {currentChain}</p>
    </div>
  );
};

export default MetamaskSetup;
