# BIKECHAIN 🏍️⛓️
### Blockchain-Based Motorcycle History & Tamper-Resistant Verification Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)
[![Phase](https://img.shields.io/badge/Phase%201-UI%20Foundation%20Complete-emerald.svg)](#development-phases)
[![EVM Compatible](https://img.shields.io/badge/Blockchain-Ethereum%20Sepolia%20%2F%20Hardhat-blue.svg)](#blockchain-architecture)

> **"Every Bike Has a Story. Keep It on the Chain."**
> 
> *A decentralized, transparent lifecycle passport for motorcycles—recording ownership provenance, certified service milestones, odometer readings, and parts authenticity on an immutable distributed ledger.*

---

## 📌 Academic & Portfolio Context

BikeChain is engineered as both:
1. A rigorous **Blockchain Technology (BCT) Academic Capstone Project** demonstrating genuine decentralized ledger principles, smart contract access control, and cryptographic document hashing.
2. A production-grade **Portfolio Web Application** built with modern frontend engineering standards, automotive design tokens, responsive aesthetics, and strict security best practices.

> [!NOTE]
> **Prototype Honesty Notice**: BikeChain is a demonstration prototype. Demo records (e.g. Royal Enfield Guerrilla 450, KTM 390 Duke, Triumph Speed 400, BMW S 1000 RR) are clearly flagged. No unsupported claims of official government registration, vehicle manufacturer databases, or commercial insurer integrations are made.

---

## ⚡ Problem Statement

The secondary motorcycle market suffers from significant information asymmetry and fraud:
* **Odometer Rollbacks**: Odometers are routinely tampered with before resale to artificially inflate vehicle value.
* **Forged Paper Logbooks**: Traditional paper service booklets are easily fabricated, lost, or back-dated.
* **Counterfeit Replacement Parts**: Stolen or substandard critical safety components (brake pads, sprockets, ECU units) cannot be tracked to certified service centers.
* **Undisclosed Accident Histories**: Severe structural or frame damage is concealed from prospective second-hand buyers.

---

## 🛡️ The BikeChain Solution

BikeChain assigns every registered motorcycle a permanent digital identity: **BikeChain ID** (e.g., `BC-2026-RE-0001`).

1. **Immutable Provenance**: Every retail transfer from manufacturer/dealer to consecutive private owners is signed via Web3 wallets.
2. **Authorized Service Logging**: Only verified service center nodes can submit maintenance logs, mileage readings, and replaced parts hashes.
3. **Off-Chain / On-Chain Hybrid Storage**: Sensitive, large documents (PDF invoices, diagnostic logs) stay off-chain in MongoDB / IPFS, while their cryptographic SHA-256 digests are minted on-chain.
4. **Public QR Verification**: Prospective buyers can scan the motorcycle's QR code to verify complete historical legitimacy without needing an account.

---

## 🏛️ System Architecture

```text
                                  +---------------------------------------+
                                  |            PUBLIC USER / BUYER        |
                                  |    (Scan QR / Verify BikeChain ID)    |
                                  +-------------------+-------------------+
                                                      |
                                                      v
+-----------------------+              +--------------+--------------+
|     DEALERSHIP        |              |       REACT FRONTEND        |
|  (Register Bikes)     | <----------> | (Vite, Tailwind, Ethers.js) |
+-----------------------+              +--------------+--------------+
|    SERVICE CENTER     |                             |
|  (Log Maintenance)    |                             v
+-----------------------+              +--------------+--------------+
|      BIKE OWNER       |              |        METAMASK / WEB3      |
|  (Transfer Ownership) |              +--------------+--------------+
+-----------------------+                             |
                                                      v
                                       +--------------+--------------+
                                       |   SOLIDITY SMART CONTRACT   |
                                       |  (Ethereum Sepolia/Hardhat) |
                                       +--------------+--------------+
                                                      |
                   +----------------------------------+----------------------------------+
                   |                                                                     |
                   v                                                                     v
    +------------------------------+                                      +------------------------------+
    |       ON-CHAIN LEDGER        |                                      |      OFF-CHAIN STORAGE       |
    | - BikeChain ID & VIN Hash    |                                      | - High-res vehicle imagery   |
    | - Sequential Owner Addresses |                                      | - Full PDF service invoices  |
    | - Mileage Milestones         |                                      | - MongoDB metadata cache     |
    | - SHA-256 Document Hashes    | <=== Cryptographic Verification ===> | - Fast search queries        |
    +------------------------------+                                      +------------------------------+
```

---

## 🗂️ Project Structure

```text
bikechain/
├── frontend/             # Modern React 19 + Vite + Tailwind CSS + Lucide Icons
│   ├── src/
│   │   ├── components/   # Navbar, Footer, ThemeToggle, StatCard, BikeCard, etc.
│   │   ├── pages/        # LandingPage, VerifyPage, BikeProfilePage, DashboardPage
│   │   ├── layouts/      # RootLayout with persistent header and theme state
│   │   ├── hooks/        # useTheme (dark/light anti-FOUC), ThemeContext
│   │   ├── data/         # Demonstration records (RE Guerrilla 450, KTM 390 Duke, etc.)
│   │   ├── utils/        # Address and hash formatters, ID validation
│   │   ├── App.jsx       # Client-side router configuration
│   │   └── main.jsx
│   ├── index.html        # Automotive metadata, fonts & anti-FOUC theme script
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── backend/              # Node.js + Express + MongoDB (Phase 2)
│   └── README.md
│
├── blockchain/           # Hardhat + Solidity + Ethers.js (Phase 3)
│   └── README.md
│
├── docs/                 # Architectural specifications & diagrams
├── .env.example          # Environment variable template
├── .gitignore
├── LICENSE               # MIT License
└── README.md
```

---

## 🚀 Development Phases

| Phase | Milestone | Status | Description |
| :---: | :--- | :---: | :--- |
| **PHASE 1** | **UI Foundation** | **Completed** | Full automotive responsive UI, Landing, Verification hub, 6-tab Bike Profile, User Dashboard, Dark/Light theme system, zero-FOUC, and realistic demo data. |
| **PHASE 2** | **Backend API** | *Next* | Node.js, Express, MongoDB schemas, JWT authentication, and off-chain metadata caching. |
| **PHASE 3** | **Blockchain Layer** | *Queued* | Hardhat, Solidity `BikeChain.sol` smart contract, unit tests, local node, and Sepolia deployment scripts. |
| **PHASE 4** | **Web3 Integration** | *Queued* | Ethers.js, MetaMask live signing, and real-time transaction state progression. |
| **PHASE 5** | **QR Verification** | *Queued* | Public QR generation, mobile camera scanning, and verification deep links. |
| **PHASE 6** | **Advanced Features** | *Queued* | Role governance, SHA-256 document hashing, and block explorer verification. |

---

## 💻 Running the Application Locally (Phase 1)

### Prerequisites
* Node.js v18+ (tested on Node v24)
* npm or pnpm

### Frontend Setup
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies (if not already installed)
npm run build   # or npm install

# Start the Vite development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🎓 Academic BCT Viva Reference Sheet

Key concepts implemented across the project:

| Concept | Implementation in BikeChain |
| :--- | :--- |
| **Immutability** | Once an ownership transfer or service record is committed to a block, it cannot be edited or erased. |
| **Hashing (SHA-256)** | Off-chain service invoices and vehicle VINs are hashed. Matching the on-chain hash guarantees zero document tampering. |
| **Role-Based Access Control (RBAC)** | OpenZeppelin `AccessControl` restricts bike registration to `DEALER_ROLE` and service logs to `WORKSHOP_ROLE`. |
| **Consensus & Gas** | State updates require gas fees on the Ethereum EVM and achieve finality through Proof of Stake consensus. |
| **Digital Signatures** | EIP-712 / Web3 wallet signatures authenticate ownership transfers without exposing private keys. |

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
