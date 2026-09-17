/**
 * BIKECHAIN PROTOTYPE DEMONSTRATION DATA
 * 
 * DISCLAIMER:
 * In compliance with project guidelines, this dataset represents fictional/demonstration
 * records designed for academic evaluation (Blockchain Technology viva) and interface testing.
 * No claim of real-world manufacturer, official dealership, or government integration is made.
 */

export const DEMO_MOTORCYCLES = [
  {
    id: "BC-2026-RE-0001",
    manufacturer: "Royal Enfield",
    model: "Guerrilla 450",
    year: 2026,
    type: "Roadster",
    engineCapacity: "452 cc Sherpa Liquid-Cooled",
    color: "Brava Blue & Cyber Silver",
    vinHash: "0x8f2d9c3b1a4e5f67890123456789abcdef0123456789abcdef0123456789abcd",
    vinMasked: "ME3GR450***9821",
    registrationNumber: "MH-02-EQ-4091",
    currentOdometer: 4250,
    unit: "km",
    status: "Verified",
    verificationScore: 98,
    isDemonstrationData: true,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    qrCodeValue: "https://bikechain.network/verify/BC-2026-RE-0001",
    
    // Blockchain Proof Metadata
    blockchain: {
      network: "Ethereum Sepolia Testnet (Chain ID 11155111)",
      contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      registrationTxHash: "0x94b3a1d48c0356bf8f49a37e6f8812c3b29014168e37e909a904d98a2458e0a3",
      blockNumber: 5912408,
      timestamp: "2026-01-15T09:30:00Z",
      merkleRoot: "0x3e4f7a9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f",
      verificationStatus: {
        identityVerified: true,
        blockchainRecordFound: true,
        ownershipTraceable: true,
        hashMatch: true,
      }
    },

    // Current Owner
    currentOwner: {
      walletAddress: "0x71C8364237FDb33321558913F2459bAb83eE82A1",
      holderType: "Private Owner",
      nameMasked: "Vikram S.",
      acquiredDate: "2026-04-10",
    },

    // Ownership Timeline
    ownershipHistory: [
      {
        id: "own-1",
        year: 2026,
        date: "2026-01-15",
        eventType: "Genesis Registration",
        fromTitle: "Royal Enfield Manufacturing Plant (Oragadam)",
        fromAddress: "0x0000000000000000000000000000000000000000",
        toTitle: "Apex RE Motocorp Authorized Dealer",
        toAddress: "0x2B4c6D3800F6a3b2b8032766324D63D4e19bC92A",
        odometer: 12,
        notes: "Factory quality sign-off and digital genesis minting.",
        txHash: "0x94b3a1d48c0356bf8f49a37e6f8812c3b29014168e37e909a904d98a2458e0a3",
        blockNumber: 5912408
      },
      {
        id: "own-2",
        year: 2026,
        date: "2026-04-10",
        eventType: "First Retail Sale",
        fromTitle: "Apex RE Motocorp Authorized Dealer",
        fromAddress: "0x2B4c6D3800F6a3b2b8032766324D63D4e19bC92A",
        toTitle: "Owner #1 (Vikram S.)",
        toAddress: "0x71C8364237FDb33321558913F2459bAb83eE82A1",
        odometer: 38,
        notes: "First retail handover, registration and smart contract key assignment.",
        txHash: "0xc842189fb9134b22091238491024823b1c81023948a941235b2940214309a471",
        blockNumber: 5984120
      }
    ],

    // Certified Service History
    serviceHistory: [
      {
        id: "srv-1",
        date: "2026-05-20",
        serviceType: "First Scheduled Maintenance (500 km)",
        odometer: 520,
        serviceCenter: "Apex Speedworks Service Hub #04",
        serviceCenterAddress: "0x89e21Bc92847A119284bE281983C90184bE91823",
        partsReplaced: [
          "Semi-synthetic Engine Oil (Sherpa 10W-40)",
          "Oil Filter Cartridge",
          "Copper Crush Washer"
        ],
        description: "Standard running-in inspection. Valve clearances checked. ECU diagnostics clean. Chain tension calibrated.",
        invoiceHash: "0x5f9b4c2e1a3d8f7e6b5c4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d",
        txHash: "0x4819ca90238491024823b1c81023948a941235b2940214309a471c842189fb91",
        verified: true
      },
      {
        id: "srv-2",
        date: "2026-08-14",
        serviceType: "Routine 4,000 km Service",
        odometer: 4120,
        serviceCenter: "Apex Speedworks Service Hub #04",
        serviceCenterAddress: "0x89e21Bc92847A119284bE281983C90184bE91823",
        partsReplaced: [
          "Synthetic Engine Oil (Sherpa 10W-40)",
          "Oil Filter",
          "High-Flow Air Filter Element"
        ],
        description: "Brake fluid moisture test passed (0.8%). Front fork seal inspection normal. Throttle body sync performed.",
        invoiceHash: "0x2e1a3d8f7e6b5c4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d5f9b4c",
        txHash: "0x7890123456789abcdef0123456789abcdef0123456789abcdef0123456789abcd",
        verified: true
      }
    ],

    // Parts Replacement History
    partsHistory: [
      {
        id: "prt-1",
        partName: "Engine Oil Filter Assembly",
        partNumber: "RE-SHERPA-FLT-09",
        date: "2026-08-14",
        odometer: 4120,
        serviceCenter: "Apex Speedworks Service Hub #04",
        serialHash: "0x7c4b1a2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
        txHash: "0x7890123456789abcdef0123456789abcdef0123456789abcdef0123456789abcd"
      },
      {
        id: "prt-2",
        partName: "Performance High-Flow Air Filter",
        partNumber: "RE-AIR-HP-450",
        date: "2026-08-14",
        odometer: 4120,
        serviceCenter: "Apex Speedworks Service Hub #04",
        serialHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b7c4b1a2d3e4f5a6b7c8d9e0f",
        txHash: "0x7890123456789abcdef0123456789abcdef0123456789abcdef0123456789abcd"
      }
    ],

    // Accident & Repair Records
    repairHistory: [] // Clean history: No reported accidents
  },

  {
    id: "BC-2025-KT-0042",
    manufacturer: "KTM",
    model: "390 Duke",
    year: 2025,
    type: "Naked Sport",
    engineCapacity: "399 cc Single-Cylinder DOHC",
    color: "Electronic Orange & Metallic Carbon",
    vinHash: "0x4a7e9b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f12",
    vinMasked: "VBKDUKE390***4419",
    registrationNumber: "KA-05-MM-3901",
    currentOdometer: 14850,
    unit: "km",
    status: "Verified",
    verificationScore: 95,
    isDemonstrationData: true,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
    qrCodeValue: "https://bikechain.network/verify/BC-2025-KT-0042",

    blockchain: {
      network: "Ethereum Sepolia Testnet (Chain ID 11155111)",
      contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      registrationTxHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      blockNumber: 5420199,
      timestamp: "2025-02-10T11:15:00Z",
      merkleRoot: "0x7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c",
      verificationStatus: {
        identityVerified: true,
        blockchainRecordFound: true,
        ownershipTraceable: true,
        hashMatch: true,
      }
    },

    currentOwner: {
      walletAddress: "0x98A13D5E4C2B1A0F9E8D7C6B5A4F3E2D1C0B9A8F",
      holderType: "Private Owner",
      nameMasked: "Rohan M.",
      acquiredDate: "2026-02-18",
    },

    ownershipHistory: [
      {
        id: "own-ktm-1",
        year: 2025,
        date: "2025-02-10",
        eventType: "Genesis Registration",
        fromTitle: "Bajaj-KTM Chakan Assembly Plant",
        fromAddress: "0x0000000000000000000000000000000000000000",
        toTitle: "Orange City KTM Dealership",
        toAddress: "0x1111222233334444555566667777888899990000",
        odometer: 5,
        notes: "Factory assembly line roll-off and smart contract identity initialization.",
        txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        blockNumber: 5420199
      },
      {
        id: "own-ktm-2",
        year: 2025,
        date: "2025-03-05",
        eventType: "First Retail Sale",
        fromTitle: "Orange City KTM Dealership",
        fromAddress: "0x1111222233334444555566667777888899990000",
        toTitle: "Owner #1 (Arjun K.)",
        toAddress: "0x3333444455556666777788889999000011112222",
        odometer: 25,
        notes: "Retail purchase with comprehensive extended warranty.",
        txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
        blockNumber: 5498124
      },
      {
        id: "own-ktm-3",
        year: 2026,
        date: "2026-02-18",
        eventType: "Secondary Ownership Transfer",
        fromTitle: "Owner #1 (Arjun K.)",
        fromAddress: "0x3333444455556666777788889999000011112222",
        toTitle: "Owner #2 (Rohan M.)",
        toAddress: "0x98A13D5E4C2B1A0F9E8D7C6B5A4F3E2D1C0B9A8F",
        odometer: 11200,
        notes: "Certified pre-owned ownership transfer verified on-chain via smart contract consent.",
        txHash: "0x7777888899990000111122223333444455556666777788889999000011112222",
        blockNumber: 6012430
      }
    ],

    serviceHistory: [
      {
        id: "srv-ktm-1",
        date: "2025-04-12",
        serviceType: "1,000 km Break-in Service",
        odometer: 1040,
        serviceCenter: "KTM Pro-Service Indiranagar",
        serviceCenterAddress: "0x4444555566667777888899990000111122223333",
        partsReplaced: ["Motorex 15W-50 Synthetic", "Oil Filter", "Sump Plug O-ring"],
        description: "Torqued chassis fasteners, recalibrated Quickshifter+ sensor.",
        invoiceHash: "0x99887766554433221100ffeeddccbbaa99887766554433221100ffeeddccbbaa",
        txHash: "0x5555666677778888999900001111222233334444555566667777888899990000",
        verified: true
      },
      {
        id: "srv-ktm-2",
        date: "2025-10-20",
        serviceType: "7,500 km Annual Service",
        odometer: 7620,
        serviceCenter: "KTM Pro-Service Indiranagar",
        serviceCenterAddress: "0x4444555566667777888899990000111122223333",
        partsReplaced: ["Motorex Engine Oil", "Sintered Front Brake Pads", "Air Filter"],
        description: "Brake system bleed, coolant refractometer test passed.",
        invoiceHash: "0xaaabbbcccdddeeefff000111222333444555666777888999aaabbbcccdddeee",
        txHash: "0x6666777788889999000011112222333344445555666677778888999900001111",
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
        serialHash: "0x8888999900001111222233334444555566667777888899990000111122223333",
        txHash: "0x6666777788889999000011112222333344445555666677778888999900001111"
      }
    ],

    // Documented minor repair
    repairHistory: [
      {
        id: "rep-ktm-1",
        date: "2025-11-04",
        severity: "Minor Cosmetic",
        description: "Right side fairing scuff from stationary tip-over in parking. Replaced OEM right decal panel and bar-end slider. No frame or steering geometric deflection detected.",
        authorizedBy: "KTM Certified Collision Inspection",
        serviceCenter: "KTM Pro-Service Indiranagar",
        documentHash: "0xfa1234567890bcde1234567890bcde1234567890bcde1234567890bcde1234",
        txHash: "0x8888111122223333444455556666777788889999000011112222333344445555",
        verified: true
      }
    ]
  },

  {
    id: "BC-2024-BM-0108",
    manufacturer: "BMW Motorrad",
    model: "S 1000 RR",
    year: 2024,
    type: "Superbike",
    engineCapacity: "999 cc Inline-4 ShiftCam",
    color: "M Motorsport Tri-Color (Light White / Racing Blue)",
    vinHash: "0x3344556677889900aabbccddeeff00112233445566778899aabbccddeeff0011",
    vinMasked: "WB10E210***8022",
    registrationNumber: "DL-01-SR-1000",
    currentOdometer: 8900,
    unit: "km",
    status: "Verified",
    verificationScore: 100,
    isDemonstrationData: true,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
    qrCodeValue: "https://bikechain.network/verify/BC-2024-BM-0108",

    blockchain: {
      network: "Ethereum Sepolia Testnet (Chain ID 11155111)",
      contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      registrationTxHash: "0xaaaa1111bbbb2222cccc3333dddd4444eeee5555ffff6666aaaa1111bbbb2222",
      blockNumber: 4982103,
      timestamp: "2024-03-22T08:00:00Z",
      merkleRoot: "0xdddd4444eeee5555ffff6666aaaa1111bbbb2222cccc3333dddd4444eeee5555",
      verificationStatus: {
        identityVerified: true,
        blockchainRecordFound: true,
        ownershipTraceable: true,
        hashMatch: true,
      }
    },

    currentOwner: {
      walletAddress: "0x0B45C2272e50529d2fA0BEB371a39870CeA7a5E9",
      holderType: "Private Collector",
      nameMasked: "Ananya R.",
      acquiredDate: "2024-04-02",
    },

    ownershipHistory: [
      {
        id: "own-bmw-1",
        year: 2024,
        date: "2024-03-22",
        eventType: "Genesis Registration",
        fromTitle: "BMW Motorrad Berlin-Spandau Plant",
        fromAddress: "0x0000000000000000000000000000000000000000",
        toTitle: "BMW Motorrad Apex New Delhi",
        toAddress: "0x1234123412341234123412341234123412341234",
        odometer: 1,
        notes: "M Package calibration certification signed on chain.",
        txHash: "0xaaaa1111bbbb2222cccc3333dddd4444eeee5555ffff6666aaaa1111bbbb2222",
        blockNumber: 4982103
      },
      {
        id: "own-bmw-2",
        year: 2024,
        date: "2024-04-02",
        eventType: "First Retail Sale",
        fromTitle: "BMW Motorrad Apex New Delhi",
        fromAddress: "0x1234123412341234123412341234123412341234",
        toTitle: "Owner #1 (Ananya R.)",
        toAddress: "0x0B45C2272e50529d2fA0BEB371a39870CeA7a5E9",
        odometer: 15,
        notes: "Delivered with M Endurance chain and Race Calibration package.",
        txHash: "0xbbbb2222cccc3333dddd4444eeee5555ffff6666aaaa1111bbbb2222cccc3333",
        blockNumber: 5014389
      }
    ],

    serviceHistory: [
      {
        id: "srv-bmw-1",
        date: "2024-05-18",
        serviceType: "1,000 km Run-in Service & Rev Limiter Unlock",
        odometer: 980,
        serviceCenter: "BMW Motorrad Certified Hub Delhi",
        serviceCenterAddress: "0x5555111122223333444455556666777788889999",
        partsReplaced: ["BMW Advantec Ultimate 5W-40", "OEM M Oil Filter"],
        description: "Official BMW factory rev-limiter electronically unlocked via BMW ISTA diagnostics. Chain cleaned & laser aligned.",
        invoiceHash: "0x123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0",
        txHash: "0xcccc3333dddd4444eeee5555ffff6666aaaa1111bbbb2222cccc3333dddd4444",
        verified: true
      },
      {
        id: "srv-bmw-2",
        date: "2025-06-10",
        serviceType: "Annual Comprehensive Inspection",
        odometer: 6150,
        serviceCenter: "BMW Motorrad Certified Hub Delhi",
        serviceCenterAddress: "0x5555111122223333444455556666777788889999",
        partsReplaced: ["BMW Advantec Ultimate 5W-40", "Brake Fluid DOT 4 Low Viscosity"],
        description: "DDC electronic suspension calibration verified. DTC and ABS Pro software updated to v024_011_020.",
        invoiceHash: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
        txHash: "0xdddd4444eeee5555ffff6666aaaa1111bbbb2222cccc3333dddd4444eeee5555",
        verified: true
      }
    ],

    partsHistory: [
      {
        id: "prt-bmw-1",
        partName: "M Carbon Front Mudguard Replacement",
        partNumber: "77-31-8-564-072",
        date: "2025-06-10",
        odometer: 6150,
        serviceCenter: "BMW Motorrad Certified Hub Delhi",
        serialHash: "0xabcdef9876543210abcdef9876543210abcdef9876543210abcdef9876543210",
        txHash: "0xdddd4444eeee5555ffff6666aaaa1111bbbb2222cccc3333dddd4444eeee5555"
      }
    ],

    repairHistory: [] // Flawless clean record
  },

  {
    id: "BC-2025-TR-0019",
    manufacturer: "Triumph",
    model: "Speed 400",
    year: 2025,
    type: "Modern Classic",
    engineCapacity: "398 cc TR-Series Liquid-Cooled Single",
    color: "Carnival Red & Storm Grey",
    vinHash: "0x778899aabbccddeeff00112233445566778899aabbccddeeff00112233445566",
    vinMasked: "SMTT400***5190",
    registrationNumber: "TN-07-CP-4008",
    currentOdometer: 5400,
    unit: "km",
    status: "Verified",
    verificationScore: 97,
    isDemonstrationData: true,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    qrCodeValue: "https://bikechain.network/verify/BC-2025-TR-0019",

    blockchain: {
      network: "Ethereum Sepolia Testnet (Chain ID 11155111)",
      contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      registrationTxHash: "0x2222333344445555666677778888999900001111222233334444555566667777",
      blockNumber: 5610940,
      timestamp: "2025-05-14T10:00:00Z",
      merkleRoot: "0x888877776666555544443333222211110000ffffeeeeddddccccbbbbaaaa9999",
      verificationStatus: {
        identityVerified: true,
        blockchainRecordFound: true,
        ownershipTraceable: true,
        hashMatch: true,
      }
    },

    currentOwner: {
      walletAddress: "0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377",
      holderType: "Private Owner",
      nameMasked: "Deepak N.",
      acquiredDate: "2025-06-01",
    },

    ownershipHistory: [
      {
        id: "own-tr-1",
        year: 2025,
        date: "2025-05-14",
        eventType: "Genesis Registration",
        fromTitle: "Triumph Manufacturing Facility",
        fromAddress: "0x0000000000000000000000000000000000000000",
        toTitle: "One Triumph Chennai",
        toAddress: "0x9999888877776666555544443333222211110000",
        odometer: 10,
        notes: "Genesis digital ledger entry created.",
        txHash: "0x2222333344445555666677778888999900001111222233334444555566667777",
        blockNumber: 5610940
      },
      {
        id: "own-tr-2",
        year: 2025,
        date: "2025-06-01",
        eventType: "First Retail Sale",
        fromTitle: "One Triumph Chennai",
        fromAddress: "0x9999888877776666555544443333222211110000",
        toTitle: "Owner #1 (Deepak N.)",
        toAddress: "0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377",
        odometer: 28,
        notes: "First retail handover completed.",
        txHash: "0x3333444455556666777788889999000011112222333344445555666677778888",
        blockNumber: 5634120
      }
    ],

    serviceHistory: [
      {
        id: "srv-tr-1",
        date: "2025-07-22",
        serviceType: "First Scheduled Service (1,000 km)",
        odometer: 1015,
        serviceCenter: "One Triumph Authorized Workshop",
        serviceCenterAddress: "0x7777666655554444333322221111000099998888",
        partsReplaced: ["Castrol Power1 10W-50", "Triumph Oil Filter T1210444"],
        description: "Initial engine oil flush, clutch cable free-play adjusted, throttle body synced.",
        invoiceHash: "0x44556677889900aabbccddeeff00112233445566778899aabbccddeeff001122",
        txHash: "0x4444555566667777888899990000111122223333444455556666777788889999",
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
        serialHash: "0x556677889900aabbccddeeff00112233445566778899aabbccddeeff00112233",
        txHash: "0x4444555566667777888899990000111122223333444455556666777788889999"
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
