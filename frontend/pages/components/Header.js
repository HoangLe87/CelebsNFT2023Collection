import logo from "../../public/static/images/logo.png";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";

const Header = ({ currentAccount, connectWallet }) => {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.navLogo}>
        <Image src={logo} className={styles.logo} alt="logo" />
        <p>CelebsNFT</p>
      </div>
      <div>
        <ul className={styles.navbar}>
          <li onClick={() => router.push("/")}>Home</li>
          <li onClick={() => router.push("/Mint")}>Mint</li>
          <li onClick={() => router.push("/Marketplace")}>Marketplace</li>
          <li onClick={() => router.push("/Contacts")}>Contacts</li>
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

export default Header;
