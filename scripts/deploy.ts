import { ethers } from "hardhat";

// 11-03-2025, contract deployed to:
// 0xEad6A5dC01fC2A31ca309FA6108bd01d6aFCb912

// auto deploy contract to network script
async function main() {
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();
  
  await simpleStorage.waitForDeployment();
  console.log("Contract deployed to:", await simpleStorage.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});