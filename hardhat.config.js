require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",

  networks: {
    OKCTestnet: {
      url: "https://exchaintestrpc.okex.org",
      // blockGasLimit: 10000000,
      // gas: 10000000,
      chainId: 65,
      // throwOnTransactionFailures: true,
      // throwOnCallFailures: true,
      accounts: [process.env.OKCTestnetPrivateKey],
      // allowUnlimitedContractSize: true,
    },
  },
};
