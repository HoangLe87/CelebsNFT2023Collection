require("dotenv").config();

const baseURL = `https://eth-goerli.g.alchemy.com/v2/${process.env.API_KEY}/getNFTs/`;

const fetchURL = `${baseURL}?owner=${process.env.WALLET}&contractAddresses%5B%5D=${process.env.COLLECTION}`;

export default async function handler(req, res) {
  const data = await fetch(fetchURL).then((response) => response.json());

  res.json(data); // Send the response
}
