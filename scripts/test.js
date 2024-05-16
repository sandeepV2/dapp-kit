//import { ethers } from "ethers";

const ethers = require("ethers");
// Provider is class that provides abstraction for a eth network.
// It provides read only access to Blockchain and status.
const provider = new ethers.providers.JsonRpcProvider();

// Pass infura end point on using the test net.

debugger;

// get current block number
const queryBlock = async () => {
  const blNum = await provider.getBlockNumber();
  console.log(blNum);

  // how to get the account info.
  const bal = await provider.getBalance(
    "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc"
  );
  // by default in BigNumber { _hex: '0x021e19dc0d47f73b0e7c', _isBigNumber: true }
  console.log(bal);
  // ethers.utils.formatEther converts the wei/BigNumber to ether.
  console.log(ethers.utils.formatEther(bal));
};

const procUserInput = () => {
  // User may give input in string ethers.
  // convert that wei.
  const test = ethers.utils.parseEther("1.0");
  console.log("parsed", test);
};
queryBlock();
procUserInput();
