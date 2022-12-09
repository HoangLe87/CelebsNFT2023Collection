import Head from "next/head";
import Header from "./components/Header";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import wavePortal from "../public/static/waveAbi.json";
import { ethers } from "ethers";

const Contacts = () => {
  const contract = "0x1E9E3BE45963bC1c9d1aF148B2e9CC6e430bee79";
  const [allWaves, setAllWaves] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [seeAllMessages, setSeeAllMessages] = useState(false);

  const wave = async (e) => {
    e.preventDefault();
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contract,
          wavePortal.abi,
          signer
        );
        const waveTxn = await wavePortalContract.wave(inputMessage, {
          gasLimit: 300000,
        });
        setInputMessage("");
        console.log(`Mining...${waveTxn.hash}`);
        await waveTxn.wait();
        console.log(`Mined -- ${waveTxn.hash}`);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) => {
    return [date.getDate(), date.getMonth(), date.getFullYear()].join("/");
  };

  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contract,
          wavePortal.abi,
          signer
        );
        const waves = await wavePortalContract.getAllWaves();
        let wavesCleaned = [];
        waves.forEach((i) => {
          let time = new Date(Number(i.timestamp) * 1000);
          wavesCleaned.push({
            address: i.waver,
            timestamp: formatDate(time),
            message: i.message,
          });
        });
        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // toggle all messages
  const toggleAllMessages = () => {
    getAllWaves();
    setSeeAllMessages(!seeAllMessages);
  };

  // listen to events emmited
  useEffect(() => {
    let wavePortalContract;
    const onNewWave = (from, timestamp, message) => {
      console.log("NewWave", from, timestamp, message);
      let time = new Date(Number(timestamp) * 1000);
      setAllWaves((i) => [
        ...i,
        {
          address: from,
          timestamp: formatDate(time),
          message: message,
        },
      ]);
    };
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      wavePortalContract = new ethers.Contract(
        contract,
        wavePortal.abi,
        signer
      );
      wavePortalContract.on("NewWave", onNewWave);
    }
    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>CelebsNFT</title>
        <meta name="description" content="NFT Collection 2023" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>Get in touch!</h1>
        <p>Leave me a message on the blockchain by submitting the form below</p>
        <form onSubmit={wave}>
          <input
            id={styles.message}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          ></input>
          <button type="submit" className={styles.messageButton}>
            Wave at me
          </button>
        </form>
        <button
          type="submit"
          className={styles.messageButton}
          onClick={toggleAllMessages}
        >
          {seeAllMessages ? "Hide messages" : "See messages"}
        </button>
        <div className={styles.content}>
          {seeAllMessages &&
            allWaves.map((i) => {
              return (
                <>
                  <div key={allWaves.indexOf(i)}>
                    On {i.timestamp},<b> address </b>
                    {i.address} <b>said:</b>{" "}
                    <p className={styles.message}>{i.message}</p>
                  </div>
                </>
              );
            })}
        </div>
      </main>
      <footer className={styles.footer}>CelebsNFT © 2023</footer>
    </div>
  );
};

export default Contacts;
