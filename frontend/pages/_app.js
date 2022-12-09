import "../styles/globals.css";
import { useEffect, useState } from "react";
import WalletContext from "./components/WalletContext";

function MyApp({ Component, pageProps }) {
  // set metamask account
  const [currentAccount, setCurrentAccount] = useState("");

  // function to check if metamask is connected
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Please install metamask");
      return;
    } else {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        let account = accounts[0];
        console.log("authorised account:", account);
        setCurrentAccount(account);
      } else console.log("No authorized account found");
    }
  };

  // check if metamask is connected upon load
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // provide context to all components
  return (
    <WalletContext.Provider value={[currentAccount, setCurrentAccount]}>
      <Component {...pageProps} />
    </WalletContext.Provider>
  );
}

export default MyApp;
