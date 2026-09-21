# BikeChain 🏍️⛓️

**A Blockchain-Based Motorcycle Digital Record & Cryptographic Verification Platform**  
*Academic Project for Blockchain Technology (BCT)*

[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-363636?logo=solidity)](https://soliditylang.org/)
[![OpenZeppelin](https://img.shields.io/badge/OpenZeppelin-Contracts%205.x-4E5EE4?logo=openzeppelin)](https://openzeppelin.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Hardhat](https://img.shields.io/badge/Hardhat-3.x-FFF100?logo=ethereum)](https://hardhat.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)

---

## 1. Project Introduction

**BikeChain** is a decentralized motorcycle lifecycle passport and verification platform developed as an academic Blockchain Technology (BCT) capstone project.

In the conventional automotive industry, motorcycle service records, ownership provenance, and odometer readings are stored in fragmented, centralized databases or easily forged paper logbooks. BikeChain replaces this fragile trust model with an immutable, auditable distributed ledger architecture:
- Every motorcycle receives a unique, permanent **BikeChain ID** (e.g., `BC-0001`).
- Lifecycle milestones (dealership registrations, certified workshop maintenance, ownership transfers) are immutably logged with cryptographic proofs.
- Document integrity (service invoices, inspection certificates, registration titles) is verified using browser-native **SHA-256 cryptographic hashing**.

---

## 2. Problem Statement

The secondary and pre-owned two-wheeler market suffers from acute information asymmetry, fraud, and lack of transparency:

1. **Odometer Tampering (Clocking)**: Odometers are routinely rolled back before resale to artificially inflate vehicle value and hide wear-and-tear.
2. **Forged Service Histories**: Paper logbooks and generic PDF service bills are easily fabricated, duplicated, or backdated.
3. **Ghost Ownership Transfers**: Private resale transactions lack a transparent chronological title chain, making it difficult to verify how many previous owners a motorcycle actually had.
4. **Counterfeit Replacement Parts**: Stolen or uncertified aftermarket components are installed without permanent traceability.
5. **Accident Concealment**: Major structural frame repairs are frequently hidden from prospective buyers.

---

## 3. Core Features

### 🔍 Clean Motorcycle Lookup
- **Multi-Identifier Search**: Search motorcycles instantly using either their unique **BikeChain ID** (e.g., `BC-0001`) or official **Registration Number Plate** (e.g., `MH 02 EQ 4091`).
- **Text-Focused Interface**: Clean, clutter-free user interface designed around high-contrast typography, structural specifications, and verified data cards—without distracting decorative stock photos.

### 📋 4-Part Structured Vehicle Profile
Every motorcycle record is structured into four logically organized sections:
1. **Bike Overview**: Model, manufacturer, production year, number plate, current owner, verified odometer, and status badge.
2. **Technical Specifications**: Verified mechanical specs filterable across four categories:
   - *Engine & Performance*: Displacement, engine architecture, max power, max torque, transmission, cooling, fuel type.
   - *Dimensions & Capacity*: Kerb weight, fuel tank capacity, seat height, ground clearance.
   - *Chassis & Hardware*: Front/rear suspension, front/rear brakes, ABS specification, tyre dimensions.
   - *Efficiency*: Official claimed mileage and test cycle notes.
3. **Ownership & Service History**: A single, chronological vertical timeline recording initial dealership registration, certified periodic maintenance, and private ownership transfers with authorized parties and mileage stamps.
4. **Record Verification**: Stored cryptographic document fingerprint (SHA-256) with 1-click clipboard copy and an interactive browser-based verification tool.

### 🛡️ Interactive SHA-256 Document Verifier
- Computes real-time cryptographic digests directly in the browser via the native Web Cryptography API (`window.crypto.subtle`).
- Supports both **direct text input** and **local file upload** (PDF, image, text invoices) without uploading sensitive documents to external servers.
- Features a **"⚡ Test with Verified Sample Certificate"** button that pre-loads genuine certified document data for instant live examination during viva presentations.
- Delivers a clear **MATCH** (green) or **MISMATCH** (rose) verdict.

### ⛓️ Solidity Smart Contract (`BikeChain.sol`)
- Implements role-based access control with OpenZeppelin `AccessControl`.
- Enforces strict monotonic odometer validation—rejecting any service record where the new odometer reading is lower than the recorded mileage.
- Validates on-chain document hashes against submitted digests.

---

## 4. How BikeChain Works

```text
MOTORCYCLE MANUFACTURED
          ↓
Assigned Unique BikeChain ID (e.g. BC-0001)
          ↓
Authorized Dealer registers bike on-chain (DEALER_ROLE)
          ↓
Certified Workshop logs service milestones & odometer (WORKSHOP_ROLE)
          ↓
Service invoice or certificate is hashed off-chain using SHA-256
          ↓
Cryptographic hash (32-byte digest) is committed to smart contract
          ↓
Prospective buyer or inspector queries BikeChain ID
          ↓
Verifies document integrity: Local Hash === On-Chain Hash
```

---

## 5. On-Chain vs Off-Chain Architecture

A common misconception in blockchain development is attempting to store large multimedia files directly on the distributed ledger. Doing so is technically and economically prohibitive due to high gas costs and block size limits.

BikeChain adheres to industry-standard hybrid architecture:

| Data Type | Storage Location | Rationale |
| :--- | :---: | :--- |
| **BikeChain ID & Model Name** | **On-Chain** | Core identification index for immutable global lookup. |
| **Owner Wallet Addresses & History** | **On-Chain** | Verifiable ownership provenance and non-repudiation. |
| **Mileage / Odometer Milestones** | **On-Chain** | Tamper-proof monotonic record to detect rollback fraud. |
| **Document Cryptographic Hashes (SHA-256)** | **On-Chain** | 32-byte fingerprints providing mathematical integrity proofs. |
| **Full PDF Invoices & Service Reports** | **Off-Chain** | Retained locally or in off-chain databases/IPFS; too large for ledger storage. |
| **High-Resolution Imagery** | **Off-Chain** | Off-chain storage preserves ledger bandwidth and prevents chain bloat. |
| **Detailed Mechanical Manuals** | **Off-Chain** | Static manufacturer documentation stored off-chain. |

---

## 6. Technology Stack

### Frontend Application
- **Framework**: React 19 + Vite 6
- **Routing**: React Router v7 (`createBrowserRouter` with SPA client routing)
- **Styling**: Tailwind CSS 3.4 + `@tailwindcss/forms`
- **Icons**: Lucide React
- **Cryptography**: Browser-Native Web Cryptography API (`crypto.subtle`)

### Blockchain & Smart Contracts
- **Language**: Solidity `^0.8.20`
- **Security & Standards**: OpenZeppelin Contracts v5 (`AccessControl`)
- **Development Environment**: Hardhat 3.x (ESM modules)
- **Library**: Ethers.js v6
- **Compiler**: `solc` 0.8.20 with optimizer enabled (200 runs)

### Hosting & Deployment
- **Platform**: Vercel (Single Page Application configuration)
- **Version Control**: Git & GitHub (`Sahil4507/Bikechain`)

---

## 7. Project Structure

```text
bikechain/
├── blockchain/                      # Smart contract environment (Hardhat + Solidity)
│   ├── contracts/
│   │   └── BikeChain.sol            # Core smart contract with RBAC & verification
│   ├── scripts/
│   │   └── deploy.js                # Automated deployment script
│   ├── test/
│   │   ├── test-contract.js         # Interface, ABI, and compiler test suite
│   │   └── test-execution.js        # Live local EVM execution test suite
│   ├── hardhat.config.js            # Hardhat configuration (Solidity 0.8.20 ESM)
│   ├── package.json                 # Blockchain workspace dependencies
│   └── README.md                    # Smart contract documentation
│
├── frontend/                        # Web application (React + Vite + Tailwind CSS)
│   ├── public/                      # Static assets and favicon
│   ├── src/
│   │   ├── components/              # Navbar, Footer, ThemeToggle, etc.
│   │   ├── data/
│   │   │   └── mockBikes.js         # Curated demonstration records & specifications
│   │   ├── pages/
│   │   │   ├── HomePage.jsx         # Landing page with search & architecture overview
│   │   │   ├── BikeSearchPage.jsx   # Dedicated search & motorcycle discovery hub
│   │   │   ├── BikeProfilePage.jsx  # 4-section motorcycle profile & SHA-256 verifier
│   │   │   └── AboutPage.jsx        # Project background, architecture, and BCT viva guide
│   │   ├── utils/
│   │   │   └── crypto.js            # In-browser SHA-256 text & file byte hasher
│   │   ├── App.jsx                  # React Router configuration
│   │   ├── index.css                # Tailwind directives and utility classes
│   │   └── main.jsx                 # React root mount
│   ├── index.html                   # HTML entry point with zero-FOUC theme script
│   ├── tailwind.config.js           # Automotive slate & indigo design tokens
│   ├── vercel.json                  # Vercel SPA rewrite rules
│   ├── vite.config.js               # Vite bundler configuration
│   └── package.json                 # Frontend dependencies
│
├── .gitignore                       # Node modules, build artifacts, and secrets ignored
├── package.json                     # Root orchestrator scripts
├── LICENSE                          # MIT License
└── README.md                        # Project documentation
```

---

## 8. Development Status (Implemented vs In Development)

In accordance with academic integrity guidelines, the current state of BikeChain clearly distinguishes implemented modules from ongoing integrations:

| Module | Status | Details |
| :--- | :---: | :--- |
| **Search & Discovery UI** | ✅ **Implemented** | Search by BikeChain ID or number plate; responsive card grid. |
| **4-Part Vehicle Profile** | ✅ **Implemented** | Overview, 4 spec categories, chronological timeline, verification hub. |
| **Browser SHA-256 Verifier** | ✅ **Implemented** | Authentic text and raw binary file byte hashing via `crypto.subtle`. |
| **Sample Certificate Testing** | ✅ **Implemented** | One-click button pre-loads verified sample for instant MATCH verdict. |
| **Solidity Smart Contract** | ✅ **Implemented** | `BikeChain.sol` compiled and unit-tested in `blockchain/`. |
| **Hardhat Test Suite** | ✅ **Implemented** | Interface verification and full contract lifecycle tests passing. |
| **Vercel SPA Deployment** | ✅ **Implemented** | Vercel configured with root directory `frontend/` and SPA rewrites. |
| **Live Wallet / MetaMask Signing** | 🚧 *In Development* | Direct browser-to-contract Web3 signing via Ethers.js. |
| **Public Testnet Deployment** | 🚧 *In Development* | Contract deployment target for Ethereum Sepolia testnet. |

> [!NOTE]
> The web application currently utilizes curated demonstration records (`mockBikes.js`) to demonstrate system mechanics without requiring judges or examiners to install MetaMask or hold testnet ETH. The smart contract layer is fully implemented and tested independently in `blockchain/`.

---

## 9. Installation & Setup

### Prerequisites
- **Node.js**: v18 or higher (tested on Node v20 & v24)
- **Git**: Installed and configured
- **npm** or **pnpm**

### Clone the Repository
```bash
git clone https://github.com/Sahil4507/Bikechain.git
cd Bikechain
```

---

## 10. Running Locally (Frontend & Blockchain)

### 1. Run the Frontend Application
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
Open your browser at `http://localhost:5173`.

### 2. Build Frontend for Production
```bash
cd frontend
npm run build
```
The compiled production bundle is generated in `frontend/dist/`.

---

## 11. Smart Contract Development & Testing

The smart contract is located in the `blockchain/` directory and managed via Hardhat.

### 1. Install Blockchain Dependencies
```bash
cd blockchain
npm install
```

### 2. Compile Smart Contracts
```bash
npm run compile
```
Compiles `contracts/BikeChain.sol` using Solidity 0.8.20 and outputs artifacts to `artifacts/`.

### 3. Run Smart Contract Interface Test
```bash
npm run test
```
Verifies contract compilation, ABI definitions, role constants, and essential functions (`registerBike`, `transferOwnership`, `addServiceRecord`, `getBikeRecord`, `verifyDocumentHash`, `getRecordCounts`).

### 4. Deploy Contract to Local Node (Optional)
```bash
# Terminal 1: Start local Hardhat EVM node
npx hardhat node

# Terminal 2: Deploy contract and seed roles
node scripts/deploy.js
```

---

## 12. Vercel Deployment

BikeChain is configured for smooth deployment on Vercel as a standalone project:

- **Repository**: `Sahil4507/Bikechain`
- **Root Directory**: `frontend` *(Vercel runs builds directly inside `frontend`)*
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### SPA Routing Configuration (`frontend/vercel.json`)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
This ensures that deep URLs such as `/bike/BC-0001` or `/bikes` route correctly to `index.html` without 404 errors on page reload.

---

## 13. Academic Disclaimer

This software is developed strictly for **academic and demonstration purposes** as a Blockchain Technology (BCT) capstone project.

- Vehicle registration numbers, owner identities, and service invoice contents presented in demonstration profiles are fictional and do not represent real individuals or legal vehicle records.
- Manufacturer names (e.g., Royal Enfield, KTM, BMW Motorrad, Triumph) and mechanical specifications are referenced strictly for realistic technical demonstration.
- BikeChain does not claim affiliation with any government transport department, regional transport office (RTO), or motor vehicle manufacturer.

---

## 14. Future Development

The planned roadmap for subsequent development phases includes:

1. **Web3 MetaMask Integration**: Enabling users and certified workshops to connect Web3 wallets directly on the frontend for live transaction signing.
2. **Sepolia Testnet Deployment**: Deploying `BikeChain.sol` to Ethereum Sepolia and linking transaction hashes directly to Etherscan.
3. **QR Code Generation**: Automatically rendering printable QR code stickers for each motorcycle profile, enabling one-scan physical verification.
4. **Decentralized IPFS Storage**: Storing off-chain service document PDFs on Filecoin/IPFS with content identifiers (CIDs) anchored directly to the smart contract.
5. **Decentralized Identifier (DID) Integration**: Verifying authorized workshop identity credentials using W3C DID standards.

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
