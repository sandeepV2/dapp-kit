// import { ethers } from "ethers";
const ethers = require("ethers");
// import abi from "../../coffeDapp/client/src/contractJson/wallet.json";

// Provider is class that provides abstraction for a eth network.
// It provides read only access to Blockchain and status.
const provider = new ethers.providers.JsonRpcProvider();

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "accountBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getValue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sendEthContract",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "sendEthUser",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_num",
        type: "uint256",
      },
    ],
    name: "setValue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// console.log(contractABI);

const contractIntreaction = async (_num) => {
  const walletContract = new ethers.Contract(
    contractAddress,
    contractABI,
    provider
  );
  // Read operations getValue, contractBalance, accountBalance.
  const contractName = await walletContract.name();
  console.log("Contract Name:", contractName);

  const num = await walletContract.getValue();
  console.log("Number Value:", String(num));

  const contractBalance = await walletContract.contractBalance();
  const balethContract = ethers.utils.formatEther(contractBalance);
  console.log("Contract Balance:", balethContract);

  const userBalance = await walletContract.accountBalance(
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
  );
  const balethUser = ethers.utils.formatEther(userBalance);
  console.log("User Balance:", balethUser);

  // Write operation, This would fail.
  // Providers only support read operations from blockchain.
  // Inorder to make the write operations we need signer (metamask and wallet).
  // This is available as window.ethereum object in browser, how do we get that in node js !.

  //The Wallet class inherits Signer and can sign
  // transactions and messages using a private key as a standard Externally Owned Account (EOA).

  const walletObj = new ethers.Wallet(
    "5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
    provider
  );

  console.log(await walletObj.address);
  console.log(await walletObj.getBalance());

  // Todo: writing to contract with contract.
  //   await walletContract.setValue(2);

  let num1 = await walletContract.getValue();
  console.log("Number Value:", String(num1));
};
contractIntreaction(10);
