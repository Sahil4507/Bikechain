/**
 * BIKECHAIN DEMONSTRATION MOTORCYCLE RECORDS
 * 
 * Simple, clean demonstration records for academic BCT project.
 * Uses simple, memorable BikeChain IDs (BC-0001, BC-0002, etc.)
 * All registration numbers and owner identities are fictional demonstration data.
 * All technical specifications represent verified manufacturer data.
 * Document hashes are real SHA-256 digests of certified service certificates.
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
    color: "Brava Blue",
    currentOdometer: 4250,
    unit: "km",
    
    // Document hash reference (real SHA-256 of sampleDocumentText)
    documentHash: "CFDF7BA4BCA2BB1746EBD231635572282CCB9A87F55493B14456D572A2AC4DB2",
    documentName: "Apex Speedworks Service Certificate #01",
    sampleDocumentText: "BIKECHAIN CERTIFICATE: BC-0001 | Royal Enfield Guerrilla 450 | Apex Workshop #04 Verified",

    // Comprehensive Technical Specifications
    specifications: {
      engine: {
        displacement: "452 cc",
        engineType: "Single-cylinder, 4-stroke, 4-valve DOHC (Sherpa 450)",
        maxPower: "40.02 PS (39.5 bhp / 29.4 kW) @ 8,000 rpm",
        maxTorque: "40 Nm @ 5,500 rpm",
        transmission: "6-speed manual with slip & assist clutch",
        cooling: "Liquid-cooled",
        fuelType: "Petrol / Gasoline"
      },
      dimensions: {
        kerbWeight: "185 kg",
        fuelCapacity: "11 litres",
        seatHeight: "780 mm",
        groundClearance: "169 mm"
      },
      chassis: {
        frontSuspension: "43 mm Telescopic Fork (140 mm travel)",
        rearSuspension: "Linkage-type Monoshock (150 mm travel)",
        frontBrake: "310 mm Ventilated Disc with double-piston caliper",
        rearBrake: "270 mm Disc with single-piston caliper",
        abs: "Dual-Channel ABS",
        frontTyre: "120/70 R17 (Tubeless)",
        rearTyre: "160/60 R17 (Tubeless)"
      },
      efficiency: {
        claimedMileage: "29.5 km/l",
        mileageNote: "Official Manufacturer / Test Cycle Claim (WMTC / ARAI). Real-world mileage may vary depending on riding conditions."
      }
    },

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
    color: "Electronic Orange",
    currentOdometer: 14850,
    unit: "km",

    documentHash: "7D1CFDBAD9D4A65C81AB4526F8E9349AEF8EFF029DACFB5EE6E1B1C5F18EF162",
    documentName: "KTM Annual Inspection & Service Certificate",
    sampleDocumentText: "BIKECHAIN CERTIFICATE: BC-0002 | KTM 390 Duke | Indiranagar Workshop Verified",

    specifications: {
      engine: {
        displacement: "398.7 cc",
        engineType: "Single-cylinder, 4-stroke, 4-valve DOHC (LC4c)",
        maxPower: "46 PS (45.3 bhp / 33.8 kW) @ 8,500 rpm",
        maxTorque: "39 Nm @ 6,500 rpm",
        transmission: "6-speed manual with PASC slip-and-assist, Quickshifter+",
        cooling: "Liquid-cooled with curved radiator",
        fuelType: "Petrol / Gasoline"
      },
      dimensions: {
        kerbWeight: "168.3 kg",
        fuelCapacity: "15 litres",
        seatHeight: "800 mm (adjustable to 820 mm)",
        groundClearance: "151 mm"
      },
      chassis: {
        frontSuspension: "WP APEX 43 mm open-cartridge upside-down fork (150 mm travel)",
        rearSuspension: "WP APEX separate-piston monoshock (150 mm travel)",
        frontBrake: "320 mm Disc with radial 4-piston caliper",
        rearBrake: "240 mm Disc with 2-piston floating caliper",
        abs: "Bosch 9.3 MP Dual-Channel with Supermoto ABS & Cornering ABS",
        frontTyre: "110/70 R17",
        rearTyre: "150/60 R17"
      },
      efficiency: {
        claimedMileage: "28.9 km/l",
        mileageNote: "Official Manufacturer / Test Cycle Claim (WMTC). Real-world mileage may vary depending on riding conditions."
      }
    },

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
    color: "M Motorsport Tri-Color",
    currentOdometer: 8900,
    unit: "km",

    documentHash: "A15C75B566B7781E508C146316D8F19FCEC309C3B3597C1EF8FB8744AC25D65F",
    documentName: "BMW Certified Run-in & M Package Log",
    sampleDocumentText: "BIKECHAIN CERTIFICATE: BC-0003 | BMW S 1000 RR | M Package Inspection Verified",

    specifications: {
      engine: {
        displacement: "999 cc",
        engineType: "In-line 4-cylinder, 4-stroke, 16 titanium valves with BMW ShiftCam",
        maxPower: "210 PS (205 bhp / 154 kW) @ 13,750 rpm",
        maxTorque: "113 Nm @ 11,000 rpm",
        transmission: "6-speed claw-shifted, anti-hopping clutch, Shift Assistant Pro",
        cooling: "Water/oil-cooled",
        fuelType: "Petrol (Premium Unleaded, min 98 RON)"
      },
      dimensions: {
        kerbWeight: "197 kg (M Package: 193.5 kg)",
        fuelCapacity: "16.5 litres",
        seatHeight: "824 mm (M Seat: 814 / 849 mm)",
        groundClearance: "140 mm"
      },
      chassis: {
        frontSuspension: "45 mm Upside-down telescopic fork, DDC dynamic damping control",
        rearSuspension: "Aluminum swing arm, central shock absorber, full floater pro",
        frontBrake: "Twin 320 mm disc, 4-piston radial caliper (M Brakes)",
        rearBrake: "Single 220 mm disc, 1-piston floating caliper",
        abs: "BMW Motorrad Race ABS Pro (partially integral, slide control)",
        frontTyre: "120/70 ZR 17",
        rearTyre: "190/55 ZR 17 (or 200/55 ZR 17 M Wheels)"
      },
      efficiency: {
        claimedMileage: "15.6 km/l (6.4 L/100 km)",
        mileageNote: "Official Manufacturer / Test Cycle Claim (WMTC). Real-world mileage may vary depending on riding conditions."
      }
    },

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
    color: "Carnival Red",
    currentOdometer: 5400,
    unit: "km",

    documentHash: "CB2F4ED3B9DEF2F76E92F0F82F6E35194F8BC3CB004E16CFBFC058B30AD3C8FC",
    documentName: "Triumph Scheduled First Service Certificate",
    sampleDocumentText: "BIKECHAIN CERTIFICATE: BC-0004 | Triumph Speed 400 | Chennai Workshop Verified",

    specifications: {
      engine: {
        displacement: "398.15 cc",
        engineType: "Single-cylinder, 4-valve, DOHC (TR-Series)",
        maxPower: "40 PS (39.5 bhp / 29.4 kW) @ 8,000 rpm",
        maxTorque: "37.5 Nm @ 6,500 rpm",
        transmission: "6-speed with torque-assist clutch",
        cooling: "Liquid-cooled",
        fuelType: "Petrol / Gasoline"
      },
      dimensions: {
        kerbWeight: "176 kg",
        fuelCapacity: "13 litres",
        seatHeight: "790 mm",
        groundClearance: "158 mm"
      },
      chassis: {
        frontSuspension: "43 mm Upside Down Big Piston forks (140 mm travel)",
        rearSuspension: "Gas monoshock RSU with external reservoir, preload adjustable (130 mm travel)",
        frontBrake: "300 mm fixed disc, four-piston radial caliper",
        rearBrake: "230 mm fixed disc, floating caliper",
        abs: "Bosch Dual-Channel ABS",
        frontTyre: "110/70 R17 (Metzeler Sportec M9RR)",
        rearTyre: "150/60 R17 (Metzeler Sportec M9RR)"
      },
      efficiency: {
        claimedMileage: "29.4 km/l",
        mileageNote: "Official Manufacturer / Test Cycle Claim (WMTC). Real-world mileage may vary depending on riding conditions."
      }
    },

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
