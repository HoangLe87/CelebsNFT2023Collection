const main = async () => {
  const celebsNFTContract = await hre.ethers.getContractFactory("CelebsNFT");
  console.log("=== Starting deploy ===");
  const celebsNFT = await celebsNFTContract.deploy();
  await celebsNFT.deployed();
  console.log("celebsNFT contract deployed to address: ", celebsNFT.address);
  console.log("=== calling safeMint function ===");
  let txn1 = await celebsNFT.safeMint();
  await txn1.wait();
  console.log("Minting done.");
};

const runMain = (async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
