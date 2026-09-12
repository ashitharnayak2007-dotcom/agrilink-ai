import { STORAGE_FACILITIES } from '../data/agriculturalData';

/**
 * 🏪 Storage Agent
 * Evaluates nearby warehouse / cold store capacity, daily holding rates,
 * preservation feasibility, and break-even holding economics.
 */
export function runStorageAgent(input, cropInsight, weatherInsight) {
  const facilities = STORAGE_FACILITIES[input.location] || [];
  const farmerQty = Number(input.quantityKg) || 100;
  const userRequestedStorage = Boolean(input.storageAvailable);

  if (!facilities.length || !userRequestedStorage) {
    return {
      agentId: 'storage-agent',
      agentName: 'Storage Agent',
      icon: '🏪',
      status: 'COMPLETED',
      timestamp: new Date().toLocaleTimeString(),
      summary: userRequestedStorage
        ? `No accredited cold storage registered within immediate radius of ${input.location}.`
        : 'Farmer indicated storage is not desired or unavailable.',
      data: {
        isFeasible: false,
        recommended: false,
        facilities: [],
        reason: userRequestedStorage ? 'No nearby certified facility available' : 'Storage opted out by farmer',
        holdingCostPerWeek: 0,
        breakEvenPriceIncreasePerKg: 0,
      },
      thoughts: [
        userRequestedStorage 
          ? `Checked regional registry: no active cold chain facility within optimal distance for ${input.location}.`
          : `Farmer marked storage as unavailable or preferred direct liquidation.`,
        `Recommendation: Route 100% of harvest to direct mandi liquidation.`
      ]
    };
  }

  // Select best facility based on crop type
  const isColdRequired = cropInsight.data.coldStorageFeasible && cropInsight.data.perishabilityRating === 'HIGH';
  const bestFacility = facilities.find(f => isColdRequired ? f.type.toLowerCase().includes('cold') : true) || facilities[0];

  // Holding calculations for 7 days
  const holdingDays = 7;
  const storageCost7Days = Math.round(bestFacility.dailyRatePerKg * farmerQty * holdingDays);
  const breakEvenIncrease = (storageCost7Days / farmerQty).toFixed(2);

  // Economic feasibility logic:
  // If weather is HIGH risk and crop is highly perishable without cold storage, storage is risky.
  // But if good cold storage exists with 80%+ spoilage reduction, it can buffer market gluts.
  let isRecommended = false;
  let rationale = '';

  if (cropInsight.data.perishabilityRating === 'LOW') {
    isRecommended = true;
    rationale = `Crop (${cropInsight.data.cropName}) is storable with minimal spoilage. Holding 1-2 weeks in ${bestFacility.name} costs ₹${bestFacility.dailyRatePerKg}/kg/day, potentially yielding ₹4-8/kg higher offseason rates.`;
  } else if (weatherInsight.data.riskLevel === 'HIGH' && bestFacility.type.toLowerCase().includes('cold')) {
    isRecommended = true;
    rationale = `Severe weather threatens farmgate spoilage. Storing 30-40% buffer in ${bestFacility.name} safeguards against panic distressed liquidation at bottom-feeder rates.`;
  } else if (cropInsight.data.perishabilityRating === 'HIGH' && weatherInsight.data.riskLevel === 'HIGH') {
    isRecommended = false;
    rationale = `Extreme weather and high perishability make prolonged holding hazardous. Sell majority immediately.`;
  } else {
    isRecommended = false;
    rationale = `Holding cost of ₹${storageCost7Days} over ${holdingDays} days requires ₹${breakEvenIncrease}/kg price appreciation, which is uncertain under current flat market conditions.`;
  }

  return {
    agentId: 'storage-agent',
    agentName: 'Storage Agent',
    icon: '🏪',
    status: 'COMPLETED',
    timestamp: new Date().toLocaleTimeString(),
    summary: `${bestFacility.name} available at ₹${bestFacility.dailyRatePerKg}/kg/day (${bestFacility.distanceKm} km). Storage Feasible: ${isRecommended ? 'YES (Strategic Buffer)' : 'NO (Direct Sale Recommended)'}.`,
    data: {
      isFeasible: true,
      recommended: isRecommended,
      selectedFacility: bestFacility,
      dailyRatePerKg: bestFacility.dailyRatePerKg,
      distanceKm: bestFacility.distanceKm,
      holdingDays,
      totalHoldingCost: storageCost7Days,
      breakEvenPriceIncreasePerKg: breakEvenIncrease,
      rationale,
      availableCapacityKg: bestFacility.availableKg,
    },
    thoughts: [
      `Surveying certified warehouses in ${input.location}: selected ${bestFacility.name} (${bestFacility.type}).`,
      `Facility distance is ${bestFacility.distanceKm} km. Daily tariff: ₹${bestFacility.dailyRatePerKg}/kg.`,
      `7-day holding cost for ${farmerQty} kg = ₹${storageCost7Days} (requires +₹${breakEvenIncrease}/kg market rise to break even).`,
      `Economic feasibility verdict: ${isRecommended ? 'RECOMMENDED' : 'NOT RECOMMENDED'} - ${rationale}`,
      `Passing storage parameters to Negotiation and Decision agents.`
    ]
  };
}
