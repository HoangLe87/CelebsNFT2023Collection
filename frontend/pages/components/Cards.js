import styles from "../../styles/Home.module.css";
import Image from "next/image";

const Cards = ({ nfts }) => {
  const buyNft = (id) => {
    const link = `https://testnets.opensea.io/assets/goerli/0x919be4c3be64fe850e758caa893bc8cbb52e0982/${id}`;
    window.open(link);
  };

  return nfts.map((i) => {
    return (
      <div className={styles.cards} key={nfts.indexOf(i)}>
        <div className={styles.cardHeader}>
          {i.contractMetadata.name} {nfts.indexOf(i)}
        </div>
        <Image
          src={i.media[0].gateway}
          width={200}
          height={200}
          alt="ntf image"
        />
        <div className={styles.buyButtonDiv}>
          <button
            className={styles.buyButton}
            onClick={() => buyNft(nfts.indexOf(i))}
          >
            Buy
          </button>
        </div>
      </div>
    );
  });
};

export default Cards;
