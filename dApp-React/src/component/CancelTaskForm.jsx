import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import GHRP from '../../GHRP_abi.json';
import TASK from '../../Task_abi.json';

const CancelTaskForm = () => {
  const [signer, setSigner] = useState(null);
  const [taskId, setTaskId] = useState('');
  const [repoId, setRepoId] = useState('');

  useEffect(() => {
    const getProviderAndSigner = async () => {
      const metamaskProvider = await detectEthereumProvider();
      if (metamaskProvider) {
        const provider = new ethers.providers.Web3Provider(metamaskProvider);
        const signer = provider.getSigner();
        setSigner(signer);
      } else {
        console.error('Please install MetaMask!');
      }
    };

    getProviderAndSigner();
  }, []);

  const onCancelTask = async (e) => {
    e.preventDefault();
    if (!signer) {
      console.error('No signer available');
      return;
    }

    const contractAddress = '0xCd4752542c3520DE94D26D47eC549Dc197839b9e';
    const contract = new ethers.Contract(contractAddress, GHRP, signer);

    try {
      const txResponse = await contract.cancelTask(taskId, repoId);
      console.log('Transaction Response:', txResponse);
      // Optionally, wait for the transaction to be mined
      const receipt = await txResponse.wait();
      console.log('Transaction Receipt:', receipt);

      // Get the task contract
      const taskAddr = await contract.getTask(taskId, repoId);

      // Create a new contract instance for the task
      const taskContract = new ethers.Contract(taskAddr, TASK, signer);

      // Get the task status
      const taskStatus = await taskContract.taskStatus();

      console.log(`Task status is ${taskStatus}`);
    } catch (error) {
      console.error('Transaction Error:', error);
    }
  };

  return (
    <div className="p-6 border-solid border-1 rounded-md shadow-md m-2 w-1/4 bg-github-gray animate-popup">
      <div className="font-bold text-lg cursor-default">Cancel the task</div>
      <form className="flex flex-col" onSubmit={onCancelTask}>
        <label>
          <div className="text-left mt-6">Task ID</div>
          <input
            placeholder="Type your task ID"
            type="text"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            className="w-full p-3 rounded border-solid border border-[#ecebed]"></input>
        </label>
        <label>
          <div className="text-left mt-6">Repo ID</div>
          <input
            placeholder="Type your repository ID"
            type="text"
            value={repoId}
            onChange={(e) => setRepoId(e.target.value)}
            className="w-full p-3 rounded border-solid border border-[#ecebed]"></input>
        </label>
        <button
          type="submit"
          className="mt-10 border-solid border-1 rounded-lg shadow-md py-4 bg-github-red text-white font-semibold hover:bg-hover-red transition ease-in-out">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CancelTaskForm;
