import { Car } from "@/src/types";

export const CARS_DATA: Car[] = [
  {
    id: "car-1",
    brand: "Porsche",
    model: "911 Carrera S",
    year: 2022,
    price: 124900,
    emi: 1840,
    location: "Beverly Hills Showroom",
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: 4200,
    bodyType: "Coupe",
    certified: true,
    imageBg: "bg-slate-900/10",
    featured: true,
    specifications: [
      "Engine: 3.0L Twin-Turbo Flat 6",
      "Power: 443 hp @ 6500 rpm",
      "0-60 mph: 3.5 seconds",
      "Top Speed: 191 mph"
    ],
    features: [
      "Sport Chrono Package",
      "BOSE Surround Sound",
      "20/21-inch Carrera S Wheels",
      "Porsche Active Suspension Management (PASM)",
      "LED Matrix Design Headlights",
      "Lane Keep Assist & Adaptive Cruise"
    ],
    inspectionSummary: {
      overallScore: 9.8,
      engine: "Pristine - No wear or fluid leaks detected, optimal compression.",
      brakes: "95% brake pad life remaining, excellent rotor health.",
      electronics: "All ECUs clear of codes, active dynamic dampers verified.",
      exterior: "100% original paint, clear protection film installed.",
      interior: "Fine Nappa leather clean, zero creasing on bolsters."
    },
    warrantyInfo: {
      months: 24,
      miles: 24000,
      coverage: "Comprehensive bumper-to-bumper 1stMark Elite Protection"
    },
    owners: 1,
    cities: ["Los Angeles", "Beverly Hills"]
  },
  {
    id: "car-2",
    brand: "Land Rover",
    model: "Defender 110 V8",
    year: 2021,
    price: 89200,
    emi: 1310,
    location: "Los Angeles Hub",
    fuel: "Petrol",
    transmission: "AWD",
    mileage: 12500,
    bodyType: "SUV",
    certified: true,
    imageBg: "bg-emerald-950/10",
    featured: true,
    specifications: [
      "Engine: 5.0L Supercharged V8",
      "Power: 518 hp @ 6000 rpm",
      "0-60 mph: 4.9 seconds",
      "Torque: 461 lb-ft"
    ],
    features: [
      "Carpathian Edition Package",
      "Sliding Panoramic Roof",
      "Meridian Surround Sound System",
      "Configurable Terrain Response 2",
      "22-inch Satin Dark Grey Wheels",
      "Head-Up Display & Quad Exhaust"
    ],
    inspectionSummary: {
      overallScore: 9.5,
      engine: "Powerful performance, oil analysis shows zero metal wear.",
      brakes: "90% brake pad life, fluid flush performed.",
      electronics: "Air suspension operates perfectly, all sensors calibrated.",
      exterior: "Carpathian Satin Wrap in immaculate shape, no rock chips.",
      interior: "Robust Dinamica suedecloth and Windsor leather in perfect shape."
    },
    warrantyInfo: {
      months: 12,
      miles: 15000,
      coverage: "Certified Pre-Owned Powertrain & Systems Warranty"
    },
    owners: 2,
    cities: ["Los Angeles", "Santa Monica"]
  },
  {
    id: "car-3",
    brand: "BMW",
    model: "M4 Competition",
    year: 2023,
    price: 94500,
    emi: 1390,
    location: "San Francisco Gallery",
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: 1800,
    bodyType: "Coupe",
    certified: true,
    imageBg: "bg-blue-950/10",
    featured: true,
    specifications: [
      "Engine: 3.0L Twin-Turbo Inline 6",
      "Power: 503 hp @ 6250 rpm",
      "0-60 mph: 3.4 seconds",
      "Drivetrain: xDrive AWD"
    ],
    features: [
      "M Carbon Exterior Package",
      "M Shadowline Laserlights",
      "Executive Package with HUD",
      "Harman Kardon Premium Audio",
      "Carbon Fiber Bucket Seats",
      "M Sport Differential & Adaptive M Suspension"
    ],
    inspectionSummary: {
      overallScore: 9.9,
      engine: "Like-new condition, first break-in service completed by BMW.",
      brakes: "99% brake pad life, carbon-ceramic rotors verified.",
      electronics: "Latest iDrive firmware updated, M-Drive settings validated.",
      exterior: "Frozen Portimao Blue metallic paint in showroom state.",
      interior: "Carbon bucket shells pristine, carbon fiber trim untouched."
    },
    warrantyInfo: {
      months: 36,
      miles: 36000,
      coverage: "Manufacturer balance + 12-Month extended 1stMark Certified Gold"
    },
    owners: 1,
    cities: ["San Francisco", "San Jose"]
  },
  {
    id: "car-4",
    brand: "Audi",
    model: "RS e-tron GT",
    year: 2022,
    price: 109800,
    emi: 1610,
    location: "Beverly Hills Showroom",
    fuel: "Electric",
    transmission: "Automatic",
    mileage: 6100,
    bodyType: "Sedan",
    certified: true,
    imageBg: "bg-slate-800/10",
    featured: true,
    specifications: [
      "Engine: Dual Synchronous Electric Motors",
      "Power: 637 hp (in Boost Mode)",
      "0-60 mph: 3.1 seconds",
      "Battery: 93.4 kWh Lithium-Ion"
    ],
    features: [
      "Fine Nappa Leather Seats with Honeycomb Stitching",
      "Matrix Design LED Headlights with Audi Laser Light",
      "Carbon Fiber Roof & Exterior Mirror Housings",
      "Bang & Olufsen 3D Advanced Sound System",
      "Adaptive Air Suspension with RS Tuning",
      "All-wheel Steering & Tungsten Carbide Brakes"
    ],
    inspectionSummary: {
      overallScore: 9.7,
      engine: "Electric drivetrains and thermal cooling systems 100% efficient.",
      brakes: "Tungsten carbide brakes at 92% life, extreme stopping power.",
      electronics: "Virtual cockpit and battery cell metrics at 100% health.",
      exterior: "Stunning Mythos Black paint, ceramic coated.",
      interior: "Massage seating, Alcantara steering wheel as new."
    },
    warrantyInfo: {
      months: 24,
      miles: 25000,
      coverage: "EV Battery guaranteed for 8 years / 100k miles + Bumper-to-Bumper Certificate"
    },
    owners: 1,
    cities: ["Los Angeles", "Beverly Hills"]
  },
  {
    id: "car-5",
    brand: "Mercedes-Benz",
    model: "G 63 AMG",
    year: 2020,
    price: 156000,
    emi: 2290,
    location: "San Jose Hub",
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: 18400,
    bodyType: "SUV",
    certified: true,
    imageBg: "bg-[#2E7D32]/5",
    featured: true,
    specifications: [
      "Engine: 4.0L Twin-Turbo V8",
      "Power: 577 hp @ 6000 rpm",
      "0-60 mph: 4.5 seconds",
      "Torque: 627 lb-ft"
    ],
    features: [
      "AMG Night Package",
      "Burmester High-End Surround Sound",
      "AMG Performance Exhaust System",
      "Exclusive Interior Plus with Diamond Stitching",
      "22-inch Forged AMG Cross-Spoke Wheels",
      "Three Independent Differential Locks"
    ],
    inspectionSummary: {
      overallScore: 9.4,
      engine: "Hand-built AMG engine fully checked, oil clean, plugs replaced.",
      brakes: "New front brake pads and rotors installed.",
      electronics: "Differential locks checked under load, flawless operation.",
      exterior: "Classic G-wagon panels perfectly straight, zero off-road use.",
      interior: "Designo Bengal Red/Black dual-tone leather in excellent order."
    },
    warrantyInfo: {
      months: 12,
      miles: 12000,
      coverage: "Comprehensive 1stMark Protection Plus Warranty"
    },
    owners: 2,
    cities: ["San Jose", "San Francisco"]
  },
  {
    id: "car-6",
    brand: "Tesla",
    model: "Model S Plaid",
    year: 2023,
    price: 87500,
    emi: 1285,
    location: "Oakland Showroom",
    fuel: "Electric",
    transmission: "Automatic",
    mileage: 3900,
    bodyType: "Sedan",
    certified: true,
    imageBg: "bg-zinc-900/10",
    featured: true,
    specifications: [
      "Engine: Tri-Motor All-Wheel Drive",
      "Power: 1,020 hp",
      "0-60 mph: 1.99 seconds",
      "Quarter Mile: 9.23 seconds @ 155 mph"
    ],
    features: [
      "Signature Yoke Steering Wheel",
      "21-inch Arachnid Wheels",
      "Full Self-Driving (FSD) Computer Included",
      "17-inch Cinematic Center Display + Rear Passenger Screen",
      "Premium 22-Speaker Audio with Active Noise Canceling",
      "Ventilated Front Seats & Tri-Zone Climate"
    ],
    inspectionSummary: {
      overallScore: 9.8,
      engine: "Carbon-sleeved rotor motors in absolute peak condition.",
      brakes: "Minimal pad wear due to high regenerative braking efficiency.",
      electronics: "AP4 FSD hardware verified, battery cells at 98.7% capacity.",
      exterior: "Ultra White paint clean, aftermarket ceramic tint applied.",
      interior: "Carbon fiber dash and white vegan leather immaculate."
    },
    warrantyInfo: {
      months: 36,
      miles: 40000,
      coverage: "Tesla Factory Powertrain Balance + 12-Month 1stMark Elite"
    },
    owners: 1,
    cities: ["Oakland", "San Francisco"]
  }
];

export const FAMOUS_BRANDS = [
  "Porsche",
  "Land Rover",
  "BMW",
  "Audi",
  "Mercedes-Benz",
  "Tesla"
];

export const BUDGET_RANGES = [
  { label: "All Budgets", min: 0, max: 1000000 },
  { label: "Under $100,000", min: 0, max: 100000 },
  { label: "$100,000 - $130,000", min: 100000, max: 130000 },
  { label: "Over $130,000", min: 130000, max: 1000000 }
];

export const CITIES_DATA = [
  "All Cities",
  "Los Angeles",
  "Beverly Hills",
  "San Francisco",
  "San Jose",
  "Oakland"
];
