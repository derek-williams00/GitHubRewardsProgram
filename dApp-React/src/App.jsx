import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import "./App.css";

function App() {
   const [hasProvider, setHasProvider] = useState(null);
   const initialState = { accounts: [] };
   const [wallet, setWallet] = useState(initialState);
   const contractAddress = "OUR CONTRACT ADDRESS";
   const ABI = "OUT CONTRACT'S ABI";
   // This allows us to use the functions in the contract directly
   //const contract = new ethers.Contract(contractAddress, ABI, signer);

   useEffect(() => {
      const getProvider = async () => {
         const provider = await detectEthereumProvider({ silent: true });
         console.log(provider);
         setHasProvider(Boolean(provider));
      };

      getProvider();
   }, []);

   const updateWallet = async (accounts) => {
      setWallet({ accounts });
   };

   const handleConnect = async () => {
      let accounts = await window.ethereum.request({
         method: "eth_requestAccounts",
      });
      updateWallet(accounts);
   };

   return (
      <>
         <div className="App">
            <h2>Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist</h2>
            {hasProvider && (
               <button onClick={handleConnect}>Connect MetaMask</button>
            )}

            {wallet.accounts.length > 0 && (
               <div>Wallet Accounts: {wallet.accounts[0]}</div>
            )}
         </div>
      </>
   );
}

export default App;
