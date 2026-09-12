// Realistic agricultural dataset for AgriLink AI
// Calibrated for Indian / Karnataka agricultural hubs

export const CROPS = {
  Tomato: {
    name: 'Tomato (Tamatar)',
    icon: '🍅',
    category: 'Perishable Vegetable',
    baseShelfLifeDays: 4,
    perishabilityRating: 'HIGH', // HIGH, MEDIUM, LOW
    spoilagePerDayPct: 15,
    standardRatePerKg: 32,
    coldStorageFeasible: true,
    maxStorageDays: 14,
    moistureSensitivity: 'HIGH',
    packagingUnit: 'crates (25 kg)',
  },
  Onion: {
    name: 'Onion (Pyaaz)',
    icon: '🧅',
    category: 'Semi-Perishable Vegetable',
    baseShelfLifeDays: 45,
    perishabilityRating: 'LOW',
    spoilagePerDayPct: 1.5,
    standardRatePerKg: 26,
    coldStorageFeasible: true,
    maxStorageDays: 90,
    moistureSensitivity: 'HIGH', // rot if wet
    packagingUnit: 'sacks (50 kg)',
  },
  Potato: {
    name: 'Potato (Aaloo)',
    icon: '🥔',
    category: 'Storable Tuber',
    baseShelfLifeDays: 60,
    perishabilityRating: 'LOW',
    spoilagePerDayPct: 0.8,
    standardRatePerKg: 22,
    coldStorageFeasible: true,
    maxStorageDays: 180,
    moistureSensitivity: 'MEDIUM',
    packagingUnit: 'bags (50 kg)',
  },
  GreenChilli: {
    name: 'Green Chilli (Mirchi)',
    icon: '🌶️',
    category: 'Spices & Condiments',
    baseShelfLifeDays: 7,
    perishabilityRating: 'HIGH',
    spoilagePerDayPct: 12,
    standardRatePerKg: 55,
    coldStorageFeasible: true,
    maxStorageDays: 20,
    moistureSensitivity: 'HIGH',
    packagingUnit: 'cartons (15 kg)',
  },
  Maize: {
    name: 'Maize / Corn (Makka)',
    icon: '🌽',
    category: 'Cereal Grain',
    baseShelfLifeDays: 120,
    perishabilityRating: 'VERY_LOW',
    spoilagePerDayPct: 0.3,
    standardRatePerKg: 19,
    coldStorageFeasible: false, // normal godown is enough
    maxStorageDays: 240,
    moistureSensitivity: 'HIGH',
    packagingUnit: 'gunny bags (50 kg)',
  },
  Cabbage: {
    name: 'Cabbage (Patta Gobhi)',
    icon: '🥬',
    category: 'Leafy Vegetable',
    baseShelfLifeDays: 6,
    perishabilityRating: 'HIGH',
    spoilagePerDayPct: 10,
    standardRatePerKg: 16,
    coldStorageFeasible: true,
    maxStorageDays: 21,
    moistureSensitivity: 'MEDIUM',
    packagingUnit: 'mesh sacks (30 kg)',
  }
};

export const LOCATIONS = [
  'Shivamogga',
  'Kolar',
  'Mandya',
  'Belagavi',
  'Davanagere',
  'Chikkaballapur',
  'Hassan'
];

export const BUYERS_BY_LOCATION = {
  Shivamogga: [
    {
      id: 'B1',
      name: 'Sahyadri Agro Traders (APMC Mandi)',
      distanceKm: 18,
      priceOffset: 0,
      paymentTerm: 'Instant UPI / Cash',
      reliabilityScore: 4.8,
      minQuantityKg: 100,
      contact: '+91 94481 23091',
      notes: 'APMC licensed, prompt payment, charges 1% mandi cess'
    },
    {
      id: 'B2',
      name: 'FreshGro Regional Wholesale Hub',
      distanceKm: 55,
      priceOffset: 4, // ₹4 more per kg
      paymentTerm: 'T+2 Bank Transfer',
      reliabilityScore: 4.5,
      minQuantityKg: 300,
      contact: '+91 80234 98112',
      notes: 'High demand supermarket aggregator, requires graded quality'
    },
    {
      id: 'B3',
      name: 'Bhadra Local Farm Gate Agent',
      distanceKm: 6,
      priceOffset: -2, // ₹2 discount for door pickup
      paymentTerm: 'Instant Cash at Farmgate',
      reliabilityScore: 4.2,
      minQuantityKg: 50,
      contact: '+91 98860 41203',
      notes: 'Picks up directly from farm gate, no transport needed'
    }
  ],
  Kolar: [
    {
      id: 'B1',
      name: 'Kolar APMC Mega Mandi',
      distanceKm: 14,
      priceOffset: 1,
      paymentTerm: 'Same Day RTGS',
      reliabilityScore: 4.9,
      minQuantityKg: 200,
      contact: '+91 94480 55123',
      notes: 'Asia\'s 2nd largest tomato market, intense bidding'
    },
    {
      id: 'B2',
      name: 'Bengaluru Wholesale Terminal (Yeshwanthpur)',
      distanceKm: 72,
      priceOffset: 6,
      paymentTerm: 'Next Day Transfer',
      reliabilityScore: 4.6,
      minQuantityKg: 500,
      contact: '+91 99012 34567',
      notes: 'Highest retail demand prices, requires reliable transport'
    },
    {
      id: 'B3',
      name: 'Srinivaspur Local Aggregator',
      distanceKm: 9,
      priceOffset: -1.5,
      paymentTerm: 'Instant Cash',
      reliabilityScore: 4.1,
      minQuantityKg: 100,
      contact: '+91 97312 88441',
      notes: 'Fast clearing, lower documentation'
    }
  ],
  Mandya: [
    {
      id: 'B1',
      name: 'Mandya Farmers Cooperative',
      distanceKm: 12,
      priceOffset: 0.5,
      paymentTerm: 'Direct Bank Deposit',
      reliabilityScore: 4.7,
      minQuantityKg: 100,
      contact: '+91 94482 10923',
      notes: 'Subsidized weighing, zero commission for members'
    },
    {
      id: 'B2',
      name: 'Mysuru Bandipalya Central Market',
      distanceKm: 48,
      priceOffset: 3.5,
      paymentTerm: 'T+1 NEFT',
      reliabilityScore: 4.6,
      minQuantityKg: 300,
      contact: '+91 98450 67120',
      notes: 'High volume buyers for hotels and retail chains'
    },
    {
      id: 'B3',
      name: 'Cauvery Food Processors Ltd',
      distanceKm: 28,
      priceOffset: 2,
      paymentTerm: 'Weekly Settlement',
      reliabilityScore: 4.4,
      minQuantityKg: 400,
      contact: '+91 99801 44521',
      notes: 'Industrial bulk purchaser, strict quality screening'
    }
  ],
  Belagavi: [
    {
      id: 'B1',
      name: 'Belagavi APMC Trading Yard',
      distanceKm: 16,
      priceOffset: 0,
      paymentTerm: 'Instant Bank Transfer',
      reliabilityScore: 4.8,
      minQuantityKg: 150,
      contact: '+91 94483 33211',
      notes: 'Major northern Karnataka trade corridor'
    },
    {
      id: 'B2',
      name: 'Goa Cross-Border Supply Syndicate',
      distanceKm: 110,
      priceOffset: 7,
      paymentTerm: 'T+2 Payment',
      reliabilityScore: 4.3,
      minQuantityKg: 800,
      contact: '+91 98451 90022',
      notes: 'Premium coastal tourist market, long haul transit'
    },
    {
      id: 'B3',
      name: 'KLE Agro Producer Group',
      distanceKm: 10,
      priceOffset: -1,
      paymentTerm: 'Instant Cash',
      reliabilityScore: 4.5,
      minQuantityKg: 100,
      contact: '+91 97410 22910',
      notes: 'Cooperative purchase center with fair weights'
    }
  ],
  Davanagere: [
    {
      id: 'B1',
      name: 'Davanagere Main APMC',
      distanceKm: 15,
      priceOffset: 0,
      paymentTerm: 'UPI / Cheque',
      reliabilityScore: 4.7,
      minQuantityKg: 100,
      contact: '+91 94484 77102',
      notes: 'Central Karnataka trading hub'
    },
    {
      id: 'B2',
      name: 'Hubballi Express Mandi',
      distanceKm: 78,
      priceOffset: 4.5,
      paymentTerm: 'T+1 Transfer',
      reliabilityScore: 4.4,
      minQuantityKg: 400,
      contact: '+91 98800 55198',
      notes: 'High demand for wholesale forwarding'
    },
    {
      id: 'B3',
      name: 'Harihar Local Traders',
      distanceKm: 8,
      priceOffset: -1.5,
      paymentTerm: 'Cash on Delivery',
      reliabilityScore: 4.0,
      minQuantityKg: 50,
      contact: '+91 99001 88234',
      notes: 'Local retail distribution'
    }
  ],
  Chikkaballapur: [
    {
      id: 'B1',
      name: 'Chikkaballapur Vegetable APMC',
      distanceKm: 11,
      priceOffset: 0,
      paymentTerm: 'Instant RTGS',
      reliabilityScore: 4.7,
      minQuantityKg: 100,
      contact: '+91 94485 11200',
      notes: 'Specialized vegetable export-oriented hub'
    },
    {
      id: 'B2',
      name: 'Devanahalli Airport Aerotropolis Mart',
      distanceKm: 42,
      priceOffset: 5,
      paymentTerm: 'T+1 Bank Transfer',
      reliabilityScore: 4.6,
      minQuantityKg: 250,
      contact: '+91 98452 77800',
      notes: 'Supplies high-end retail chains and quick-commerce dark stores'
    },
    {
      id: 'B3',
      name: 'Sidlaghatta Farmer Group',
      distanceKm: 7,
      priceOffset: -1,
      paymentTerm: 'Instant Cash',
      reliabilityScore: 4.2,
      minQuantityKg: 80,
      contact: '+91 97315 66010',
      notes: 'Quick turnaround, local collection'
    }
  ],
  Hassan: [
    {
      id: 'B1',
      name: 'Hassan APMC Yard',
      distanceKm: 14,
      priceOffset: 0,
      paymentTerm: 'Instant UPI',
      reliabilityScore: 4.7,
      minQuantityKg: 100,
      contact: '+91 94486 44301',
      notes: 'Key connection between Malnad and plains'
    },
    {
      id: 'B2',
      name: 'Mangaluru Coastal Transit Hub',
      distanceKm: 135,
      priceOffset: 8,
      paymentTerm: 'T+3 Transfer',
      reliabilityScore: 4.3,
      minQuantityKg: 1000,
      contact: '+91 98453 88110',
      notes: 'Heavy rain ghat transit, high reward coastal price'
    },
    {
      id: 'B3',
      name: 'Arasikere Local Traders',
      distanceKm: 9,
      priceOffset: -2,
      paymentTerm: 'Instant Cash',
      reliabilityScore: 4.1,
      minQuantityKg: 50,
      contact: '+91 99014 22390',
      notes: 'Farmgate collector, minimal hassle'
    }
  ]
};

export const STORAGE_FACILITIES = {
  Shivamogga: [
    {
      id: 'S1',
      name: 'Shivamogga District Cold Chain Ltd',
      type: 'Cold Storage (4-8°C)',
      capacityKg: 50000,
      availableKg: 12000,
      dailyRatePerKg: 1.8,
      distanceKm: 12,
      minDays: 3,
      insuranceIncluded: true,
      spoilageReductionPct: 80,
    },
    {
      id: 'S2',
      name: 'Krishi Vigyan Kendra Warehouse',
      type: 'Ventilated Godown (Ambient)',
      capacityKg: 30000,
      availableKg: 8000,
      dailyRatePerKg: 0.6,
      distanceKm: 8,
      minDays: 2,
      insuranceIncluded: false,
      spoilageReductionPct: 35,
    }
  ],
  Kolar: [
    {
      id: 'S1',
      name: 'Kolar Agro Cold Storage Consortium',
      type: 'Pre-cooling & CA Cold Storage',
      capacityKg: 80000,
      availableKg: 24000,
      dailyRatePerKg: 2.0,
      distanceKm: 10,
      minDays: 3,
      insuranceIncluded: true,
      spoilageReductionPct: 85,
    },
    {
      id: 'S2',
      name: 'APMC Godown #4',
      type: 'Dry Storage Godown',
      capacityKg: 40000,
      availableKg: 15000,
      dailyRatePerKg: 0.7,
      distanceKm: 14,
      minDays: 1,
      insuranceIncluded: false,
      spoilageReductionPct: 40,
    }
  ],
  Mandya: [
    {
      id: 'S1',
      name: 'Mandya Cold Storage Unit',
      type: 'Refrigerated Cold Store',
      capacityKg: 40000,
      availableKg: 9500,
      dailyRatePerKg: 1.9,
      distanceKm: 15,
      minDays: 2,
      insuranceIncluded: true,
      spoilageReductionPct: 80,
    },
    {
      id: 'S2',
      name: 'Sugarcane Belt Community Granary',
      type: 'Ventilated Dry Store',
      capacityKg: 25000,
      availableKg: 6000,
      dailyRatePerKg: 0.5,
      distanceKm: 7,
      minDays: 1,
      insuranceIncluded: false,
      spoilageReductionPct: 30,
    }
  ],
  Belagavi: [
    {
      id: 'S1',
      name: 'Belagavi Multi-Commodity Cold Store',
      type: 'Cold Storage (0-5°C)',
      capacityKg: 90000,
      availableKg: 30000,
      dailyRatePerKg: 2.1,
      distanceKm: 14,
      minDays: 3,
      insuranceIncluded: true,
      spoilageReductionPct: 85,
    }
  ],
  Davanagere: [
    {
      id: 'S1',
      name: 'Central Karnataka Cold Logistics',
      type: 'Multi-chamber Cold Facility',
      capacityKg: 60000,
      availableKg: 18000,
      dailyRatePerKg: 1.7,
      distanceKm: 11,
      minDays: 3,
      insuranceIncluded: true,
      spoilageReductionPct: 80,
    }
  ],
  Chikkaballapur: [
    {
      id: 'S1',
      name: 'Nandi Hills Cold Preservation Hub',
      type: 'Export-Grade Cold Storage',
      capacityKg: 70000,
      availableKg: 21000,
      dailyRatePerKg: 2.2,
      distanceKm: 9,
      minDays: 2,
      insuranceIncluded: true,
      spoilageReductionPct: 90,
    }
  ],
  Hassan: [
    {
      id: 'S1',
      name: 'Hassan Spices & Produce Storage',
      type: 'Controlled Atmosphere Store',
      capacityKg: 45000,
      availableKg: 11000,
      dailyRatePerKg: 1.9,
      distanceKm: 13,
      minDays: 3,
      insuranceIncluded: true,
      spoilageReductionPct: 82,
    }
  ]
};

export const LOGISTICS_FLEET = [
  {
    id: 'L1',
    name: 'Tractor Trolley / Auto 3-Wheeler',
    capacityKg: 800,
    baseFare: 350,
    ratePerKm: 14,
    suitableFor: 'Short haul, local village mandi (< 25 km)',
    tarpProtected: false,
    speedAvgKmh: 30
  },
  {
    id: 'L2',
    name: 'Tata Ace (Chhota Hathi)',
    capacityKg: 1200,
    baseFare: 550,
    ratePerKm: 18,
    suitableFor: 'Medium haul, APMC & district hubs (< 80 km)',
    tarpProtected: true,
    speedAvgKmh: 45
  },
  {
    id: 'L3',
    name: 'Mahindra Bolero Maxi Truck',
    capacityKg: 1800,
    baseFare: 750,
    ratePerKm: 22,
    suitableFor: 'Regional hubs, fast transport with crate support',
    tarpProtected: true,
    speedAvgKmh: 55
  },
  {
    id: 'L4',
    name: 'Eicher 14ft Commercial Truck',
    capacityKg: 4500,
    baseFare: 1600,
    ratePerKm: 32,
    suitableFor: 'Inter-district & interstate bulk freight (> 70 km)',
    tarpProtected: true,
    speedAvgKmh: 50
  }
];

export const REGIONAL_WEATHER_PROFILES = {
  Shivamogga: {
    condition: 'Heavy Monsoonal Rains Expected',
    rainProbabilityPct: 82,
    riskLevel: 'HIGH',
    forecast3Day: 'Continuous rainfall with high humidity (88%). Flood alerts in low-lying belt.',
    transitDisruptionRisk: 'HIGH',
    openStorageHazard: 'CRITICAL',
    tempCelsius: 24,
    humidityPct: 88,
  },
  Kolar: {
    condition: 'Sunny & Clear Skies',
    rainProbabilityPct: 15,
    riskLevel: 'LOW',
    forecast3Day: 'Dry weather, peak daytime temperature 31°C. Ideal transport conditions.',
    transitDisruptionRisk: 'LOW',
    openStorageHazard: 'LOW',
    tempCelsius: 31,
    humidityPct: 45,
  },
  Mandya: {
    condition: 'Scattered Showers',
    rainProbabilityPct: 45,
    riskLevel: 'MODERATE',
    forecast3Day: 'Intermittent afternoon showers, moderate humidity (68%). Tarp protection essential.',
    transitDisruptionRisk: 'MODERATE',
    openStorageHazard: 'MODERATE',
    tempCelsius: 28,
    humidityPct: 68,
  },
  Belagavi: {
    condition: 'Overcast with Dense Fog & Drizzle',
    rainProbabilityPct: 60,
    riskLevel: 'MODERATE',
    forecast3Day: 'Cloudy, mist and damp roads. Ghat section roads slow for freight.',
    transitDisruptionRisk: 'HIGH',
    openStorageHazard: 'MODERATE',
    tempCelsius: 22,
    humidityPct: 78,
  },
  Davanagere: {
    condition: 'Clear & Hot',
    rainProbabilityPct: 10,
    riskLevel: 'LOW',
    forecast3Day: 'Heat wave conditions, temperature 34°C. Perishable produce may dehydrate if not covered.',
    transitDisruptionRisk: 'LOW',
    openStorageHazard: 'LOW',
    tempCelsius: 34,
    humidityPct: 38,
  },
  Chikkaballapur: {
    condition: 'Partly Cloudy, Breezy',
    rainProbabilityPct: 20,
    riskLevel: 'LOW',
    forecast3Day: 'Pleasant trading weather, good highway connectivity.',
    transitDisruptionRisk: 'LOW',
    openStorageHazard: 'LOW',
    tempCelsius: 27,
    humidityPct: 52,
  },
  Hassan: {
    condition: 'Heavy Downpours',
    rainProbabilityPct: 85,
    riskLevel: 'HIGH',
    forecast3Day: 'Western Ghats monsoon squalls. Muddy farm access roads.',
    transitDisruptionRisk: 'CRITICAL',
    openStorageHazard: 'CRITICAL',
    tempCelsius: 21,
    humidityPct: 92,
  }
};

export const DEMO_PRESETS = [
  {
    id: 'preset-tomato-rain',
    title: '🌧️ Shivamogga Tomato Monsoon Emergency',
    tag: 'Perishable + High Weather Risk',
    description: '500 kg tomatoes ready now. 82% rain forecast over next 3 days. High spoilage danger.',
    input: {
      crop: 'Tomato',
      quantityKg: 500,
      location: 'Shivamogga',
      harvestTiming: 'Ready Today',
      storageAvailable: true,
      priority: 'balanced'
    }
  },
  {
    id: 'preset-potato-surge',
    title: '📈 Kolar Potato Price Surge Arbitrage',
    tag: 'Low Perishability + Market Surge',
    description: '1,500 kg potatoes. Local prices ₹22/kg, but expected to jump to ₹28/kg next week. Dry weather.',
    input: {
      crop: 'Potato',
      quantityKg: 1500,
      location: 'Kolar',
      harvestTiming: 'In 2 Days',
      storageAvailable: true,
      priority: 'maximize_profit'
    }
  },
  {
    id: 'preset-onion-transport',
    title: '🚚 Mandya Onion Distance Dilemma',
    tag: 'Transport Trade-Off',
    description: '800 kg onions. Distant buyer offers ₹3.5 higher price, but 48 km freight cost eats margins.',
    input: {
      crop: 'Onion',
      quantityKg: 800,
      location: 'Mandya',
      harvestTiming: 'Ready Today',
      storageAvailable: false,
      priority: 'minimize_risk'
    }
  }
];
