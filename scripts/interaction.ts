// scripts/interaction.ts
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

// run this script with:
// npx ts-node scripts/interaction.ts

async function main() {
    // Initialize provider and wallet
    const provider = new ethers.JsonRpcProvider("https://sepolia-rpc.scroll.io");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  
    // Replace with your deployed contract address
    const contractAddress = "0xEad6A5dC01fC2A31ca309FA6108bd01d6aFCb912"; // Use the actual address, not an ENS name
  
    // ABI of the SimpleStorage contract
    const abi = [
      "function setNumber(uint256 _number)",
      "function getNumber() view returns (uint256)",
      "event NumberUpdated(uint256 newNumber)"
    ];
  
    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, abi, wallet);
  
    // Step 1: Read the current number
    const currentNumber = await contract.getNumber();
    console.log("Current number:", currentNumber.toString());
  
    // Step 2: Increment the number
    const incrementAmount = 1; // You can change this to any value
    const newNumber = currentNumber + BigInt(incrementAmount);
  
    // Step 3: Update the number in the contract
    console.log("Updating number to:", newNumber.toString());
    const tx = await contract.setNumber(newNumber);
    console.log("Transaction hash:", tx.hash);
  
    // Wait for the transaction to be confirmed
    const receipt = await tx.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
  
    // Step 4: Verify the updated number
    const updatedNumber = await contract.getNumber();
    console.log("Updated number:", updatedNumber.toString());
  }
  
  main().catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
  });