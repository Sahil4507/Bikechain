/**
 * BIKECHAIN DEMONSTRATION MOTORCYCLE RECORDS
 * 
 * Simple, clean demonstration records for academic BCT project.
 * Uses simple, memorable BikeChain IDs (BC-0001, BC-0002, etc.)
 * All registration numbers and owner identities are fictional demonstration data.
 */

export const DEMO_MOTORCYCLES = [
  {
    id: "BC-0001",
    legacyId: "BC-2026-RE-0001",
    manufacturer: "Royal Enfield",
    model: "Guerrilla 450",
    productionYear: 2026,
    registrationNumber: "MH 02 EQ 4091",
    status: "Verified Record",
    currentOwner: "Priya Nair",
    engineCapacity: "452 cc",
    color: "Brava Blue",
    currentOdometer: 4250,
    unit: "km",
    
    // Document hash reference
    documentHash: "A8F91C3E7B2D4F5A6C8E0B2D4F6A8C0E2B4D6F8A0C2E4B6D8F0A2C4E6B8D72E",
    documentName: "Authorized Service Certificate #01",

    // Single chronological timeline of important events
    history: [
      {
        id: "ev-1-1",
        date: "15 Jan 2026",
        eventType: "Initial Registration",
        title: "Initial Vehicle Registration",
        description: "Registered by Apex Motocorp. First title issued to Arjun Mehta.",
        party: "Apex Motocorp (Authorized Dealer) → Arjun Mehta",
        odometer: 12
      },
      {
        id: "ev-1-2",
        date: "28 Feb 2026",
        eventType: "Service Completed",
        title: "First Scheduled Service (500 km)",
        description: "Break-in inspection, synthetic engine oil replacement, chain calibration.",
        party: "Apex Speedworks Workshop #04",
        odometer: 520
      },
      {
        id: "ev-1-3",
        date: "22 Apr 2026",
        eventType: "Ownership Transfer",
        title: "Title Transfer to Second Owner",
        description: "Private sale title transfer recorded. Odometer logged at 1,850 km.",
        party: "Arjun Mehta → Rohan Sharma",
        odometer: 1850
      },
      {
        id: "ev-1-4",
        date: "14 Jul 2026",
        eventType: "Service Completed",
        title: "Routine Maintenance (4,000 km)",
        description: "Air filter replaced, ECU diagnostics run, front brake pads inspected.",
        party: "Apex Speedworks Workshop #04",
        odometer: 4120
      },
      {
        id: "ev-1-5",
        date: "10 Aug 2026",
        eventType: "Ownership Transfer",
        title: "Title Transfer to Current Owner",
        description: "Certified pre-owned handover with verified service history.",
        party: "Rohan Sharma → Priya Nair (Current Owner)",
        odometer: 4250
      }
    ]
  },

  {
    id: "BC-0002",
    legacyId: "BC-2025-KT-0042",
    manufacturer: "KTM",
    model: "390 Duke",
    productionYear: 2025,
    registrationNumber: "KA 03 AB 1234",
    status: "Verified Record",
    currentOwner: "Rohan Sharma",
    engineCapacity: "399 cc",
    color: "Electronic Orange",
    currentOdometer: 14850,
    unit: "km",

    documentHash: "3B7E9F1A4C6D8E0B2D4F6A8C0E2B4D6F8A0C2E4B6D8F0A2C4E6B8D72EA8F91C",
    documentName: "Annual Inspection & Service Certificate",

    history: [
      {
        id: "ev-2-1",
        date: "10 Feb 2025",
        eventType: "Initial Registration",
        title: "Initial Vehicle Registration",
        description: "Retail registration by Orange City KTM with factory warranty.",
        party: "Orange City KTM (Authorized Dealer) → Arjun K.",
        odometer: 5
      },
      {
        id: "ev-2-2",
        date: "12 Apr 2025",
        eventType: "Service Completed",
        title: "First Break-in Service (1,000 km)",
        description: "Motorex 15W-50 oil replacement, quickshifter sensor calibration.",
        party: "KTM Pro-Service Indiranagar",
        odometer: 1040
      },
      {
        id: "ev-2-3",
        date: "20 Oct 2025",
        eventType: "Service Completed",
        title: "7,500 km Periodic Service",
        description: "Brake fluid flushed, sintered front pads replaced, coolant tested.",
        party: "KTM Pro-Service Indiranagar",
        odometer: 7620
      },
      {
        id: "ev-2-4",
        date: "18 Feb 2026",
        eventType: "Ownership Transfer",
        title: "Ownership Transfer to Rohan Sharma",
        description: "Secondary title handover authenticated with complete service history.",
        party: "Arjun K. → Rohan Sharma (Current Owner)",
        odometer: 14850
      }
    ]
  },

  {
    id: "BC-0003",
    legacyId: "BC-2024-BM-0108",
    manufacturer: "BMW Motorrad",
    model: "S 1000 RR",
    productionYear: 2024,
    registrationNumber: "DL 01 AX 5678",
    status: "Verified Record",
    currentOwner: "Ananya R.",
    engineCapacity: "999 cc",
    color: "M Motorsport Tri-Color",
    currentOdometer: 8900,
    unit: "km",

    documentHash: "C4D6F8A0C2E4B6D8F0A2C4E6B8D72EA8F91C3E7B2D4F5A6C8E0B2D4F6A8C0E2B",
    documentName: "BMW Certified Run-in & M Package Log",

    history: [
      {
        id: "ev-3-1",
        date: "02 Apr 2024",
        eventType: "Initial Registration",
        title: "Initial Vehicle Registration",
        description: "Registered by BMW Motorrad Apex New Delhi with M Package certification.",
        party: "BMW Motorrad Apex Delhi → Ananya R.",
        odometer: 15
      },
      {
        id: "ev-3-2",
        date: "18 May 2024",
        eventType: "Service Completed",
        title: "1,000 km Run-in Service",
        description: "Factory rev-limiter unlocked via BMW diagnostic terminal. Advantec Ultimate oil flush.",
        party: "BMW Motorrad Certified Hub Delhi",
        odometer: 980
      },
      {
        id: "ev-3-3",
        date: "10 Jun 2025",
        eventType: "Service Completed",
        title: "Annual Comprehensive Inspection",
        description: "DDC electronic suspension calibrated, DOT 4 brake fluid flush, DTC updated.",
        party: "BMW Motorrad Certified Hub Delhi",
        odometer: 6150
      }
    ]
  },

  {
    id: "BC-0004",
    legacyId: "BC-2025-TR-0019",
    manufacturer: "Triumph",
    model: "Speed 400",
    productionYear: 2025,
    registrationNumber: "TN 07 BK 9012",
    status: "Verified Record",
    currentOwner: "Deepak N.",
    engineCapacity: "398 cc",
    color: "Carnival Red",
    currentOdometer: 5400,
    unit: "km",

    documentHash: "D4F6A8C0E2B4D6F8A0C2E4B6D8F0A2C4E6B8D72EA8F91C3E7B2D4F5A6C8E0B2D",
    documentName: "Triumph Scheduled First Service Certificate",

    history: [
      {
        id: "ev-4-1",
        date: "01 Jun 2025",
        eventType: "Initial Registration",
        title: "Initial Vehicle Registration",
        description: "First retail handover completed by One Triumph Chennai.",
        party: "One Triumph Chennai → Deepak N.",
        odometer: 28
      },
      {
        id: "ev-4-2",
        date: "22 Jul 2025",
        eventType: "Service Completed",
        title: "First Scheduled Service (1,000 km)",
        description: "Castrol Power1 engine oil flush, OEM filter replacement, throttle sync checked.",
        party: "One Triumph Authorized Workshop",
        odometer: 1015
      }
    ]
  }
];

/**
 * Clean helper function to normalize registration number or ID for comparison.
 * Removes all spaces, dashes, dots and converts to uppercase.
 */
function normalizeIdentifier(str) {
  if (!str) return "";
  return str.toString().replace(/[\s\-_.]/g, "").toUpperCase();
}

/**
 * Find motorcycle by exact BikeChain ID, legacy ID, or registration number.
 */
export function getMotorcycleById(query) {
  if (!query) return null;
  const clean = query.trim().toUpperCase();
  const normalized = normalizeIdentifier(query);

  return DEMO_MOTORCYCLES.find(bike => {
    return (
      bike.id.toUpperCase() === clean ||
      (bike.legacyId && bike.legacyId.toUpperCase() === clean) ||
      normalizeIdentifier(bike.id) === normalized ||
      normalizeIdentifier(bike.legacyId) === normalized ||
      normalizeIdentifier(bike.registrationNumber) === normalized
    );
  }) || null;
}

/**
 * Returns all demonstration motorcycles.
 */
export function getAllMotorcycles() {
  return DEMO_MOTORCYCLES;
}

/**
 * Filter motorcycles by search term across ID, registration, model, make, or owner.
 */
export function searchMotorcycles(query) {
  if (!query || !query.trim()) return DEMO_MOTORCYCLES;
  const q = query.toLowerCase().trim();
  const normQ = normalizeIdentifier(query);

  return DEMO_MOTORCYCLES.filter(bike => {
    return (
      bike.id.toLowerCase().includes(q) ||
      (bike.legacyId && bike.legacyId.toLowerCase().includes(q)) ||
      normalizeIdentifier(bike.id).includes(normQ) ||
      normalizeIdentifier(bike.registrationNumber).includes(normQ) ||
      bike.registrationNumber.toLowerCase().includes(q) ||
      bike.model.toLowerCase().includes(q) ||
      bike.manufacturer.toLowerCase().includes(q) ||
      bike.currentOwner.toLowerCase().includes(q)
    );
  });
}
