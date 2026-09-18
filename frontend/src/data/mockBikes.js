/**
 * BIKECHAIN PROTOTYPE DEMONSTRATION DATA
 * 
 * ACADEMIC BCT VIVA NOTICE:
 * This dataset represents fictional demonstration records used to illustrate
 * BikeChain's digital vehicle passport architecture, SHA-256 document hashing,
 * and smart contract access control. No motorcycle photos are used.
 * 
 * All blockchain data represents Phase 3 planned architecture models.
 */

export const DEMO_MOTORCYCLES = [
  {
    id: "BC-2026-RE-0001",
    manufacturer: "Royal Enfield",
    model: "Guerrilla 450",
    productionYear: 2026,
    category: "Roadster",
    engineCapacity: "452 cc Sherpa Liquid-Cooled",
    color: "Brava Blue & Cyber Silver",
    vinHash: "0x8f2d9c3b1a4e5f67890123456789abcdef0123456789abcdef0123456789abcd",
    vinMasked: "ME3GR450***9821",
    registrationNumber: "MH-02-EQ-4091",
    currentOdometer: 4250,
    unit: "km",
    status: "Verified",
    verificationScore: 100,
    isDemonstrationData: true,
    qrCodeValue: "https://bikechain-app.vercel.app/verify/BC-2026-RE-0001",
    
    // Cryptographic Document Fingerprint
    storedDocumentHash: "A8F91C3E7B2D4F5A6C8E0B2D4F6A8C0E2B4D6F8A0C2E4B6D8F0A2C4E6B8D72E",
    sampleInvoiceName: "service_invoice_001.pdf",
    
    // Blockchain Architecture (Phase 3 Model)
    blockchainModel: {
      statusLabel: "Phase 3 Smart Contract Model (Demonstration)",
      network: "Ethereum Sepolia Testnet (EVM Target)",
      targetContract: "BikeChain.sol (AccessControl)",
      simulatedContractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      simulatedGenesisTx: "0x94b3a1d48c0356bf8f49a37e6f8812c3b29014168e37e909a904d98a2458e0a3",
      blockNumber: 5912408,
      functionsMapped: ["registerBike()", "transferOwnership()", "addServiceRecord()", "verifyRecord()"],
      verificationChecks: {
        identityVerified: true,
        hashIntegrityConfirmed: true,
        provenanceSequenceValid: true
      }
    },

    // Current Owner (Academic Demo Names)
    currentOwner: {
      name: "Priya Nair",
      previousOwner: "Rohan Sharma",
      initialOwner: "Arjun Mehta",
      walletAddress: "0x71C8364237FDb33321558913F2459bAb83eE82A1",
      holderType: "Private Owner",
      acquiredDate: "2026-08-10",
    },

    // Chronological Ownership History
    ownershipHistory: [
      {
        id: "own-1",
        year: 2026,
        date: "2026-01-15",
        eventType: "Initial Registration",
        from: "Apex Motocorp (Authorized Dealer)",
        to: "Arjun Mehta",
        ownerName: "Arjun Mehta",
        odometer: 12,
        notes: "Genesis digital ledger entry created and keys assigned.",
        txReference: "0x94b3a1...e0a3 (Simulated Demo)"
      },
      {
        id: "own-2",
        year: 2026,
        date: "2026-04-22",
        eventType: "Ownership Transfer",
        from: "Arjun Mehta",
        to: "Rohan Sharma",
        ownerName: "Rohan Sharma",
        odometer: 1850,
        notes: "Private sale transfer authenticated via wallet signature.",
        txReference: "0xc84218...a471 (Simulated Demo)"
      },
      {
        id: "own-3",
        year: 2026,
        date: "2026-08-10",
        eventType: "Ownership Transfer",
        from: "Rohan Sharma",
        to: "Priya Nair",
        ownerName: "Priya Nair",
        odometer: 4100,
        notes: "Certified pre-owned handover with verified maintenance records.",
        txReference: "0x12a4b8...99e1 (Simulated Demo)"
      }
    ],

    // Certified Service Records
    serviceHistory: [
      {
        id: "srv-1",
        date: "2026-02-28",
        serviceType: "First Scheduled Maintenance (500 km)",
        odometer: 520,
        serviceCenter: "Apex Speedworks Workshop #04",
        partsReplaced: ["Engine Oil (Sherpa 10W-40)", "OEM Oil Filter", "Crush Washer"],
        description: "Standard break-in inspection, valve clearance check, chain calibration.",
        invoiceHash: "A8F91C3E7B2D4F5A6C8E0B2D4F6A8C0E2B4D6F8A0C2E4B6D8F0A2C4E6B8D72E",
        verified: true
      },
      {
        id: "srv-2",
        date: "2026-07-14",
        serviceType: "Routine 4,000 km Service",
        odometer: 4120,
        serviceCenter: "Apex Speedworks Workshop #04",
        partsReplaced: ["Synthetic Engine Oil", "Air Filter Element", "Front Brake Inspection"],
        description: "Brake fluid moisture 0.8% (normal), ECU diagnostics clean, throttle body synced.",
        invoiceHash: "5F9B4C2E1A3D8F7E6B5C4A3B2C1D0E9F8A7B6C5D4E3F2A1B0C9D8E7F6A5B4C3D",
        verified: true
      }
    ],

    // Parts Replacement History
    partsHistory: [
      {
        id: "prt-1",
        partName: "Engine Oil Filter Cartridge",
        partNumber: "RE-SHERPA-FLT-09",
        date: "2026-07-14",
        odometer: 4120,
        serviceCenter: "Apex Speedworks Workshop #04",
        serialHash: "0x7c4b1a2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b"
      },
      {
        id: "prt-2",
        partName: "Performance Air Filter Element",
        partNumber: "RE-AIR-HP-450",
        date: "2026-07-14",
        odometer: 4120,
        serviceCenter: "Apex Speedworks Workshop #04",
        serialHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b7c4b1a2d3e4f5a6b7c8d9e0f"
      }
    ],

    repairHistory: [] // Clean history: Zero reported accidents
  },

  {
    id: "BC-2025-KT-0042",
    manufacturer: "KTM",
    model: "390 Duke",
    productionYear: 2025,
    category: "Naked Sport",
    engineCapacity: "399 cc Single-Cylinder DOHC",
    color: "Electronic Orange & Carbon",
    vinHash: "0x4a7e9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f12",
    vinMasked: "VBKDUKE390***4419",
    registrationNumber: "KA-05-MM-3901",
    currentOdometer: 14850,
    unit: "km",
    status: "Verified",
    verificationScore: 96,
    isDemonstrationData: true,
    qrCodeValue: "https://bikechain-app.vercel.app/verify/BC-2025-KT-0042",

    storedDocumentHash: "3B7E9F1A4C6D8E0B2D4F6A8C0E2B4D6F8A0C2E4B6D8F0A2C4E6B8D72EA8F91C",
    sampleInvoiceName: "ktm_annual_service_invoice.pdf",

    blockchainModel: {
      statusLabel: "Phase 3 Smart Contract Model (Demonstration)",
      network: "Ethereum Sepolia Testnet (EVM Target)",
      targetContract: "BikeChain.sol (AccessControl)",
      simulatedContractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      simulatedGenesisTx: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      blockNumber: 5420199,
      functionsMapped: ["registerBike()", "transferOwnership()", "addServiceRecord()", "verifyRecord()"],
      verificationChecks: {
        identityVerified: true,
        hashIntegrityConfirmed: true,
        provenanceSequenceValid: true
      }
    },

    currentOwner: {
      name: "Rohan M.",
      previousOwner: "Arjun K.",
      initialOwner: "Arjun K.",
      walletAddress: "0x98A13D5E4C2B1A0F9E8D7C6B5A4F3E2D1C0B9A8F",
      holderType: "Private Owner",
      acquiredDate: "2026-02-18",
    },

    ownershipHistory: [
      {
        id: "own-ktm-1",
        year: 2025,
        date: "2025-02-10",
        eventType: "Initial Registration",
        from: "Orange City KTM (Authorized Dealer)",
        to: "Arjun K.",
        ownerName: "Arjun K.",
        odometer: 5,
        notes: "Initial retail sale with factory warranty sign-off.",
        txReference: "0x123456...cdef (Simulated Demo)"
      },
      {
        id: "own-ktm-2",
        year: 2026,
        date: "2026-02-18",
        eventType: "Ownership Transfer",
        from: "Arjun K.",
        to: "Rohan M.",
        ownerName: "Rohan M.",
        odometer: 11200,
        notes: "Secondary ownership transfer signed and registered.",
        txReference: "0x777788...1111 (Simulated Demo)"
      }
    ],

    serviceHistory: [
      {
        id: "srv-ktm-1",
        date: "2025-04-12",
        serviceType: "1,000 km Break-in Service",
        odometer: 1040,
        serviceCenter: "KTM Pro-Service Indiranagar",
        partsReplaced: ["Motorex 15W-50 Synthetic", "Oil Filter", "Sump Plug O-ring"],
        description: "Torqued chassis fasteners, recalibrated Quickshifter+ sensor.",
        invoiceHash: "3B7E9F1A4C6D8E0B2D4F6A8C0E2B4D6F8A0C2E4B6D8F0A2C4E6B8D72EA8F91C",
        verified: true
      },
      {
        id: "srv-ktm-2",
        date: "2025-10-20",
        serviceType: "7,500 km Periodic Service",
        odometer: 7620,
        serviceCenter: "KTM Pro-Service Indiranagar",
        partsReplaced: ["Motorex Engine Oil", "Sintered Front Brake Pads", "Air Filter"],
        description: "Brake bleeding performed, coolant refractometer test passed.",
        invoiceHash: "99887766554433221100FFEEDDCCBBAA99887766554433221100FFEEDDCCBBAA",
        verified: true
      }
    ],

    partsHistory: [
      {
        id: "prt-ktm-1",
        partName: "Brembo Sintered Front Brake Pads",
        partNumber: "KT-BRK-SNTR-390",
        date: "2025-10-20",
        odometer: 7620,
        serviceCenter: "KTM Pro-Service Indiranagar",
        serialHash: "0x8888999900001111222233334444555566667777888899990000111122223333"
      }
    ],

    repairHistory: [
      {
        id: "rep-ktm-1",
        date: "2025-11-04",
        severity: "Minor Cosmetic",
        description: "Stationary tip-over in parking lot. Replaced right cosmetic panel and bar-end slider. Laser measurement confirmed frame and steering alignment 100% true.",
        authorizedBy: "KTM Certified Collision Inspection",
        serviceCenter: "KTM Pro-Service Indiranagar",
        documentHash: "FA1234567890BCDE1234567890BCDE1234567890BCDE1234567890BCDE1234",
        verified: true
      }
    ]
  },

  {
    id: "BC-2024-BM-0108",
    manufacturer: "BMW Motorrad",
    model: "S 1000 RR",
    productionYear: 2024,
    category: "Superbike",
    engineCapacity: "999 cc Inline-4 ShiftCam",
    color: "M Motorsport Tri-Color",
    vinHash: "0x3344556677889900aabbccddeeff00112233445566778899aabbccddeeff0011",
    vinMasked: "WB10E210***8022",
    registrationNumber: "DL-01-SR-1000",
    currentOdometer: 8900,
    unit: "km",
    status: "Verified",
    verificationScore: 100,
    isDemonstrationData: true,
    qrCodeValue: "https://bikechain-app.vercel.app/verify/BC-2024-BM-0108",

    storedDocumentHash: "C4D6F8A0C2E4B6D8F0A2C4E6B8D72EA8F91C3E7B2D4F5A6C8E0B2D4F6A8C0E2B",
    sampleInvoiceName: "bmw_run_in_certification.pdf",

    blockchainModel: {
      statusLabel: "Phase 3 Smart Contract Model (Demonstration)",
      network: "Ethereum Sepolia Testnet (EVM Target)",
      targetContract: "BikeChain.sol (AccessControl)",
      simulatedContractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      simulatedGenesisTx: "0xaaaa1111bbbb2222cccc3333dddd4444eeee5555ffff6666aaaa1111bbbb2222",
      blockNumber: 4982103,
      functionsMapped: ["registerBike()", "transferOwnership()", "addServiceRecord()", "verifyRecord()"],
      verificationChecks: {
        identityVerified: true,
        hashIntegrityConfirmed: true,
        provenanceSequenceValid: true
      }
    },

    currentOwner: {
      name: "Ananya R.",
      previousOwner: null,
      initialOwner: "Ananya R.",
      walletAddress: "0x0B45C2272e50529d2fA0BEB371a39870CeA7a5E9",
      holderType: "First Owner / Collector",
      acquiredDate: "2024-04-02",
    },

    ownershipHistory: [
      {
        id: "own-bmw-1",
        year: 2024,
        date: "2024-04-02",
        eventType: "Initial Registration",
        from: "BMW Motorrad Apex New Delhi",
        to: "Ananya R.",
        ownerName: "Ananya R.",
        odometer: 15,
        notes: "M Package calibration certification signed on chain.",
        txReference: "0xaaaa11...2222 (Simulated Demo)"
      }
    ],

    serviceHistory: [
      {
        id: "srv-bmw-1",
        date: "2024-05-18",
        serviceType: "1,000 km Run-in & Limiter Unlock",
        odometer: 980,
        serviceCenter: "BMW Motorrad Certified Hub Delhi",
        partsReplaced: ["BMW Advantec Ultimate 5W-40", "OEM M Oil Filter"],
        description: "Official BMW factory rev-limiter electronically unlocked via ISTA diagnostics.",
        invoiceHash: "C4D6F8A0C2E4B6D8F0A2C4E6B8D72EA8F91C3E7B2D4F5A6C8E0B2D4F6A8C0E2B",
        verified: true
      },
      {
        id: "srv-bmw-2",
        date: "2025-06-10",
        serviceType: "Annual Comprehensive Inspection",
        odometer: 6150,
        serviceCenter: "BMW Motorrad Certified Hub Delhi",
        partsReplaced: ["BMW Advantec Ultimate 5W-40", "Brake Fluid DOT 4 Low Viscosity"],
        description: "DDC electronic suspension calibration checked. DTC and ABS Pro software updated.",
        invoiceHash: "9876543210FEDCBA9876543210FEDCBA9876543210FEDCBA9876543210FEDCBA",
        verified: true
      }
    ],

    partsHistory: [
      {
        id: "prt-bmw-1",
        partName: "M Carbon Front Mudguard Assembly",
        partNumber: "77-31-8-564-072",
        date: "2025-06-10",
        odometer: 6150,
        serviceCenter: "BMW Motorrad Certified Hub Delhi",
        serialHash: "0xabcdef9876543210abcdef9876543210abcdef9876543210abcdef9876543210"
      }
    ],

    repairHistory: [] // Zero incidents
  },

  {
    id: "BC-2025-TR-0019",
    manufacturer: "Triumph",
    model: "Speed 400",
    productionYear: 2025,
    category: "Modern Classic",
    engineCapacity: "398 cc TR-Series Liquid-Cooled Single",
    color: "Carnival Red & Storm Grey",
    vinHash: "0x778899aabbccddeeff00112233445566778899aabbccddeeff00112233445566",
    vinMasked: "SMTT400***5190",
    registrationNumber: "TN-07-CP-4008",
    currentOdometer: 5400,
    unit: "km",
    status: "Verified",
    verificationScore: 98,
    isDemonstrationData: true,
    qrCodeValue: "https://bikechain-app.vercel.app/verify/BC-2025-TR-0019",

    storedDocumentHash: "D4F6A8C0E2B4D6F8A0C2E4B6D8F0A2C4E6B8D72EA8F91C3E7B2D4F5A6C8E0B2D",
    sampleInvoiceName: "triumph_first_service.pdf",

    blockchainModel: {
      statusLabel: "Phase 3 Smart Contract Model (Demonstration)",
      network: "Ethereum Sepolia Testnet (EVM Target)",
      targetContract: "BikeChain.sol (AccessControl)",
      simulatedContractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      simulatedGenesisTx: "0x2222333344445555666677778888999900001111222233334444555566667777",
      blockNumber: 5610940,
      functionsMapped: ["registerBike()", "transferOwnership()", "addServiceRecord()", "verifyRecord()"],
      verificationChecks: {
        identityVerified: true,
        hashIntegrityConfirmed: true,
        provenanceSequenceValid: true
      }
    },

    currentOwner: {
      name: "Deepak N.",
      previousOwner: null,
      initialOwner: "Deepak N.",
      walletAddress: "0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377",
      holderType: "Private Owner",
      acquiredDate: "2025-06-01",
    },

    ownershipHistory: [
      {
        id: "own-tr-1",
        year: 2025,
        date: "2025-06-01",
        eventType: "Initial Registration",
        from: "One Triumph Chennai",
        to: "Deepak N.",
        ownerName: "Deepak N.",
        odometer: 28,
        notes: "First retail handover completed and registered.",
        txReference: "0x222233...7777 (Simulated Demo)"
      }
    ],

    serviceHistory: [
      {
        id: "srv-tr-1",
        date: "2025-07-22",
        serviceType: "First Scheduled Service (1,000 km)",
        odometer: 1015,
        serviceCenter: "One Triumph Authorized Workshop",
        partsReplaced: ["Castrol Power1 10W-50", "Triumph Oil Filter T1210444"],
        description: "Initial engine oil flush, clutch cable free-play calibrated, throttle sync checked.",
        invoiceHash: "D4F6A8C0E2B4D6F8A0C2E4B6D8F0A2C4E6B8D72EA8F91C3E7B2D4F5A6C8E0B2D",
        verified: true
      }
    ],

    partsHistory: [
      {
        id: "prt-tr-1",
        partName: "Triumph High Flow Oil Filter",
        partNumber: "T1210444",
        date: "2025-07-22",
        odometer: 1015,
        serviceCenter: "One Triumph Authorized Workshop",
        serialHash: "0x556677889900aabbccddeeff00112233445566778899aabbccddeeff00112233"
      }
    ],

    repairHistory: []
  }
];

export function getMotorcycleById(id) {
  if (!id) return null;
  const cleanId = id.trim().toUpperCase();
  return DEMO_MOTORCYCLES.find(bike => bike.id.toUpperCase() === cleanId) || null;
}

export function getAllMotorcycles() {
  return DEMO_MOTORCYCLES;
}

export function getRecentActivity() {
  return [
    {
      bikeId: "BC-2026-RE-0001",
      motorcycle: "Royal Enfield Guerrilla 450",
      event: "Ownership Transfer",
      date: "10 Aug 2026",
      actor: "Priya Nair (Current Owner)",
      status: "Verified",
      hash: "0x12a4b8...99e1"
    },
    {
      bikeId: "BC-2026-RE-0001",
      motorcycle: "Royal Enfield Guerrilla 450",
      event: "Routine Service (4,000 km)",
      date: "14 Jul 2026",
      actor: "Apex Speedworks Workshop #04",
      status: "Verified",
      hash: "5F9B4C...4C3D"
    },
    {
      bikeId: "BC-2025-KT-0042",
      motorcycle: "KTM 390 Duke",
      event: "Ownership Transfer",
      date: "18 Feb 2026",
      actor: "Rohan M. (Current Owner)",
      status: "Verified",
      hash: "0x777788...1111"
    },
    {
      bikeId: "BC-2025-KT-0042",
      motorcycle: "KTM 390 Duke",
      event: "Collision Damage Inspection",
      date: "04 Nov 2025",
      actor: "KTM Certified Collision Hub",
      status: "Verified",
      hash: "FA1234...1234"
    },
    {
      bikeId: "BC-2025-TR-0019",
      motorcycle: "Triumph Speed 400",
      event: "Initial Registration",
      date: "01 Jun 2025",
      actor: "Deepak N. (Owner)",
      status: "Verified",
      hash: "0x222233...7777"
    }
  ];
}
