import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";

import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contracts";

function App() {
  const [web3API, setWeb3API] = useState({
    provider: null,
    web3: null,
    contract: null,
  });

  const [account, setAccount] = useState(null); //Getting Account

  useEffect(() => {
    const loadProvider = async () => {
      //with metamask we have an access to window.ethereum & window.web3
      //metamask injects a global API into website
      //this API allows websites to request users, accounts, read data on blockchain
      //sign messages and transactions

      const provider = await detectEthereumProvider();
      const contract = await loadContract("Faucet");

      debugger;
      if (provider) {
        setWeb3API({
          web3: new Web3(provider),
          provider,
          contract,
        });
      } else {
        console.error("Please, install Metamask!");
      }
    };

    loadProvider();
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3API.web3.eth.getAccounts();
      setAccount(accounts[0]);
    }; //Getting Account

    web3API.web3 && getAccount();
  }, [web3API.web3]);

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <div className="is-flex is-align-items-center">
            <strong>Account: </strong>
            <h1>
              {account ? (
                <div>{account}</div>
              ) : (
                <button
                  className="button is-small is-warning is-light ml-2"
                  onClick={() => {
                    web3API.provider.request({ method: "eth_requestAccounts" });
                  }}
                >
                  Connect Wallet
                </button>
              )}
            </h1>
          </div>
          <div className="balance-view is-size-2 my-4">
            Current Balance: <strong>10 </strong>ETH
          </div>

          <button className="button is-primary is-light mr-2">Donate</button>
          <button className="button is-link is-light">Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;
