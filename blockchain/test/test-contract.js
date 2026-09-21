import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ethers } from 'ethers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTests() {
  console.log("==================================================");
  console.log("BIKECHAIN SMART CONTRACT TEST SUITE");
  console.log("==================================================\n");

  // Load compiled artifact
  const artifactPath = path.join(__dirname, '../artifacts/contracts/BikeChain.sol/BikeChain.json');
  if (!fs.existsSync(artifactPath)) {
    throw new Error(`Artifact not found at ${artifactPath}. Run 'npx hardhat compile' first.`);
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
  const { abi, bytecode } = artifact;

  // We can spin up an in-memory JSON-RPC provider or test using Hardhat's default network or ethers
  // Let's connect to local Hardhat node or mock provider
  console.log("1. Artifact Loaded Successfully.");
  console.log(`   Contract Name: BikeChain`);
  console.log(`   ABI Functions: ${abi.filter(item => item.type === 'function').length} functions`);
  console.log(`   Bytecode Size: ${(bytecode.length / 2).toFixed(0)} bytes\n`);

  // Verify function interfaces required by prompt
  const requiredFunctions = [
    'registerBike',
    'transferOwnership',
    'addServiceRecord',
    'getBikeRecord',
    'verifyDocumentHash',
    'getRecordCounts',
    'hasRole'
  ];

  const contractFunctionNames = abi.filter(item => item.type === 'function').map(f => f.name);

  console.log("2. Verifying Required Smart Contract Interface:");
  let missing = false;
  for (const fn of requiredFunctions) {
    if (contractFunctionNames.includes(fn)) {
      console.log(`   [PASS] Function '${fn}()' is defined in contract ABI`);
    } else {
      console.log(`   [FAIL] Missing required function: '${fn}()'`);
      missing = true;
    }
  }

  if (missing) {
    throw new Error("Contract interface does not meet requirements.");
  }

  console.log("\n==================================================");
  console.log("INTERFACE & COMPILATION VERIFICATION: ALL PASSED");
  console.log("==================================================");
}

runTests().catch(err => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
