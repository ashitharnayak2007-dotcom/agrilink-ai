/**
 * 🤝 Negotiation & Trade-Off Agent
 * Arbitrates between gross price offers, freight overhead, distance wear-and-tear,
 * and payment security to determine true net farmer margin.
 */
export function runNegotiationAgent(input, marketInsight, logisticsInsight, _storageInsight) {
  const quantity = Number(input.quantityKg) || 100;
  const buyers = marketInsight.data.buyers;
  const freightAnalysis = logisticsInsight.data.buyerFreightAnalysis;

  // Evaluate each buyer on Net Return = Gross Revenue - Freight
  const buyerArbitration = buyers.map(buyer => {
    const freightItem = freightAnalysis.find(f => f.buyerId === buyer.id) || { freightCost: 500, isFarmgate: false };
    const grossRevenue = buyer.offeredRatePerKg * quantity;
    const transportDeduction = freightItem.freightCost;
    const netRevenue = grossRevenue - transportDeduction;
    const effectiveNetRatePerKg = Number((netRevenue / quantity).toFixed(2));

    // Arbitrated score considering net return + buyer reliability (1-5)
    // 80% weight on net revenue, 20% on reliability score
    const reliabilityBonus = (buyer.reliabilityScore / 5) * (quantity * 1.5);
    const overallAttractivenessScore = Math.round(netRevenue + reliabilityBonus);

    return {
      buyerId: buyer.id,
      buyerName: buyer.name,
      quotedRatePerKg: buyer.offeredRatePerKg,
      grossRevenue,
      transportCost: transportDeduction,
      netRevenue,
      effectiveNetRatePerKg,
      reliabilityScore: buyer.reliabilityScore,
      paymentTerm: buyer.paymentTerm,
      distanceKm: buyer.distanceKm,
      isFarmgate: freightItem.isFarmgate,
      overallAttractivenessScore,
      notes: buyer.notes
    };
  });

  // Rank buyers by true net revenue
  buyerArbitration.sort((a, b) => b.netRevenue - a.netRevenue);

  const bestNetBuyer = buyerArbitration[0];
  const nominalTopBuyer = [...buyerArbitration].sort((a, b) => b.quotedRatePerKg - a.quotedRatePerKg)[0];

  const tradeOffInsight = bestNetBuyer.buyerId === nominalTopBuyer.buyerId
    ? `Highest bidder "${bestNetBuyer.buyerName}" (₹${bestNetBuyer.quotedRatePerKg}/kg) also delivers maximum net return (₹${bestNetBuyer.netRevenue}) even after freight of ₹${bestNetBuyer.transportCost}.`
    : `Caution: Nominal highest bidder "${nominalTopBuyer.buyerName}" (₹${nominalTopBuyer.quotedRatePerKg}/kg) has excessive transport cost of ₹${nominalTopBuyer.transportCost}, yielding net ₹${nominalTopBuyer.netRevenue}. "${bestNetBuyer.buyerName}" yields HIGHER net return of ₹${bestNetBuyer.netRevenue} (₹${bestNetBuyer.effectiveNetRatePerKg}/kg net).`;

  return {
    agentId: 'negotiation-agent',
    agentName: 'Negotiation Agent',
    icon: '🤝',
    status: 'COMPLETED',
    timestamp: new Date().toLocaleTimeString(),
    summary: `Optimal net buyer: "${bestNetBuyer.buyerName}" at Net ₹${bestNetBuyer.effectiveNetRatePerKg}/kg (Total Net: ₹${bestNetBuyer.netRevenue.toLocaleString('en-IN')}).`,
    data: {
      bestNetBuyer,
      nominalTopBuyer,
      buyerRankings: buyerArbitration,
      tradeOffInsight,
      naiveDistressSaleRevenue: Math.round(marketInsight.data.baseMarketRate * 0.9 * quantity), // what a middleman would bully them into
    },
    thoughts: [
      `Initiating multi-variable arbitration for ${quantity} kg produce.`,
      `Comparing ${buyerArbitration.length} candidate buyers on Net Revenue = (Price × Qty) - Transport.`,
      tradeOffInsight,
      `Calculated net realization: ₹${bestNetBuyer.effectiveNetRatePerKg}/kg versus nominal quoted ₹${bestNetBuyer.quotedRatePerKg}/kg.`,
      `Submitting optimized economic dossier to Decision Agent.`
    ]
  };
}
