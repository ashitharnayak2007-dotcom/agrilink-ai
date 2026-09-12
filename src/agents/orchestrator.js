import { runCropAgent } from './cropAgent';
import { runWeatherAgent } from './weatherAgent';
import { runMarketAgent } from './marketAgent';
import { runStorageAgent } from './storageAgent';
import { runLogisticsAgent } from './logisticsAgent';
import { runNegotiationAgent } from './negotiationAgent';
import { runDecisionAgent } from './decisionAgent';

export const AGENT_PIPELINE_STAGES = [
  { id: 'orchestrator-init', name: 'Orchestrator Agent', icon: '🧠', role: 'Decomposes task & sets communication bus' },
  { id: 'crop-agent', name: 'Crop Agent', icon: '🌾', role: 'Evaluates perishability & harvest urgency' },
  { id: 'weather-agent', name: 'Weather Agent', icon: '🌦️', role: 'Analyzes rainfall, spoilage & transit hazards' },
  { id: 'market-agent', name: 'Market Agent', icon: '💰', role: 'Queries mandi prices & buyer networks' },
  { id: 'storage-agent', name: 'Storage Agent', icon: '🏪', role: 'Evaluates cold chain holding economics' },
  { id: 'logistics-agent', name: 'Logistics Agent', icon: '🚚', role: 'Optimizes fleet carriers & freight costs' },
  { id: 'negotiation-agent', name: 'Negotiation Agent', icon: '🤝', role: 'Arbitrates net profit vs gross price' },
  { id: 'decision-agent', name: 'Decision Agent', icon: '🎯', role: 'Synthesizes final strategy & explainability matrix' },
];

/**
 * Execute the autonomous multi-agent pipeline step by step.
 * Allows step callback for real-time visual demonstration.
 */
export async function runOrchestratorPipeline(farmerInput, onProgressUpdate, stepDelayMs = 600) {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const traces = [];
  const completedAgents = [];

  const recordTrace = (source, target, message, payload = null) => {
    const entry = {
      id: `trace-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString(),
      source,
      target,
      message,
      payload
    };
    traces.push(entry);
    return entry;
  };

  // Step 0: Orchestrator initialization
  recordTrace(
    'Farmer',
    'Orchestrator Agent',
    `Farmer Request: "${farmerInput.quantityKg} kg ${farmerInput.crop} in ${farmerInput.location} (${farmerInput.harvestTiming}). Find best selling strategy."`
  );

  const initStep = {
    agentId: 'orchestrator-init',
    agentName: 'Orchestrator Agent',
    icon: '🧠',
    status: 'COMPLETED',
    timestamp: new Date().toLocaleTimeString(),
    summary: `Orchestrator initialized. Decomposing problem into 7 specialized sub-agents.`,
    data: { farmerInput },
    thoughts: [
      `Parsing farmer query: Crop=${farmerInput.crop}, Qty=${farmerInput.quantityKg} kg, Location=${farmerInput.location}.`,
      `Establishing inter-agent communication pipeline: Crop → Weather → Market → Storage → Logistics → Negotiation → Decision.`,
      `Delegating Stage 1 to Crop Agent.`
    ]
  };
  completedAgents.push(initStep);
  if (onProgressUpdate) onProgressUpdate(0, initStep, [...traces]);
  await delay(stepDelayMs);

  // Step 1: Crop Agent
  recordTrace('Orchestrator Agent', 'Crop Agent', `Query: Profile ${farmerInput.crop} biological attributes and urgency.`);
  const cropInsight = runCropAgent(farmerInput);
  completedAgents.push(cropInsight);
  recordTrace('Crop Agent', 'Orchestrator Agent', `Insight: Perishability is ${cropInsight.data.perishabilityRating}, shelf life ${cropInsight.data.baseShelfLifeDays} days.`, cropInsight.data);
  if (onProgressUpdate) onProgressUpdate(1, cropInsight, [...traces]);
  await delay(stepDelayMs);

  // Step 2: Weather Agent
  recordTrace('Orchestrator Agent', 'Weather Agent', `Query: Check forecast for ${farmerInput.location} with focus on ${cropInsight.data.cropName} moisture risks.`);
  const weatherInsight = runWeatherAgent(farmerInput, cropInsight);
  completedAgents.push(weatherInsight);
  recordTrace('Weather Agent', 'Orchestrator Agent', `Insight: Weather risk is ${weatherInsight.data.riskLevel} (${weatherInsight.data.rainProbabilityPct}% rain probability).`, weatherInsight.data);
  if (onProgressUpdate) onProgressUpdate(2, weatherInsight, [...traces]);
  await delay(stepDelayMs);

  // Step 3: Market Agent
  recordTrace('Orchestrator Agent', 'Market Agent', `Query: Query registered buyers and mandi benchmarks in ${farmerInput.location}.`);
  const marketInsight = runMarketAgent(farmerInput, cropInsight);
  completedAgents.push(marketInsight);
  recordTrace('Market Agent', 'Orchestrator Agent', `Insight: Found ${marketInsight.data.buyers.length} buyers. Top bid: ₹${marketInsight.data.highestBidBuyer.offeredRatePerKg}/kg.`, marketInsight.data);
  if (onProgressUpdate) onProgressUpdate(3, marketInsight, [...traces]);
  await delay(stepDelayMs);

  // Step 4: Storage Agent
  recordTrace('Orchestrator Agent', 'Storage Agent', `Query: Evaluate holding facility costs and break-even viability for ${cropInsight.data.cropName}.`);
  const storageInsight = runStorageAgent(farmerInput, cropInsight, weatherInsight);
  completedAgents.push(storageInsight);
  recordTrace('Storage Agent', 'Orchestrator Agent', `Insight: Storage feasibility is ${storageInsight.data.isFeasible ? 'CONFIRMED' : 'REJECTED'}.`, storageInsight.data);
  if (onProgressUpdate) onProgressUpdate(4, storageInsight, [...traces]);
  await delay(stepDelayMs);

  // Step 5: Logistics Agent
  recordTrace('Orchestrator Agent', 'Logistics Agent', `Query: Select freight vehicle and compute transit fees given weather risk (${weatherInsight.data.riskLevel}).`);
  const logisticsInsight = runLogisticsAgent(farmerInput, weatherInsight, marketInsight);
  completedAgents.push(logisticsInsight);
  recordTrace('Logistics Agent', 'Orchestrator Agent', `Insight: Assigned ${logisticsInsight.data.chosenVehicle.name}. Weather tarp enforced: ${logisticsInsight.data.tarpProtectionApplied}.`, logisticsInsight.data);
  if (onProgressUpdate) onProgressUpdate(5, logisticsInsight, [...traces]);
  await delay(stepDelayMs);

  // Step 6: Negotiation Agent
  recordTrace('Orchestrator Agent', 'Negotiation Agent', `Query: Arbitrate trade-offs between gross price and freight deductions.`);
  const negotiationInsight = runNegotiationAgent(farmerInput, marketInsight, logisticsInsight, storageInsight);
  completedAgents.push(negotiationInsight);
  recordTrace('Negotiation Agent', 'Orchestrator Agent', `Insight: Selected optimal buyer "${negotiationInsight.data.bestNetBuyer.buyerName}" delivering max net ₹${negotiationInsight.data.bestNetBuyer.effectiveNetRatePerKg}/kg.`, negotiationInsight.data);
  if (onProgressUpdate) onProgressUpdate(6, negotiationInsight, [...traces]);
  await delay(stepDelayMs);

  // Step 7: Decision Agent
  recordTrace('Orchestrator Agent', 'Decision Agent', `Query: Synthesize all agent intelligence into final split-action strategy.`);
  const decisionInsight = runDecisionAgent(farmerInput, cropInsight, weatherInsight, marketInsight, storageInsight, logisticsInsight, negotiationInsight);
  completedAgents.push(decisionInsight);
  recordTrace('Decision Agent', 'Farmer / Dashboard', `Final Strategy: ${decisionInsight.summary}`, decisionInsight.data);
  if (onProgressUpdate) onProgressUpdate(7, decisionInsight, [...traces]);

  return {
    farmerInput,
    completedAgents,
    traces,
    insights: {
      crop: cropInsight,
      weather: weatherInsight,
      market: marketInsight,
      storage: storageInsight,
      logistics: logisticsInsight,
      negotiation: negotiationInsight,
      decision: decisionInsight
    }
  };
}
