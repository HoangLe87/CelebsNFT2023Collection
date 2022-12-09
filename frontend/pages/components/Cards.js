import styles from "../../styles/Home.module.css";
import Image from "next/image";

const Cards = ({ nfts }) => {
  console.log(nfts);
  return nfts.map((i) => {
    return (
      <div className={styles.cards} key={nfts.indexOf(i)}>
        <div>
          {i.contractMetadata.name} {nfts.indexOf(i)}
        </div>
        <Image
          src={i.media[0].gateway}
          width={200}
          height={200}
          alt="ntf image"
        />
        <div className={styles.buyButtonDiv}>
          <button className={styles.buyButton}>Buy</button>
        </div>
      </div>
    );
  });
};

export default Cards;
