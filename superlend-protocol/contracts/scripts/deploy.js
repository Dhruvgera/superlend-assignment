// Import Hardhat runtime
const hre = require("hardhat");

// Main deployment function
async function main() {
  console.log("Starting deployment of SuperLend contracts...");
  console.log("==============================================");
  
  // Get network info
  const network = await hre.ethers.provider.getNetwork();
  console.log(`Deploying to network: ${network.name} (chainId: ${network.chainId})`);
  
  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deployer address: ${deployer.address}`);
  console.log(`Deployer balance: ${hre.ethers.formatEther(await deployer.provider.getBalance(deployer.address))} ETH`);
  
  // Deploy LendingVault contract
  console.log("\n📄 Deploying LendingVault contract...");
  const LendingVault = await hre.ethers.getContractFactory("LendingVault");
  
  // Deploy the contract
  const lendingVault = await LendingVault.deploy();

  // Wait for the contract to be deployed
  await lendingVault.waitForDeployment();

  const vaultAddress = await lendingVault.getAddress();
  console.log(`✅ LendingVault deployed to: ${vaultAddress}`);
  
  // Deployment success!
  console.log("\n✨ All contracts deployed successfully! ✨");
  console.log("==============================================");

}

// Run the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed!");
    console.error(error);
    process.exit(1);
  }); 