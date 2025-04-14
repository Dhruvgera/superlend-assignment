// We require the Hardhat Runtime Environment explicitly here.
const hre = require("hardhat");

async function main() {
  console.log("Deploying LendingVault contract...");

  // Get the ContractFactory and Signer
  const LendingVault = await hre.ethers.getContractFactory("LendingVault");
  
  // Deploy the contract
  const lendingVault = await LendingVault.deploy();

  // Wait for the contract to be deployed
  await lendingVault.waitForDeployment();

  console.log("LendingVault deployed to:", await lendingVault.getAddress());
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 