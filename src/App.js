import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";

function App() {
  const [web3API, setWeb3API] = useState({
    provider: null,
    web3: null,
  });

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

      console.log(window.web3);
      console.log(window.ethereum);
    };

    loadProvider();
  }, []);

  console.log(web3API.web3);

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
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
