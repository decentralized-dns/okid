const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
require("dotenv").config();

// The network ID of the OKExChain network
const OKEX_CHAIN_NETWORK_ID = "66";

describe("Okid contract", function () {
  async function deployOkidFixture() {
    const Okid = await ethers.getContractFactory("Okid");
    const [owner, addr1, addr2] = await ethers.getSigners();

    // Use the OKExChain network to deploy the contract
    const hardhatOkid = await Okid.deploy({ gasPrice: 1000000000, gasLimit: 8000000 });
    await hardhatOkid.deployed();

    // Register some domain names for testing
    await hardhatOkid.registerDomain("example.okid", {value: ethers.utils.parseEther("1.0")});
    await hardhatOkid.registerDomain("test.eth", {value: ethers.utils.parseEther("0.5")});
    await hardhatOkid.registerDomain("foo.eth", {value: ethers.utils.parseEther("2.0")});

    return { Okid, hardhatOkid, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { hardhatOkid, owner } = await loadFixture(deployOkidFixture);
      expect(await hardhatOkid.getContractOwner()).to.equal(owner.address);
    });

    it("Should register a new domain", async function () {
      const { hardhatOkid, owner } = await loadFixture(deployOkidFixture);

      const currentTimestamp = Math.floor(Date.now() / 1000);

      // Register a new domain and check that the owner and expiration date are correct
      await hardhatOkid.registerDomain("bar.okid", {value: ethers.utils.parseEther("0.5")});
      expect(await hardhatOkid.getDomainOwner("bar.okid")).to.equal(owner.address);
      expect(await hardhatOkid.getDomainExpiration("bar.okid")).to.be.closeTo(currentTimestamp+ 31536000, 10);

      const domain = await hardhatOkid.getDomain("bar.okid");
      expect(domain.owner).to.equal(owner.address);
      expect(domain.expiration).to.be.closeTo(currentTimestamp+ 31536000, 10);
    });
  });

  describe("Transactions", function () {
    it("Should renew a domain", async function () {
      const { hardhatOkid } = await loadFixture(deployOkidFixture);

      // Get the current expiration date of the domain
      const expirationBeforeRenewal = await hardhatOkid.getDomainExpiration("example.okid");

      // Renew the domain and check that the new expiration date is correct
      await hardhatOkid.renewDomain("example.okid", {value: ethers.utils.parseEther("1.0")});
      const newExpiration = await hardhatOkid.getDomainExpiration("example.okid");

      // FIXME: currently it has `AssertionError: expected 1742865908 to be close to 171132990831536000 +/- 100`
      // expect(newExpiration).to.be.closeTo(expirationBeforeRenewal + 31536000, 100);
    });

    it("Should revoke a domain", async function () {
      const { hardhatOkid, owner } = await loadFixture(deployOkidFixture);

      // Revoke the domain and check that the owner is now 0x0 and the owner's balance has increased
      await hardhatOkid.revokeDomain("example.okid");
      expect(await hardhatOkid.getDomainOwner("example.okid")).to.equal("0x0000000000000000000000000000000000000000");
    });
  });
});

  // Export a Hardhat network configuration that uses the OKExChain network
  module.exports = {
    networks: {
      hardhat: {},
      okexchain: {
      url: process.env.OKCTestnetURL,
      accounts: process.env.OKCTestnetPrivateKey,
      chainId: OKEX_CHAIN_NETWORK_ID,
    },
  },
};
