import { useEffect, useState } from "react"
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import GHRP from "../../GHRP_abi.json"

const CreateTaskForm = () => {

  const [provider, setProvider] = useState(null);
  const [taskId, setTaskId] = useState("");
  const [repoId, setRepoId] = useState("");

  useEffect(() => {
    const getProvider = async () => {
       const provider = await detectEthereumProvider({ silent: true });
       setProvider(provider)
    };

    getProvider();
 }, []);

 const onCreateTask = async (e) => {
  e.preventDefault();
  const contractAddress = "0xCd4752542c3520DE94D26D47eC549Dc197839b9e";
  const contract = new ethers.Contract(contractAddress, GHRP, provider);
  console.log("Contract ==", contract);
  console.log("TaskId == ", taskId);
  console.log("RepoId == ", repoId);
  await contract.createTask(taskId, repoId);
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