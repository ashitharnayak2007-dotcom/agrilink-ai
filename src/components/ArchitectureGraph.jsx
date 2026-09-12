import React, { useState } from 'react';

export default function ArchitectureGraph({ onStartRun }) {
  const [activeNode, setActiveNode] = useState('orchestrator');

  const nodeDetails = {
    farmer: {
      title: '👨‍🌾 Farmer Persona',
      badge: 'Input Origin',
      desc: 'Smallholder farmer with a specific crop quantity, location, harvest timeline, and storage constraints. Submits request via SMS, voice, or Web App.',
      exchanges: 'Sends: Produce specifications (e.g. 500kg Tomatoes in Shivamogga)'
    },
    webapp: {
      title: '🌐 Web Application UI',
      badge: 'Interface Layer',
      desc: 'Frontend interface that validates farmer input, presents 1-click test scenarios, renders real-time multi-agent execution status, and displays the final explainable decision dashboard.',
      exchanges: 'Receives form data, dispatches async request to Orchestrator Agent.'
    },
    orchestrator: {
      title: '🧠 Orchestrator Agent',
      badge: 'Central Swarm Manager',
      desc: 'Deconstructs the farmer problem into independent sub-tasks, dispatches work sequentially to specialized agents, aggregates intermediate insights, and handles fault recovery.',
      exchanges: 'Routes payloads between Crop, Weather, Market, Storage, Logistics, Negotiation, and Decision agents.'
    },
    weather: {
      title: '🌦️ Weather Agent',
      badge: 'Sensory & Risk Intelligence',
      desc: 'Analyzes regional 72-hour rain probability, atmospheric humidity, squall alerts, and open-field rot danger. Directly informs transit viability and holding safety.',
      exchanges: 'Sends: Rain risk rating, 3-day weather hazards, transit route viability.'
    },
    market: {
      title: '💰 Market Agent',
      badge: 'Price Discovery Engine',
      desc: 'Surveys licensed APMC mandis, private supermarket aggregators, and local farmgate collectors within regional radius. Extracts current bids, minimum quantities, and buyer payment terms.',
      exchanges: 'Sends: Candidate buyer quote list, base mandi index rates.'
    },
    crop: {
      title: '🌾 Crop Agent',
      badge: 'Biological Profile Engine',
      desc: 'Evaluates biological characteristics: perishability rating (High/Med/Low), ambient shelf-life deterioration curve, daily spoilage loss, and moisture vulnerability.',
      exchanges: 'Sends: Perishability rating, urgency score (1-10), packaging standards.'
    },
    storage: {
      title: '🏪 Storage Agent',
      badge: 'Asset Preservation Engine',
      desc: 'Scans accredited cold chains, pre-cooling units, and dry godowns. Calculates daily holding tariffs and the price appreciation required to break even.',
      exchanges: 'Sends: Recommended holding duration, daily storage cost, spoilage reduction %.'
    },
    logistics: {
      title: '🚚 Logistics Agent',
      badge: 'Fleet & Transit Optimizer',
      desc: 'Selects the right vehicle (Tractor trolley, Tata Ace, Pickup, Commercial truck) based on load weight. Enforces tarpaulin covers when weather risk is elevated and computes accurate freight costs.',
      exchanges: 'Sends: Vehicle assignment, freight cost vector per destination.'
    },
    negotiation: {
      title: '🤝 Negotiation & Trade-Off Agent',
      badge: 'Arbitration Intelligence',
      desc: 'Evaluates the true net return: Net = Price × Qty - Transport - Storage. Prevents farmers from falling for distant buyers whose high gross prices are eaten by freight expenses.',
      exchanges: 'Sends: Ranked buyers based on true net profit, identified price-freight trade-offs.'
    },
    decision: {
      title: '🧠 Decision Agent',
      badge: 'Strategy Synthesis Engine',
      desc: 'Consolidates all agent inputs into an optimal split strategy (Sell Now vs Store), selects primary buyer, allocates logistics, and generates the transparent "Why This Decision?" explainability matrix.',
      exchanges: 'Sends: Final split numbers, net profit realization, explainability matrix.'
    },
    recommendation: {
      title: '📊 Final Recommendation',
      badge: 'Actionable Output',
      desc: 'Delivered to farmer in plain vernacular terms, with single-tap buyer call button, transport instructions, and WhatsApp/SMS summary.',
      exchanges: 'Actionable instructions ready for execution.'
    }
  };

  const selected = nodeDetails[activeNode] || nodeDetails.orchestrator;

  return (
    <div className="architecture-graph-container">
      {/* Header */}
      <div className="arch-header">
        <div className="arch-title-group">
          <span className="arch-icon">🧠</span>
          <div>
            <h2>AgriLink AI Multi-Agent Architecture</h2>
            <p>
              Autonomous swarm coordination: Specialized agents interact and exchange live payloads to solve the farmer's multi-variable optimization problem.
            </p>
          </div>
        </div>
        {onStartRun && (
          <button type="button" className="btn-primary" onClick={onStartRun}>
            ⚡ Run Multi-Agent Swarm
          </button>
        )}
      </div>

      <div className="arch-layout-grid">
        {/* Visual Graph Area matching prompt diagram */}
        <div className="arch-graph-canvas">
          <div className="arch-diagram-flow">
            {/* Level 1: Farmer */}
            <div className="diagram-level">
              <div 
                className={`graph-node node-farmer ${activeNode === 'farmer' ? 'active' : ''}`}
                onClick={() => setActiveNode('farmer')}
              >
                <div className="node-icon">👨‍🌾</div>
                <div className="node-title">FARMER</div>
                <div className="node-sub">Harvest Input & Constraints</div>
              </div>
            </div>

            <div className="diagram-connector-down">↓</div>

            {/* Level 2: Web App */}
            <div className="diagram-level">
              <div 
                className={`graph-node node-webapp ${activeNode === 'webapp' ? 'active' : ''}`}
                onClick={() => setActiveNode('webapp')}
              >
                <div className="node-icon">🌐</div>
                <div className="node-title">WEB APPLICATION</div>
                <div className="node-sub">Form & Swarm Dashboard</div>
              </div>
            </div>

            <div className="diagram-connector-down">↓</div>

            {/* Level 3: Orchestrator */}
            <div className="diagram-level">
              <div 
                className={`graph-node node-orchestrator ${activeNode === 'orchestrator' ? 'active' : ''}`}
                onClick={() => setActiveNode('orchestrator')}
              >
                <div className="node-icon">🧠</div>
                <div className="node-title">ORCHESTRATOR AGENT</div>
                <div className="node-sub">Pipeline Manager & Swarm Bus</div>
              </div>
            </div>

            <div className="diagram-branch-connector">
              <div className="branch-line-h"></div>
              <div className="branch-arrows-row">
                <span>↓</span>
                <span>↓</span>
                <span>↓</span>
              </div>
            </div>

            {/* Level 4: Parallel Triad (Weather, Market, Crop) */}
            <div className="diagram-level triad-level">
              <div 
                className={`graph-node node-triad ${activeNode === 'weather' ? 'active' : ''}`}
                onClick={() => setActiveNode('weather')}
              >
                <div className="node-icon">🌦️</div>
                <div className="node-title">Weather Agent</div>
                <div className="node-sub">Rain & Transit Hazard</div>
              </div>

              <div 
                className={`graph-node node-triad ${activeNode === 'market' ? 'active' : ''}`}
                onClick={() => setActiveNode('market')}
              >
                <div className="node-icon">💰</div>
                <div className="node-title">Market Agent</div>
                <div className="node-sub">Mandi Prices & Buyers</div>
              </div>

              <div 
                className={`graph-node node-triad ${activeNode === 'crop' ? 'active' : ''}`}
                onClick={() => setActiveNode('crop')}
              >
                <div className="node-icon">🌾</div>
                <div className="node-title">Crop Agent</div>
                <div className="node-sub">Perishability & Shelf Life</div>
              </div>
            </div>

            <div className="diagram-branch-connector">
              <div className="branch-arrows-row">
                <span>↓</span>
                <span>↓</span>
                <span>↓</span>
              </div>
              <div className="branch-line-h"></div>
            </div>

            <div className="diagram-connector-down">↓</div>

            {/* Level 5: Storage Agent */}
            <div className="diagram-level">
              <div 
                className={`graph-node ${activeNode === 'storage' ? 'active' : ''}`}
                onClick={() => setActiveNode('storage')}
              >
                <div className="node-icon">🏪</div>
                <div className="node-title">Storage Agent</div>
                <div className="node-sub">Capacity & Holding ROI</div>
              </div>
            </div>

            <div className="diagram-connector-down">↓</div>

            {/* Level 6: Logistics Agent */}
            <div className="diagram-level">
              <div 
                className={`graph-node ${activeNode === 'logistics' ? 'active' : ''}`}
                onClick={() => setActiveNode('logistics')}
              >
                <div className="node-icon">🚚</div>
                <div className="node-title">Logistics Agent</div>
                <div className="node-sub">Vehicle Selection & Freight Matrix</div>
              </div>
            </div>

            <div className="diagram-connector-down">↓</div>

            {/* Level 7: Negotiation Agent */}
            <div className="diagram-level">
              <div 
                className={`graph-node ${activeNode === 'negotiation' ? 'active' : ''}`}
                onClick={() => setActiveNode('negotiation')}
              >
                <div className="node-icon">🤝</div>
                <div className="node-title">Negotiation Agent</div>
                <div className="node-sub">Net Profit Arbitration (Price vs Transport)</div>
              </div>
            </div>

            <div className="diagram-connector-down">↓</div>

            {/* Level 8: Decision Agent */}
            <div className="diagram-level">
              <div 
                className={`graph-node ${activeNode === 'decision' ? 'active' : ''}`}
                onClick={() => setActiveNode('decision')}
              >
                <div className="node-icon">🧠</div>
                <div className="node-title">Decision Agent</div>
                <div className="node-sub">Optimal Strategy & Explainability Matrix</div>
              </div>
            </div>

            <div className="diagram-connector-down">↓</div>

            {/* Level 9: Final Recommendation */}
            <div className="diagram-level">
              <div 
                className={`graph-node node-recommendation ${activeNode === 'recommendation' ? 'active' : ''}`}
                onClick={() => setActiveNode('recommendation')}
              >
                <div className="node-icon">📊</div>
                <div className="node-title">FINAL RECOMMENDATION</div>
                <div className="node-sub">Sell vs Store Split & Farmer Action Plan</div>
              </div>
            </div>
          </div>
        </div>

        {/* Node Inspection Panel */}
        <div className="arch-inspector-panel">
          <div className="inspector-card">
            <div className="inspector-badge">{selected.badge}</div>
            <h3 className="inspector-title">{selected.title}</h3>
            <div className="inspector-desc">{selected.desc}</div>

            <div className="inspector-exchanges">
              <div className="exchange-label">Information Exchange:</div>
              <div className="exchange-box">{selected.exchanges}</div>
            </div>

            <div className="judge-callout-box">
              <strong>💡 Hackathon Judge Note:</strong>
              <p>
                "The agents don't work independently. They exchange information and contribute to one final decision."
              </p>
              <ul>
                <li>Weather Agent warns about rain → Logistics Agent enforces tarp covers and Storage Agent calculates rot risks.</li>
                <li>Market Agent gets top bidder → Negotiation Agent checks distance to verify if freight will eat the profit.</li>
                <li>Decision Agent balances perishability with storage tariffs to calculate the exact Sell Now vs Store kg split.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
