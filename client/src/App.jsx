import { useState, useEffect } from "react";
import abi from "./contractJson/wallet.json";
import { ethers } from "ethers";
import Memos from "./components/Memos";
import Buy from "./components/Buy";
import chai from "./chai.png";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");
  const [num, setNum] = useState(null);
  const [conBal, setConBal] = useState(null);

  useEffect(() => {
    const template = async () => {
      // const contractAddres="0xa64e3144835aF8781c750ceC432784a68d883266";
      // const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
      const contractAddres = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";
      const contractABI = abi.abi;
      //Metamask part
      //1. In order do transactions on goerli testnet
      //2. Metmask consists of infura api which actually help in connectig to the blockhain
      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        setAccount(account);
        console.log(account);
        const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
        const signer = provider.getSigner(); //write the blockchain

        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        );
        console.log(contract);
        setState({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };
    template();
  }, []);

  const getNumber = async () => {
    const num = await state.contract.getValue();
    setNum(ethers.utils.formatEther(num));
  };

  const setNumber = async (num) => {
    await state.contract.setValue(ethers.utils.parseEther(num));
    await getNumber();
    window.reload();
  };

  const getContractBal = async () => {
    const bal = await state.contract.contractBalance();
    setConBal(ethers.utils.formatEther(bal));

    await state.contract.sendEthContract({
      value: ethers.utils.parseEther("0.1"),
    });
  };

  const sendEth = async () => {
    const addr = "0xC06642bA60762EcdF67615C7159fD642FfD50c39";

    await state.contract.sendEthUser(
      "0xC06642bA60762EcdF67615C7159fD642FfD50c39",
      {
        value: ethers.utils.parseEther("1.0"),
      }
    );
  };

  const getAccBal = async () => {
    const addr = "0xC06642bA60762EcdF67615C7159fD642FfD50c39";

    const bal = await state.contract.accountBalance(
      "0xC06642bA60762EcdF67615C7159fD642FfD50c39"
    );
    console.log(ethers.utils.formatEther(bal));
  };

  return (
    <div>
      <img src={chai} className="img-fluid" alt=".." width="100%" />
      <p style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Connected Account - {account}</small>
      </p>
      <button onClick={getNumber}>Get Number</button>
      <button onClick={(e) => setNumber("10")}>Set Number</button>
      <p>{num}</p>
      <button onClick={getContractBal}>Get Contract balance</button>
      <p>{conBal}</p>
      <button onClick={sendEth}>Send Eth</button>
      <button onClick={getAccBal}>Get acc bal</button>
      {/* <Buy state={state} />
      <Memos state={state} /> */}
    </div>
  );
}

export default App;
