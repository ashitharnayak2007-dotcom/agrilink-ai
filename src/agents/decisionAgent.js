/**
 * 🧠 Decision Agent
 * Synthesizes all agent outputs (Crop, Weather, Market, Storage, Logistics, Negotiation)
 * into a definitive, actionable split-selling strategy with complete financial breakdown
 * and an explainable decision factor matrix.
 */
export function runDecisionAgent(input, cropInsight, weatherInsight, marketInsight, storageInsight, logisticsInsight, negotiationInsight) {
  const totalQty = Number(input.quantityKg) || 100;
  const bestBuyer = negotiationInsight.data.bestNetBuyer;
  const weatherRisk = weatherInsight.data.riskLevel;
  const perishability = cropInsight.data.perishabilityRating;
  const storageFeasible = storageInsight.data.isFeasible && storageInsight.data.recommended;

  // Determine Optimal Split: Sell Now vs Store
  let sellNowQty = totalQty;
  let storeQty = 0;
  let storageDays = 0;
  let estimatedStorageCost = 0;
  let splitReason = '';

  if (!storageFeasible) {
    sellNowQty = totalQty;
    storeQty = 0;
    splitReason = weatherRisk === 'HIGH'
      ? `Heavy rainfall (${weatherInsight.data.rainProbabilityPct}%) and high perishability make holding risky. Immediate 100% liquidation preserves crop value and prevents mold rot.`
      : `Selling 100% now avoids warehouse fees (₹${storageInsight.data.totalHoldingCost || 0}) and maximizes immediate cash flow.`;
  } else {
    // Storage is feasible and recommended
    if (perishability === 'HIGH' && weatherRisk === 'HIGH') {
      // 70% sell now, 30% buffer store in cold storage
      sellNowQty = Math.round(totalQty * 0.7);
      storeQty = totalQty - sellNowQty;
      storageDays = 4;
      estimatedStorageCost = Math.round(storeQty * (storageInsight.data.dailyRatePerKg || 1.8) * storageDays);
      splitReason = `Heavy rainfall expected (${weatherInsight.data.rainProbabilityPct}%). Liquidating ${sellNowQty} kg immediately avoids open rot risk, while buffering ${storeQty} kg in cold storage protects against mandi distress firesale.`;
    } else if (perishability === 'LOW' || input.priority === 'maximize_profit') {
      // Storable crop (e.g. Potato/Onion) with low weather hazard
      sellNowQty = Math.round(totalQty * 0.3);
      storeQty = totalQty - sellNowQty;
      storageDays = 7;
      estimatedStorageCost = Math.round(storeQty * (storageInsight.data.dailyRatePerKg || 1.0) * storageDays);
      splitReason = `Low perishability and dry weather permit strategic holding. Storing ${storeQty} kg for ${storageDays} days positions you for upcoming wholesale price surge (+₹4-6/kg) while liquidating ${sellNowQty} kg meets working capital needs.`;
    } else {
      // Balanced split
      sellNowQty = Math.round(totalQty * 0.7);
      storeQty = totalQty - sellNowQty;
      storageDays = 5;
      estimatedStorageCost = Math.round(storeQty * (storageInsight.data.dailyRatePerKg || 1.5) * storageDays);
      splitReason = `Balanced risk hedge: Liquidating ${sellNowQty} kg today covers immediate freight and wages, while reserving ${storeQty} kg in storage capitalizes on peak weekend market volume.`;
    }
  }

  // Financial calculations
  const immediateGrossRevenue = Math.round(sellNowQty * bestBuyer.quotedRatePerKg);
  // Freight for immediate sale
  const chosenVehicle = logisticsInsight.data.chosenVehicle;
  const isFarmgate = bestBuyer.isFarmgate;
  const transportCost = isFarmgate ? 0 : Math.round(chosenVehicle.baseFare + (bestBuyer.distanceKm * chosenVehicle.ratePerKm));
  
  // Future estimated stored produce sale (projected price after holding)
  const projectedPriceAppreciation = storeQty > 0 ? 3.5 : 0; // ₹3.5/kg upside expectation
  const futureStoredRevenue = Math.round(storeQty * (bestBuyer.quotedRatePerKg + projectedPriceAppreciation));
  
  const totalGrossEstimated = immediateGrossRevenue + futureStoredRevenue;
  const totalEstimatedCosts = transportCost + estimatedStorageCost;
  const finalEstimatedNet = totalGrossEstimated - totalEstimatedCosts;

  // Compare against naive baseline (selling at distress to first middleman)
  const naiveDistressRevenue = negotiationInsight.data.naiveDistressSaleRevenue;
  const netGainVsDistress = Math.max(0, finalEstimatedNet - naiveDistressRevenue);

  // Explainability Matrix (Judges requirement)
  const explainabilityFactors = [
    {
      factor: 'Market Price',
      icon: '💰',
      rating: bestBuyer.quotedRatePerKg > marketInsight.data.baseMarketRate ? '+++ (Favorable)' : '+ (Fair)',
      badgeClass: 'badge-success',
      detail: `Negotiated ₹${bestBuyer.quotedRatePerKg}/kg (+₹${bestBuyer.quotedRatePerKg - marketInsight.data.baseMarketRate} above base mandi index).`
    },
    {
      factor: 'Weather Risk',
      icon: '🌦️',
      rating: weatherRisk,
      badgeClass: weatherRisk === 'HIGH' ? 'badge-danger' : weatherRisk === 'MODERATE' ? 'badge-warning' : 'badge-success',
      detail: `${weatherInsight.data.rainProbabilityPct}% rain probability. ${weatherInsight.data.condition}.`
    },
    {
      factor: 'Transport Cost',
      icon: '🚚',
      rating: transportCost <= 600 ? 'LOW' : transportCost <= 1200 ? 'MODERATE' : 'HIGH',
      badgeClass: transportCost <= 600 ? 'badge-success' : 'badge-warning',
      detail: `₹${transportCost} via ${chosenVehicle.name} (${bestBuyer.distanceKm} km). Tarp protected.`
    },
    {
      factor: 'Storage Feasibility',
      icon: '🏪',
      rating: storageFeasible ? 'AVAILABLE & VIABLE' : 'LIMITED / NOT RECOMMENDED',
      badgeClass: storageFeasible ? 'badge-info' : 'badge-neutral',
      detail: storageFeasible 
        ? `${storageInsight.data.selectedFacility?.name} at ₹${storageInsight.data.dailyRatePerKg}/kg/day.` 
        : storageInsight.data.reason
    },
    {
      factor: 'Crop Perishability',
      icon: '🌾',
      rating: perishability,
      badgeClass: perishability === 'HIGH' ? 'badge-danger' : 'badge-success',
      detail: `${cropInsight.data.cropName} shelf life is ${cropInsight.data.baseShelfLifeDays} days (Urgency: ${cropInsight.data.urgencyScore}/10).`
    }
  ];

  return {
    agentId: 'decision-agent',
    agentName: 'Decision Agent',
    icon: '🧠',
    status: 'COMPLETED',
    timestamp: new Date().toLocaleTimeString(),
    summary: `Strategy Approved: Sell ${sellNowQty} kg Now to ${bestBuyer.buyerName}${storeQty > 0 ? `, Store ${storeQty} kg` : ''}. Estimated Net: ₹${finalEstimatedNet.toLocaleString('en-IN')}.`,
    data: {
      planSummary: {
        sellNowKg: sellNowQty,
        storeKg: storeQty,
        storageDays,
        bestBuyer: bestBuyer.buyerName,
        bestBuyerRate: bestBuyer.quotedRatePerKg,
        bestBuyerDistanceKm: bestBuyer.distanceKm,
        bestBuyerContact: marketInsight.data.buyers.find(b => b.id === bestBuyer.buyerId)?.contact || '+91 94481 00000',
        paymentTerm: bestBuyer.paymentTerm,
        vehicleName: chosenVehicle.name,
        transportCost,
        storageCost: estimatedStorageCost,
        finalEstimatedNet,
        netGainVsDistress,
        weatherRisk,
        splitReason
      },
      explainabilityFactors
    },
    thoughts: [
      `Synthesizing inputs from Crop, Weather, Market, Storage, Logistics, and Negotiation agents.`,
      `Optimal decision: Sell ${sellNowQty} kg immediately to "${bestBuyer.buyerName}" @ ₹${bestBuyer.quotedRatePerKg}/kg.`,
      storeQty > 0 
        ? `Allocating ${storeQty} kg to ${storageInsight.data.selectedFacility?.name} for ${storageDays} days.` 
        : `No storage allocation needed. Full batch dispatched to primary buyer.`,
      `Final estimated net take-home realization: ₹${finalEstimatedNet.toLocaleString('en-IN')} (Gain of +₹${netGainVsDistress.toLocaleString('en-IN')} over unassisted distress sale).`,
      `Generated full explainability matrix for farmer dashboard and hackathon presentation.`
    ]
  };
}
