const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const wallet = new Keypair();

const publicKey = new PublicKey(wallet._keypair.publicKey);
const secretKey = wallet._keypair.secretKey;

const getWalletBalance = async () => {
  try {
    // mainnet - prod
    // devnet - dev - https://api.devnet.solana.com
    // testnet - test
    const devnetUrl = clusterApiUrl("devnet");
    // console.log(devnetUrl);

    const connection = new Connection(devnetUrl, "confirmed");
    const walletBalance = await connection.getBalance(publicKey);

    console.log(`Wallet balance is ${walletBalance}`);
    console.log(
      `Wallet balance is ${parseFloat(walletBalance) / LAMPORTS_PER_SOL} SOL`
    );
  } catch (err) {
    console.error(err);
  }
};

const airDropSol = async () => {
  try {
    // mainnet - prod
    // devnet - dev
    // testnet - test
    const devnetUrl = clusterApiUrl("devnet");
    // console.log(devnetUrl);
    const connection = new Connection(devnetUrl, "confirmed");

    // x /= y => x = x / y

    const sols = (2 * LAMPORTS_PER_SOL) / LAMPORTS_PER_SOL;

    // console.log(sols);

    const fromAirDropSignature = await connection.requestAirdrop(
      publicKey,
      1.0024 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (error) {
    console.error(err);
  }
};

const main = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};
main();
