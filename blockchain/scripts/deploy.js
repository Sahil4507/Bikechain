import hre from "hardhat";
const { ethers } = hre;

async function main() {
  console.log("Starting BikeChain smart contract deployment...");

  const [deployer, dealer, workshop] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const BikeChain = await ethers.getContractFactory("BikeChain");
  const bikeChain = await BikeChain.deploy();
  await bikeChain.waitForDeployment();

  const contractAddress = await bikeChain.getAddress();
  console.log("BikeChain contract deployed to:", contractAddress);

  // Setup roles
  const DEALER_ROLE = await bikeChain.DEALER_ROLE();
  const WORKSHOP_ROLE = await bikeChain.WORKSHOP_ROLE();

  if (dealer) {
    await bikeChain.grantRole(DEALER_ROLE, dealer.address);
    console.log(`Granted DEALER_ROLE to: ${dealer.address}`);
  }

  if (workshop) {
    await bikeChain.grantRole(WORKSHOP_ROLE, workshop.address);
    console.log(`Granted WORKSHOP_ROLE to: ${workshop.address}`);
  }

  console.log("Deployment complete.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
