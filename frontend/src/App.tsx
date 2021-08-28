import React, { useState, useEffect } from "react"
import logo from "./logo.svg"
import "./App.css"

import { ethers } from "ethers"

import NiftyArtifact from "./ether/contracts/Nifty.sol/Nifty.json"
import { Nifty } from "./ether/typechain"

/*

Goals:

x Get Contract ABI (NECESSARY)
x Get our TypeScript types (NICE TO HAVE)
- Button: Connect to MetaMask (web3 provider) (NECESSARY)
- Button: Mint NFT
- Show NFTs for connected wallet

Prerequisites:

1. Set up development MetaMask
2. Run local Ethereum node
3. Connect MetaMask to localhost
4. Import deployer wallet (by adding private keys to MetaMask)

*/

function App() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>()

  const [contract, setContract] = useState<Nifty>()

  const [userWallet, setUserWallet] = useState<string>()
  const [userBalance, setUserBalance] = useState<number>()

  useEffect(() => {
    console.log("onMount", window.ethereum)

    if (window.ethereum) {
      const p = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(p)

      const c = new ethers.Contract(
        // address
        "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
        // abi
        NiftyArtifact.abi,
        // provider
        p
      ) as Nifty

      setContract(c)
      console.log("signer1", c?.signer)
    }
  }, [])

  const onConnect = async () => {
    console.log("onConnect")

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    setUserWallet(accounts[0])

    console.log("accounts", accounts)

    const c = contract?.connect(provider?.getSigner(0)) as Nifty
    // const c = contract?.connect(accounts[0]) as Nifty

    setContract(c)

    console.log("signer2", c?.signer)

    getBalance(accounts[0])
  }

  const onMint = async () => {
    console.log("onMint")

    const tx = await contract?.mintOne()
    // console.log("tx", tx)

    const receipt = await tx?.wait()
    // console.log("receipt", receipt)

    if (userWallet) {
      getBalance(userWallet)
    }
  }

  const getBalance = async (wallet: string) => {
    console.log("getBalance", wallet)

    const balance = await contract?.balanceOf(wallet)
    console.log("balance", balance)

    setUserBalance(balance?.toNumber())
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Nifty Contract</p>
        <button type="button" onClick={onConnect}>
          {userWallet ? "connected" : "connect to metamask"}
        </button>

        <p>
          connected wallet:
          {userWallet}
          <br />
          user balance:
          {userBalance}
        </p>

        <button type="button" disabled={!userWallet} onClick={onMint}>
          mint
        </button>
      </header>
    </div>
  )
}

export default App
