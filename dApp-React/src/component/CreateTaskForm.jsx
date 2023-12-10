import { useEffect, useState } from "react"
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import GHRP from "../../GHRP_abi.json"

const CreateTaskForm = () => {

//  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [taskId, setTaskId] = useState("");
  const [repoId, setRepoId] = useState("");

  useEffect(() => {
    const getProviderAndSigner = async () => {
      const metamaskProvider = await detectEthereumProvider();
      if (metamaskProvider) {
        const provider = new ethers.providers.Web3Provider(metamaskProvider);
        const signer = provider.getSigner();
        setSigner(signer);
      } else {
        console.error("Please install MetaMask!");
      }
    };

    getProviderAndSigner();
 }, []);

 const onCreateTask = async (e) => {
  e.preventDefault();
  if (!signer) {
    console.error("No signer available");
    return;
  }

  const contractAddress = "0xCd4752542c3520DE94D26D47eC549Dc197839b9e";
  const contract = new ethers.Contract(contractAddress, GHRP, signer);

  try {
    const txResponse = await contract.createTask(taskId, repoId);
    console.log("Transaction Response:", txResponse);
    // Optionally, wait for the transaction to be mined
    const receipt = await txResponse.wait();
    console.log("Transaction Receipt:", receipt);
  } catch (error) {
    console.error("Transaction Error:", error);
  }
 }

  return (
    <div className="p-6 border-solid border-1 rounded-md shadow-md m-2">
      <div>Create a new task</div>
      <form className="flex flex-col" onSubmit={onCreateTask}>
        <label>
          Task ID
          <input type="text" value={taskId} onChange={(e) => setTaskId(e.target.value)}></input>
        </label>
        <label>
          Repo ID
          <input type="text" value={repoId} onChange={(e) => setRepoId(e.target.value)}></input>
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateTaskForm