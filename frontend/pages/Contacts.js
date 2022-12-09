import Head from "next/head";
import Header from "./components/Header";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

const Contacts = () => {
  const [inputValue, setInputValue] = useState("");

  const mintNft = (e) => {
    e.preventDeafult();
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>CelebsNFT</title>
        <meta name="description" content="NFT Collection 2023" />
      </Head>
      <Header />
      <main className={styles.main}>
        Mint your own NFT
        <form onSubmit={mintNft}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
          <button type="submit">Mint</button>
        </form>
      </main>
      <footer className={styles.footer}>CelebsNFT © 2023</footer>
    </div>
  );
};

export default Contacts;
