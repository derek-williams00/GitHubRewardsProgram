import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import RoleSelection from "../layout/RoleSelection";
import { ethers } from "ethers";
import GHRP from "../../GHRP_abi.json"

const LandingPage = () => {
    const [hasProvider, setHasProvider] = useState(null);
    const [provider, setProvider] = useState(null);
    const [network, setNetwork] = useState("");
    const initialState = { accounts: [] };
    const [wallet, setWallet] = useState(initialState);
    const contractAddress = "0xCd4752542c3520DE94D26D47eC549Dc197839b9e";
    const ABI = "OUT CONTRACT'S ABI";
    // This allows us to use the functions in the contract directly
    useEffect(() => {
      const initializeProvider = async () => {
        if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(provider);
          setHasProvider(Boolean(provider))
        }
      };
  
      initializeProvider();
    }, []);

    useEffect(() => {
      const getNetwork = async () => {
        if (provider) {
          const network = await provider.getNetwork();
          setNetwork(network.name);
          console.log("network == ", network)
        }
      };
  
      getNetwork();
    }, [provider]);
 
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
                <button className="p-4 border-solid border-1 rounded-lg shadow-md m-3 w-52" onClick={handleConnect}>Connect MetaMask</button>
             )}
 
             {wallet.accounts.length > 0 && (
                <div>Wallet Accounts: {wallet.accounts[0]}</div>
             )}
             
             <RoleSelection />
          </div>
       </>
    );
 }
export default LandingPage