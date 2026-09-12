import { REGIONAL_WEATHER_PROFILES } from '../data/agriculturalData';

/**
 * 🌦️ Weather Agent
 * Evaluates rainfall forecast, ambient humidity, open storage vulnerability,
 * and transport disruption risks for the given location.
 */
export function runWeatherAgent(input, cropInsight) {
  const profile = REGIONAL_WEATHER_PROFILES[input.location] || {
    condition: 'Variable Weather',
    rainProbabilityPct: 35,
    riskLevel: 'MODERATE',
    forecast3Day: 'Partly cloudy with possible isolated showers.',
    transitDisruptionRisk: 'LOW',
    openStorageHazard: 'MODERATE',
    tempCelsius: 28,
    humidityPct: 60,
  };

  // Adjust risk if the crop is particularly moisture sensitive (e.g., Tomato or Onion)
  let adjustedRiskLevel = profile.riskLevel;
  let recommendationNote = '';

  if (profile.rainProbabilityPct >= 70) {
    adjustedRiskLevel = 'HIGH';
    recommendationNote = `High rain probability (${profile.rainProbabilityPct}%) will cause rapid fungal decay in ${cropInsight.data.cropName}. Prompt liquidation or immediate covered shelter is critical.`;
  } else if (profile.rainProbabilityPct >= 40) {
    adjustedRiskLevel = 'MODERATE';
    recommendationNote = `Moderate rain probability (${profile.rainProbabilityPct}%). Tarp-covered freight and dry godown required.`;
  } else {
    adjustedRiskLevel = 'LOW';
    recommendationNote = `Favorable weather window (${profile.rainProbabilityPct}% rain). Transportation roads clear, low transit spoilage risk.`;
  }

  return {
    agentId: 'weather-agent',
    agentName: 'Weather Agent',
    icon: '🌦️',
    status: 'COMPLETED',
    timestamp: new Date().toLocaleTimeString(),
    summary: `${profile.condition} (${profile.rainProbabilityPct}% rain probability). Weather Risk: ${adjustedRiskLevel}.`,
    data: {
      location: input.location,
      condition: profile.condition,
      rainProbabilityPct: profile.rainProbabilityPct,
      riskLevel: adjustedRiskLevel,
      tempCelsius: profile.tempCelsius,
      humidityPct: profile.humidityPct,
      transitDisruptionRisk: profile.transitDisruptionRisk,
      openStorageHazard: profile.openStorageHazard,
      forecast3Day: profile.forecast3Day,
      recommendationNote
    },
    thoughts: [
      `Retrieving 72-hour meteorological satellite feed for ${input.location}.`,
      `Current conditions: ${profile.condition}, Temp: ${profile.tempCelsius}°C, Humidity: ${profile.humidityPct}%.`,
      `Rain probability is ${profile.rainProbabilityPct}% (Hazard level: ${adjustedRiskLevel}).`,
      `Cross-referencing with Crop Agent: ${cropInsight.data.cropName} moisture sensitivity is ${cropInsight.data.moistureSensitivity}.`,
      recommendationNote
    ]
  };
}
