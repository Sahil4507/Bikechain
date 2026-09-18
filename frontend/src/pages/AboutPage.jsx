import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  HelpCircle, 
  Database, 
  Cpu, 
  Key, 
  FileText, 
  Lock, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  ExternalLink,
  Wallet,
  Binary,
  Server,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const vivaQuestions = [
    {
      q: "1. Why use blockchain instead of a traditional centralized database (e.g., PostgreSQL or MongoDB)?",
      category: "Core Rationale",
      a: "A traditional centralized database has a single point of administrative failure: any database administrator, hacker, or unethical dealership with write access can silently update a motorcycle's odometer, backdate a service, or erase collision repair history without leaving an unalterable audit trail. \n\nBlockchain introduces decentralized immutability. Once an event (such as a title transfer or certified 10,000 km service) is mined into a block, the cryptographic hash chaining and consensus mechanism prevent retrospective modification or deletion by any single party."
    },
    {
      q: "2. What exact data is stored on-chain vs. off-chain?",
      category: "Storage Architecture",
      a: "ON-CHAIN (EVM Blockchain):\n• Unique BikeChain ID (e.g., BC-2026-RE-0001)\n• Owner's public Ethereum address (title custody)\n• Sequential transfer events and block timestamps\n• SHA-256 cryptographic hashes of service invoices & part serials\n• Verified odometer readings (enforced strictly monotonic)\n• Role hashes (DEALER_ROLE, WORKSHOP_ROLE, DEFAULT_ADMIN_ROLE)\n\nOFF-CHAIN (IPFS / Secure Database):\n• High-resolution photographs & media\n• PDF service invoices, repair scans, and receipts\n• Detailed mechanical diagnostic logs and notes\n• Personal Identifiable Information (PII) such as phone numbers, emails, and legal names (complying with privacy regulations such as GDPR)."
    },
    {
      q: "3. Why can't we store vehicle photographs and complete PDF invoices on the blockchain?",
      category: "Gas Economics",
      a: "Storing 1 megabyte of arbitrary binary data directly on the Ethereum EVM costs thousands of dollars in gas execution fees because every byte must be replicated and permanently stored across thousands of validating nodes worldwide. \n\nInstead, BikeChain uses cryptographic hashing: we compute the 256-bit SHA-256 fingerprint (only 32 bytes) of the PDF invoice or image off-chain, and store only that 32-byte digest on-chain. This costs negligible gas while guaranteeing 100% cryptographic integrity."
    },
    {
      q: "4. How does BikeChain verify an off-chain document against the blockchain?",
      category: "Verification Logic",
      a: "When a workshop generates a service invoice, BikeChain computes its SHA-256 hash (e.g., `A8F9...D72E`) and stores that hash in the smart contract via `addServiceRecord()`. \n\nLater, if a buyer or inspector uploads the invoice PDF, BikeChain recomputes the SHA-256 hash locally in the browser using the Web Crypto API. If even a single digit, comma, or odometer number was altered, the resulting hash completely changes (avalanche effect). A match between the recomputed hash and the smart contract's stored hash proves mathematically that the invoice is 100% genuine and unaltered."
    },
    {
      q: "5. How does BikeChain prevent odometer tampering (mileage rollback fraud)?",
      category: "Business Logic",
      a: "In the Solidity smart contract, the `addServiceRecord()` function includes a strict validation assertion:\n`require(newOdometer >= bikes[bikeId].currentOdometer, \"Odometer rollback rejected: New reading cannot be lower than previous\");`\n\nBecause blockchain transactions cannot be backdated or overwritten, a fraudulent workshop or seller cannot roll back the odometer to inflate the bike's resale value without reverting the transaction."
    },
    {
      q: "6. Who is authorized to add a service record or register a motorcycle?",
      category: "Access Control",
      a: "BikeChain enforces strict role-based access control using OpenZeppelin's `AccessControl` library:\n• DEALER_ROLE: Only authorized motorcycle dealerships or OEMs can call `registerBike()` to mint a new digital vehicle passport.\n• WORKSHOP_ROLE: Only certified, KYC-verified service centers can call `addServiceRecord()` and log maintenance.\n• DEFAULT_ADMIN_ROLE: Governed by the platform contract owner to authorize or revoke dealer and workshop nodes.\n• Individual bike owners CANNOT add service records; they can only sign and authorize `transferOwnership()`."
    },
    {
      q: "7. What stops an owner from creating a fake service record to claim their bike was maintained?",
      category: "Trust Boundary",
      a: "The smart contract's `addServiceRecord()` function uses the `onlyRole(WORKSHOP_ROLE)` modifier. If an ordinary owner calls this function using their personal wallet address, the EVM transaction reverts immediately with an 'AccessControlUnauthorizedAccount' error. Only cryptographic private keys registered to certified workshop nodes have execution permission."
    },
    {
      q: "8. How does ownership transfer work cryptographically?",
      category: "Custody Handover",
      a: "When a motorcycle is sold, the current recorded owner signs a transaction calling `transferOwnership(bikeId, newOwnerAddress)`. \n\nThe contract verifies `msg.sender == bikes[bikeId].currentOwner`. Upon execution, the contract updates `bikes[bikeId].currentOwner = newOwnerAddress` and emits an `OwnershipTransferred` event logged with the block number, timestamp, and transaction hash, establishing an unbroken provenance chain."
    },
    {
      q: "9. Why is the Chassis VIN hashed rather than stored as plain text?",
      category: "Privacy & Anti-Theft",
      a: "Chassis VINs are unique identifiers that can be exploited by criminals for vehicle cloning or social engineering if published openly on a public, permissionless blockchain. \n\nBikeChain masks the VIN in the UI (e.g., `ME3GR450***9821`) and stores its cryptographic SHA-256 hash on-chain. An authorized prospective buyer who physically inspects the vehicle can input the physical VIN to verify that its hash matches the on-chain registry without exposing private records publicly."
    },
    {
      q: "10. What is the exact Web3 architectural stack and user interaction flow?",
      category: "Stack Architecture",
      a: "The end-to-end flow is:\n1. User interacts with the React 19 / Vite UI.\n2. The frontend uses Ethers.js v6 to serialize function parameters (e.g., `bikeId`, `invoiceHash`).\n3. The user prompts MetaMask to sign the transaction with their private key.\n4. MetaMask broadcasts the signed RPC payload to the Ethereum node (Sepolia EVM testnet).\n5. The EVM validates role modifiers, updates state variables, and emits an indexed Event log.\n6. The React UI listens to contract events and refreshes the vehicle passport in real time."
    },
    {
      q: "11. What smart contract functions are defined for the Phase 3 implementation?",
      category: "Smart Contracts",
      a: "The core `BikeChain.sol` contract defines four essential functions:\n1. `registerBike(string bikeId, bytes32 vinHash, address initialOwner, uint16 year)` [DEALER_ROLE]\n2. `transferOwnership(string bikeId, address newOwner, uint256 odometer)` [Current Owner]\n3. `addServiceRecord(string bikeId, uint256 odometer, bytes32 invoiceHash, string serviceCenter)` [WORKSHOP_ROLE]\n4. `verifyRecord(string bikeId, bytes32 documentHash)` [Public View / Free Call]"
    },
    {
      q: "12. Why does the current frontend use demonstration data and how will Phase 3 activate?",
      category: "Academic Honesty",
      a: "Phase 1 focuses on designing an intuitive, Carfax-grade digital vehicle passport UI, client-side SHA-256 hashing demos, and role perspectives without requiring viva examiners to hold testnet ETH or install MetaMask just to inspect features.\n\nIn Phase 3, the mock data provider is replaced with an `ethers.Contract` instance connected to deployed Sepolia testnet contracts, seamlessly bridging the existing UI with live blockchain transactions."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tech-500/10 border border-tech-500/20 text-xs font-mono font-bold text-tech-700 dark:text-tech-300">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ACADEMIC BCT VIVA REFERENCE GUIDE</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          How BikeChain Works: Architecture & Viva Guide
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          BikeChain is an academic capstone and portfolio project demonstrating how blockchain technology, 
          cryptographic document hashing, and role-based smart contracts solve used-motorcycle odometer fraud and title tampering.
        </p>
      </div>

      {/* 1. The Core Lifecycle Concept Workflow */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-tech-600 dark:text-tech-400" />
          <span>1. The Core Lifecycle Concept</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Motorcycle Genesis', desc: 'Authorized OEM/Dealer registers the motorcycle with its masked VIN and production year.' },
            { step: '02', title: 'BikeChain ID', desc: 'A unique digital passport ID (e.g. BC-2026-RE-0001) is minted on-chain.' },
            { step: '03', title: 'Lifecycle Events', desc: 'Workshops and owners log service milestones, parts replacements, and transfers.' },
            { step: '04', title: 'Document Hashing', desc: 'Off-chain PDF invoices are digested into immutable 256-bit SHA-256 hashes.' },
            { step: '05', title: 'Public Verification', desc: 'Anyone can verify invoice authenticity and odometer progression instantly.' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 relative">
              <span className="text-xs font-mono font-bold text-tech-600 dark:text-tech-400">STEP {item.step}</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Web3 Architectural Stack */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-tech-600 dark:text-tech-400" />
            <span>2. Full-Stack Web3 Architectural Pipeline</span>
          </h2>
          <p className="text-xs text-slate-500">
            End-to-end communication from the browser client to the Ethereum Virtual Machine (EVM).
          </p>
        </div>

        {/* Visual Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Frontend UI</span>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">React 19 + Vite</div>
            <p className="text-[11px] text-slate-500">Tailwind CSS & Web Crypto API</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">RPC Client</span>
            <div className="text-sm font-extrabold text-tech-600 dark:text-tech-400">Ethers.js v6</div>
            <p className="text-[11px] text-slate-500">Contract ABI provider & serialization</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Signer Node</span>
            <div className="text-sm font-extrabold text-amber-600 dark:text-amber-400">MetaMask / Wallet</div>
            <p className="text-[11px] text-slate-500">Private key signature generation</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Smart Contract</span>
            <div className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">Solidity 0.8.20</div>
            <p className="text-[11px] text-slate-500">OpenZeppelin AccessControl</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Consensus Ledger</span>
            <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">EVM Blockchain</div>
            <p className="text-[11px] text-slate-500">Sepolia Testnet / Hardhat</p>
          </div>
        </div>
      </div>

      {/* 3. On-Chain vs. Off-Chain Storage Matrix */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Database className="w-5 h-5 text-tech-600 dark:text-tech-400" />
            <span>3. On-Chain vs. Off-Chain Storage Architecture</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            A critical BCT viva concept: Why blockchains should only store lightweight cryptographic proofs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* On-Chain Table */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-tech-600 dark:text-tech-400 font-bold text-sm uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>On-Chain Storage (EVM State)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>BikeChain ID</strong> & mapped token identifier</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Current Owner Address</strong> (`address public currentOwner`)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Chassis VIN Hash</strong> (32-byte SHA-256 digest)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Service Invoice Hashes</strong> (`bytes32 invoiceHash`)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Verified Odometers</strong> (strictly monotonic check)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Role Permissions</strong> (`DEALER_ROLE`, `WORKSHOP_ROLE`)</span>
              </li>
            </ul>
          </div>

          {/* Off-Chain Table */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-sm uppercase tracking-wider">
              <Server className="w-4 h-4" />
              <span>Off-Chain Storage (IPFS / Secure DB)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5"></span>
                <span><strong>Heavy Media & Scans</strong> (avoiding exorbitant gas costs)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5"></span>
                <span><strong>Original PDF Invoices & Receipts</strong> (hashed before upload)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5"></span>
                <span><strong>Technician Notes & Diagnostics</strong> (granular mechanical text)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5"></span>
                <span><strong>Owner PII</strong> (names, phones, emails kept private for GDPR)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5"></span>
                <span><strong>Search Indices</strong> (for rapid UI filtering and querying)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. 12-Question BCT Viva Reference Sheet */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-tech-600 dark:text-tech-400" />
            <span>4. BCT Viva Defense Cheat Sheet (12 Comprehensive Answers)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Click any question to view the exact academic defense answers prepared for professors and viva examiners.
          </p>
        </div>

        <div className="space-y-3">
          {vivaQuestions.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  className="w-full p-4 sm:p-5 text-left bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-800/40 flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-tech-600 dark:text-tech-400 block">
                      {item.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {item.q}
                    </h3>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Smart Contract Interface Preview */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
          <Binary className="w-5 h-5 text-tech-600 dark:text-tech-400" />
          <span>5. Planned Smart Contract Interface (`BikeChain.sol`)</span>
        </h2>
        <p className="text-xs text-slate-500">
          OpenZeppelin AccessControl blueprint designed for Phase 3 EVM deployment.
        </p>

        <pre className="p-5 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract BikeChain is AccessControl {
    bytes32 public constant DEALER_ROLE = keccak256("DEALER_ROLE");
    bytes32 public constant WORKSHOP_ROLE = keccak256("WORKSHOP_ROLE");

    struct VehiclePassport {
        string bikeId;
        bytes32 vinHash;
        address currentOwner;
        uint16 productionYear;
        uint256 currentOdometer;
        bool isRegistered;
    }

    mapping(string => VehiclePassport) public bikes;
    event BikeRegistered(string indexed bikeId, address indexed initialOwner);
    event OwnershipTransferred(string indexed bikeId, address indexed from, address indexed to);
    event ServiceLogged(string indexed bikeId, uint256 odometer, bytes32 indexed invoiceHash);

    // Mint genesis digital passport (Dealers only)
    function registerBike(string calldata bikeId, bytes32 vinHash, address initialOwner, uint16 year)
        external onlyRole(DEALER_ROLE) { ... }

    // Handover title custody (Current owner only)
    function transferOwnership(string calldata bikeId, address newOwner, uint256 odometer) 
        external { ... }

    // Append certified service record with rollback prevention (Workshops only)
    function addServiceRecord(string calldata bikeId, uint256 newOdometer, bytes32 invoiceHash) 
        external onlyRole(WORKSHOP_ROLE) {
        require(newOdometer >= bikes[bikeId].currentOdometer, "Odometer rollback detected");
        ...
    }
}`}
        </pre>
      </div>

    </div>
  );
}
