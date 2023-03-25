require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",

  networks: {
    OKCMainnet: {
      url: process.env.OKCMainnet,
      blockGasLimit: 10000000,
      gas: 10000000,
      chainId: 66,
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      accounts: [process.env.OKCMainnetPrivateKey],
      allowUnlimitedContractSize: true,
    },
    OKCTestnet: {
      url: process.env.OKCTestnetNode,
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
