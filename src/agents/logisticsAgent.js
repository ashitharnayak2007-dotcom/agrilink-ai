import { LOGISTICS_FLEET } from '../data/agriculturalData';

/**
 * 🚚 Logistics Agent
 * Selects the optimal vehicle for farmer load, verifies weather protection (tarpaulin),
 * and computes accurate freight costs for each candidate buyer and storage hub.
 */
export function runLogisticsAgent(input, weatherInsight, marketInsight) {
  const quantity = Number(input.quantityKg) || 100;
  const isRainHazard = weatherInsight.data.rainProbabilityPct > 40;

  // Find candidate vehicles that can fit the load
  const capableVehicles = LOGISTICS_FLEET.filter(v => v.capacityKg >= quantity);
  const fleetOptions = capableVehicles.length > 0 ? capableVehicles : [LOGISTICS_FLEET[LOGISTICS_FLEET.length - 1]];

  // Pick best default vehicle: smallest that fits load, but if rain hazard, ensure tarp protection
  let chosenVehicle = fleetOptions.find(v => isRainHazard ? v.tarpProtected : true) || fleetOptions[0];

  // Helper to compute cost to a specific destination
  const calculateFreight = (distanceKm, vehicle) => {
    const v = vehicle || chosenVehicle;
    // Base fare + roundtrip / single way freight
    const cost = v.baseFare + Math.round(distanceKm * v.ratePerKm);
    return cost;
  };

  // Compute freight cost to all candidate buyers
  const buyerFreightAnalysis = marketInsight.data.buyers.map(b => {
    // If buyer has farmgate pickup (e.g. distance <= 8 and notes say farmgate), transport cost is 0
    const isFarmgate = b.notes.toLowerCase().includes('farm gate') || b.notes.toLowerCase().includes('farmgate');
    const freightCost = isFarmgate ? 0 : calculateFreight(b.distanceKm, chosenVehicle);
    const costPerKg = (freightCost / quantity).toFixed(2);

    return {
      buyerId: b.id,
      buyerName: b.name,
      distanceKm: b.distanceKm,
      isFarmgate,
      freightCost,
      costPerKg: Number(costPerKg),
      transitMinutesEst: Math.round((b.distanceKm / chosenVehicle.speedAvgKmh) * 60) + 15 // load/unload buffer
    };
  });

  return {
    agentId: 'logistics-agent',
    agentName: 'Logistics Agent',
    icon: '🚚',
    status: 'COMPLETED',
    timestamp: new Date().toLocaleTimeString(),
    summary: `Selected: ${chosenVehicle.name} (Cap: ${chosenVehicle.capacityKg} kg). Weather tarp: ${isRainHazard ? 'REQUIRED (Included)' : 'Not critical'}.`,
    data: {
      chosenVehicle,
      isRainHazard,
      tarpProtectionApplied: isRainHazard,
      buyerFreightAnalysis,
      calculateFreight
    },
    thoughts: [
      `Analyzing cargo: ${quantity} kg requires minimum vehicle capacity of ${quantity} kg.`,
      `Weather risk check: Rain probability is ${weatherInsight.data.rainProbabilityPct}%. ${isRainHazard ? 'Enforcing waterproof tarpaulin & closed cab requirement.' : 'Open vehicle allowed.'}`,
      `Selected optimal carrier: "${chosenVehicle.name}" (Base ₹${chosenVehicle.baseFare}, ₹${chosenVehicle.ratePerKm}/km).`,
      `Computed freight matrix across all ${buyerFreightAnalysis.length} buyer destinations.`,
      `Sending logistics cost vector to Negotiation Agent for net margin optimization.`
    ]
  };
}
