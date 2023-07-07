import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";

import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";

function App() {
  const [web3API, setWeb3API] = useState({
    provider: null,
    isProviderLoaded: false,
    web3: null,
    contract: null,
  });

  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState(null); //Getting Account
  const [shouldReload, reload] = useState(false); //reload balance state

  //**  ------------------------------------- */
  //** Make Sure Correct Network is connected */
  //**  ------------------------------------- */
  const canConnectToContract = account && web3API.contract;

  const reloadEffect = useCallback(() => reload(!shouldReload), [shouldReload]);

  //** ----------------- */
  //** Account Change Handler */
  //** ----------------- */
  const setAccountListener = (provider) => {
    //Metamask function for accounts change, refresh
    provider.on("accountsChanged", (accounts) => window.location.reload());

    //Metamask function for chain change, refresh
    provider.on("chainChanged", (chain) => window.location.reload());
  };

  useEffect(() => {
    const loadProvider = async () => {
      //with metamask we have an access to window.ethereum & window.web3
      //metamask injects a global API into website
      //this API allows websites to request users, accounts, read data on blockchain
      //sign messages and transactions

      const provider = await detectEthereumProvider();

      if (provider) {
        const contract = await loadContract("Faucet", provider);
        setAccountListener(provider);
        setWeb3API({
          web3: new Web3(provider),
          provider,
          contract,
          isProviderLoaded: true,
        });
      } else {
        setWeb3API((api) => {
          //** FIX Dependency */
          return {
            ...api,
            isProviderLoaded: true,
          };
        });
        console.error("Please, install Metamask!");
      }
    };

    loadProvider();
  }, []);

  useEffect(() => {
    const loadBalance = async () => {
      const { contract, web3 } = web3API;
      const balance = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(balance, "ether"));
    };

    web3API.contract && loadBalance();
  }, [web3API, shouldReload]);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3API.web3.eth.getAccounts();
      setAccount(accounts[0]);
    }; //Getting Account

    web3API.web3 && getAccount();
  }, [web3API.web3]);

  //** ----------------- */
  //** ADD FUNDS Handler */
  //** ----------------- */

  const addFunds = useCallback(async () => {
    const { contract, web3 } = web3API;
    await contract.addFunds({
      from: account,
      value: web3.utils.toWei("1", "ether"),
    });

    // window.location.reload();
    //reload to update the balance

    reloadEffect();
  }, [web3API, account, reloadEffect]);

  //** ----------------- */
  //** WITHDRAW FUNDS Handler */
  //** ----------------- */

  const withdraw = async () => {
    const { contract, web3 } = web3API;
    const withdrawAmount = web3.utils.toWei("0.1", "ether");
    await contract.withdraw(withdrawAmount, {
      from: account,
    });

    reloadEffect();
  };

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          {web3API.isProviderLoaded ? (
            <div className="is-flex is-align-items-center">
              <strong>Account: </strong>
              <h1>
                {account ? (
                  <div>{account}</div>
                ) : !web3API.provider ? ( //in the case of metamask not install
                  <>
                    <div className="notification is-warning is-size-6 ml-2">
                      Wallet is not detected!{` `}
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://docs.metamask.io"
                      >
                        Install MetaMask
                      </a>
                    </div>
                  </>
                ) : (
                  <button
                    className="button is-small is-warning is-light ml-2"
                    onClick={() => {
                      web3API.provider.request({
                        method: "eth_requestAccounts",
                      });
                    }}
                  >
                    Connect Wallet
                  </button>
                )}
              </h1>
            </div>
          ) : (
            <span>Looking for Web3...</span>
          )}
          <div className=" is-size-2 my-4">
            Current Balance: <strong>{balance} </strong>ETH
          </div>

          {!canConnectToContract && (
            <i className="is-block">Connect to Ganache</i>
          )}

          <button
            disabled={!canConnectToContract}
            className="button is-primary is-light mr-2"
            onClick={addFunds}
          >
            Donate 1 ETH
          </button>
          <button
            disabled={!canConnectToContract}
            className="button is-link is-light"
            onClick={withdraw}
          >
            Withdraw 0.1 ETH
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
