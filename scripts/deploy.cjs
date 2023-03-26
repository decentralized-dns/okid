
// yours, or create new ones.

const path = require("path");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Okid = await ethers.getContractFactory("Okid");
  const okid = await Okid.deploy();
  await okid.deployed();

  console.log("Okid address:", okid.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(okid);
}

function saveFrontendFiles(okid) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Okid: okid.address }, undefined, 2)
  );

  const OkidArtifact = artifacts.readArtifactSync("Okid");

  fs.writeFileSync(
    path.join(contractsDir, "Okid.json"),
    JSON.stringify(OkidArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
