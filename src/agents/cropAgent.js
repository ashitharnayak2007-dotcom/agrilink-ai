import { CROPS } from '../data/agriculturalData';

/**
 * 🌾 Crop Agent
 * Analyzes crop biological characteristics, shelf life window,
 * perishability risk index, and selling urgency.
 */
export function runCropAgent(input) {
  const cropMeta = CROPS[input.crop] || CROPS.Tomato;
  const quantity = Number(input.quantityKg) || 100;
  
  let urgencyScore = 5; // 1-10 scale
  let urgencyLabel = 'MODERATE';
  
  if (cropMeta.perishabilityRating === 'HIGH') {
    urgencyScore = input.harvestTiming === 'Ready Today' ? 9.5 : 8.0;
    urgencyLabel = 'CRITICAL - IMMEDIATE ATTENTION';
  } else if (cropMeta.perishabilityRating === 'MEDIUM') {
    urgencyScore = 6.0;
    urgencyLabel = 'MODERATE';
  } else {
    urgencyScore = 3.0;
    urgencyLabel = 'LOW - STABLE SHELF LIFE';
  }

  // Estimated daily spoilage loss if kept open at ambient temp
  const dailySpoilageRate = cropMeta.spoilagePerDayPct;
  const potentialLossPerDayKg = Math.round((quantity * dailySpoilageRate) / 100);

  return {
    agentId: 'crop-agent',
    agentName: 'Crop Agent',
    icon: '🌾',
    status: 'COMPLETED',
    timestamp: new Date().toLocaleTimeString(),
    summary: `${cropMeta.name}: ${cropMeta.perishabilityRating} perishability. Urgency score: ${urgencyScore}/10.`,
    data: {
      cropName: cropMeta.name,
      category: cropMeta.category,
      baseShelfLifeDays: cropMeta.baseShelfLifeDays,
      perishabilityRating: cropMeta.perishabilityRating,
      urgencyScore,
      urgencyLabel,
      standardRatePerKg: cropMeta.standardRatePerKg,
      dailySpoilageRatePct: dailySpoilageRate,
      potentialLossPerDayKg,
      coldStorageFeasible: cropMeta.coldStorageFeasible,
      packagingUnit: cropMeta.packagingUnit,
      moistureSensitivity: cropMeta.moistureSensitivity
    },
    thoughts: [
      `Assessing biological profile for ${quantity} kg of ${cropMeta.name}.`,
      `Perishability rating is ${cropMeta.perishabilityRating} with ${cropMeta.baseShelfLifeDays} days ambient shelf-life.`,
      `Urgency calculated at ${urgencyScore}/10 (${urgencyLabel}). Daily ambient spoilage risk is ~${dailySpoilageRate}% (${potentialLossPerDayKg} kg/day).`,
      cropMeta.coldStorageFeasible 
        ? `Cold storage is biologically viable up to ${cropMeta.maxStorageDays} days.` 
        : `Cold storage not required/recommended for this dry commodity.`
    ]
  };
}
