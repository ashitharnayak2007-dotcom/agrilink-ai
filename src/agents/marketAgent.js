import { BUYERS_BY_LOCATION } from '../data/agriculturalData';

/**
 * 💰 Market Agent
 * Queries candidate buyers, compares quoted prices, distances,
 * payment terms, and buyer reliability.
 */
export function runMarketAgent(input, cropInsight) {
  const buyersList = BUYERS_BY_LOCATION[input.location] || BUYERS_BY_LOCATION.Shivamogga;
  const baseRate = cropInsight.data.standardRatePerKg;
  const farmerQty = Number(input.quantityKg) || 100;

  const analyzedBuyers = buyersList.map(buyer => {
    const offeredRate = Math.max(5, baseRate + buyer.priceOffset);
    const grossPotentialRevenue = offeredRate * farmerQty;
    const meetsMinQty = farmerQty >= buyer.minQuantityKg;

    return {
      ...buyer,
      offeredRatePerKg: offeredRate,
      grossPotentialRevenue,
      meetsMinQty,
      priceDifferenceFromBase: buyer.priceOffset,
    };
  });

  // Sort by offered rate descending
  analyzedBuyers.sort((a, b) => b.offeredRatePerKg - a.offeredRatePerKg);

  const highestOffer = analyzedBuyers[0];
  const lowestDistance = [...analyzedBuyers].sort((a, b) => a.distanceKm - b.distanceKm)[0];

  return {
    agentId: 'market-agent',
    agentName: 'Market Agent',
    icon: '💰',
    status: 'COMPLETED',
    timestamp: new Date().toLocaleTimeString(),
    summary: `Found ${analyzedBuyers.length} buyers in ${input.location} radius. Quoted rates: ₹${analyzedBuyers[analyzedBuyers.length - 1].offeredRatePerKg} - ₹${highestOffer.offeredRatePerKg}/kg.`,
    data: {
      baseMarketRate: baseRate,
      buyers: analyzedBuyers,
      highestBidBuyer: highestOffer,
      nearestBuyer: lowestDistance,
    },
    thoughts: [
      `Scanning mandi feeds and licensed commission agents around ${input.location}.`,
      `Benchmark commodity rate for ${cropInsight.data.cropName} is ₹${baseRate}/kg.`,
      `Highest nominal bid: "${highestOffer.name}" at ₹${highestOffer.offeredRatePerKg}/kg (${highestOffer.distanceKm} km away).`,
      `Nearest buyer: "${lowestDistance.name}" at ₹${lowestDistance.offeredRatePerKg}/kg (${lowestDistance.distanceKm} km away).`,
      `Passing all candidate quotes to Logistics and Negotiation agents for true net margin computation.`
    ]
  };
}
