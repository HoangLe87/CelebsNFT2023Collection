import Head from "next/head";
import Header from "./components/Header";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
import abi from "../public/static/nftAbi.json";

const Mint = () => {
  const contract = "0x919bE4c3Be64fE850E758caa893bC8CBb52E0982";

  const displayLog = (text) => {
    let div = document.createElement("div");
    div.textContent = text;
    document.getElementById("main").appendChild(div);
  };

  const mintNft = async (e) => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert(`cannot mint wihout metamask`);
        return;
      } else {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          contract,
          abi.abi,
          signer
        );
        displayLog("Going to pop wallet now to pay gas...");
        let nftTxn = await connectedContract.makeNFT();
        displayLog("Minting...please wait.");
        await nftTxn.wait();
        displayLog(`Minted, transaction: ${nftTxn.hash}`);
        displayLog("You can check on https://goerli.etherscan.io");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>CelebsNFT</title>
        <meta name="description" content="NFT Collection 2023" />
      </Head>
      <Header />
      <main className={styles.main} id="main">
        <h1>Mint your <span className={styles.heroTitle}>NFT</span></h1>
        <div>Mint your own randomised NFT and send it to your wallet</div>
        <div>
          <button className={styles.mintButton} onClick={mintNft}>
            Mint
          </button>
        </div>
      </main>
      <footer className={styles.footer}>CelebsNFT © 2023</footer>
    </div>
  );
};

export default Mint;
