import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

function App() {
  const [web3API, setWeb3API] = useState({
    provider: null,
    web3: null,
  });

  const [account, setAccount] = useState(null); //Getting Account

  useEffect(() => {
    const loadProvider = async () => {
      //with metamask we have an access to window.ethereum & window.web3
      //metamask injects a global API into website
      //this API allows websites to request users, accounts, read data on blockchain
      //sign messages and transactions

      const provider = await detectEthereumProvider();

      if (provider) {
        setWeb3API({
          web3: new Web3(provider),
          provider,
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
            <span className="mr-2">
              <strong>Account: </strong>
            </span>
            {account ? (
              <div>{account}</div>
            ) : (
              <button
                className="button is-small"
                onClick={() => {
                  web3API.provider.request({ method: "eth_requestAccounts" });
                }}
              >
                Connect Wallet
              </button>
            )}
          </div>

          <div className="balance-view is-size-2 my-4">
            Current Balance: <strong>10</strong>ETH
          </div>

          <button className="button is-primary mr-2">Donate</button>
          <button className="button is-link ">Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;
