import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";

function App() {
  const [web3API, setWeb3API] = useState({
    provider: null,
    web3: null,
  });

  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      //with metamask we have an access to window.ethereum & window.web3
      //metamask injects a global API into website
      //this API allows websites to request users, accounts, read data on blockchain
      //sign messages and transactions

      let provider = null;
      if (window.ethereum) {
        provider = window.ethereum;

        try {
          await provider.enable();
        } catch {
          console.error("User denied accounts access!");
        }
      } else if (window.web3) {
        provider = window.web3.currentProvider;
      } else if (!process.env.production) {
        provider = new Web3.providers.HttpProvider("http://localhost:7545");
      }

      setWeb3API({
        web3: new Web3(provider),
        provider,
      });
    };

    loadProvider();
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3API.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };

    web3API.web3 && getAccount();
  }, [web3API.web3]);

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <span>
            <strong>Account: </strong>
            <h1>{account ? account : "Not Connected"}</h1>
          </span>
          <div className="balance-view is-size-2">
            Current Balance: <strong>10</strong>ETH
          </div>

          <button className="btn mr-2">Donate</button>
          <button className="btn">Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;
