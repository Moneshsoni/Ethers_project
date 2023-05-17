
import './App.css';
import { useEffect } from 'react';
const {ethers} = require('ethers');

function App() {

  const walletAddress = "0xC482D3f6dc94336d8b47B49fade3d0C4A14DA03C";
  const walletABI =[
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_user",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "DonateEther",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getContractBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getNum",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "User",
          "type": "address"
        }
      ],
      "name": "getUserBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "sendEther",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_num",
          "type": "uint256"
        }
      ],
      "name": "setNum",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "user",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "wallet",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
   
  useEffect(()=>{
    const writeContract = async()=>{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts",[]);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(walletAddress,walletABI,signer);
      // await contract.setNum(99);

      // await contract.DonateEther({value: ethers.utils.parseEther("0.001")});

      const contractBal=await contract.getContractBalance();
      const bal=ethers.utils.formatEther(contractBal);
      console.log("Contract Balance:",bal);
      console.log("Balance",bal);

      await contract.sendEther({value: ethers.utils.parseEther("0.001")});

      const num = await contract.getNum();
      console.log("Number of",String(num));

    }
    writeContract();


  })

  async function fetchName() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(walletAddress, walletABI, provider)
      try {
        const data = await contract.wallet()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }
  return (
    <div className="App">
     
      <button onClick={fetchName}>Fetch Contract</button>
      
      
    </div>
  );
}

export default App;
