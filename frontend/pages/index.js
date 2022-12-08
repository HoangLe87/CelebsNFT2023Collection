import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import logo from "../public/static/images/logo.png";
import { useEffect, useState } from "react";
import ethers from "ethers";
import axios from "axios";

const Header = ({ currentAccount, connectWallet }) => {
  return (
    <header className={styles.header}>
      <div className={styles.navLogo}>
        <Image src={logo} className={styles.logo} alt="logo" />
        <p>CelebsNFT</p>
      </div>
      <div>
        <ul className={styles.navbar}>
          <li>Home</li>
          <li>Mint</li>
          <li>Marketplace</li>
          <li>Contacts</li>
          {!currentAccount && (
            <div>
              <button className={styles.connectButton} onClick={connectWallet}>
                Connect
              </button>
            </div>
          )}
        </ul>
      </div>
    </header>
  );
};

const Home = () => {
  // check if metamask is installed
  const [currentAccount, setCurrentAccount] = useState("");
  const [NFTs, setNFTs] = useState([]);

  const fetchNFTs = async () => {
    let nfts;
    const fetchURL = `/api/fetchNFTs`;

    nfts = await fetch(fetchURL).then((data) => data.json());
    console.log("nfts:", nfts);
    setNFTs(nfts);
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Please install metamask");
      return;
    } else {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        let account = accounts[0];
        setCurrentAccount(account);
      } else console.log("No authorized account found");
    }
  };
  // connect to the wallet function
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // check if wallet is connected on page load
  useEffect(() => {
    checkIfWalletIsConnected();
    fetchNFTs();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>CelebsNFT</title>
        <meta name="description" content="NFT Collection 2023" />
      </Head>
      <Header currentAccount={currentAccount} connectWallet={connectWallet} />

      <main className={styles.main}>
        Each unique. Each beautiful. Discover your NFT today.
      </main>
      <footer className={styles.footer}>CelebsNFT © 2023</footer>
    </div>
  );
};

export default Home;
