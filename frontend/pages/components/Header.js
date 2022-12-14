import logo from "../../public/static/images/logo.png";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { useContext } from "react";
import {WalletContext} from "../_app";

const Header = () => {
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

  const [currentAccount, setCurrentAccount] = useContext(WalletContext);

  const router = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.navLogo}>
        <Image src={logo} className={styles.logo} alt="logo" />
        <div className={styles.heroTitle}>CelebsNFT</div>
      </div>
      <div>
        <ul className={styles.navbar}>
          <li onClick={() => router.push("/")}>Home</li>
          <li onClick={() => router.push("/Mint")}>Mint</li>
          <li onClick={() => router.push("/Marketplace")}>Marketplace</li>
          <li onClick={() => router.push("/Contacts")}>Contacts</li>
          {!currentAccount && (
            <li>
              <button className={styles.connectButton} onClick={connectWallet}>
                Connect
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
