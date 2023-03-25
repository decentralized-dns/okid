require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",

  networks: {
    OKCTestnet: {
      url: process.env.OKCTestnet,
      blockGasLimit: 10000000,
      gas: 10000000,
      chainId: 66,
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      accounts: [process.env.OKCTestnetPrivateKey],
      allowUnlimitedContractSize: true,
    },
  },
};
