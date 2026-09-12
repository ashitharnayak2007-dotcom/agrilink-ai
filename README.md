# 🌾 AgriLink AI

> **Autonomous Multi-Agent Decision Support System for Smallholder Farmers**  
> *Transforming agricultural selling from guesswork into an optimized, data-driven strategy.*

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![FastAPI Ready](https://img.shields.io/badge/Backend-FastAPI%20%2F%20Colab-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎯 The Core Problem

Smallholder farmers often operate with severe information asymmetry and lack critical market timing intelligence:
- **Where to sell?** (Which APMC mandi or aggregator offers the best rate?)
- **True Net Price:** A buyer 60 km away may quote ₹4 more per kg, but freight expenses eat up the margin.
- **Sell Now vs. Wait:** Will holding produce in storage beat the holding costs?
- **Weather Hazards:** Heavy rainfall or squalls can rot perishable harvests during transit or open godown storage.

**AgriLink AI solves this:**
> *"Given a farmer's harvest parameters, autonomously find the most profitable and low-risk selling strategy using collaborative AI agents."*

---

## 🧠 Multi-Agent Swarm Architecture

The agents do not operate in isolation. They communicate, cross-verify constraints, and pass structured payloads down the decision pipeline:

```
                     👨‍🌾 FARMER
                         ↓
                  🌐 WEB APPLICATION
                         ↓
                 🧠 ORCHESTRATOR AGENT
                         ↓
            ┌────────────┼────────────┐
            ↓            ↓            ↓
       🌦️ Weather    💰 Market     🌾 Crop
          Agent         Agent        Agent
            ↓            ↓            ↓
            └────────────┼────────────┘
                         ↓
                  🏪 Storage Agent
                         ↓
                  🚚 Logistics Agent
                         ↓
                  🤝 Negotiation Agent
                         ↓
                  🧠 Decision Agent
                         ↓
                 📊 FINAL RECOMMENDATION
```

---

## 🤖 Specialized Agents & Responsibilities

| Agent | Icon | Role & Intelligence |
|---|:---:|---|
| **Orchestrator Agent** | 🧠 | Central swarm manager. Decomposes the farmer's query, initializes communication buses, dispatches tasks sequentially, and handles trace logging. |
| **Crop Agent** | 🌾 | Analyzes biological attributes: perishability ratings (High/Med/Low), ambient shelf-life curves, daily spoilage risk %, and selling urgency scores (1–10). |
| **Weather Agent** | 🌦️ | Evaluates 72-hour meteorological radar feeds, rain probabilities, atmospheric humidity, squall alerts, and open-storage hazards. |
| **Market Agent** | 💰 | Surveys registered APMC mandis, private supermarket hubs, and farmgate collectors within regional radius to discover candidate buyer bids and payment terms. |
| **Storage Agent** | 🏪 | Scans cold chains and dry warehouses, calculating daily storage tariffs and the break-even price appreciation required to justify holding. |
| **Logistics Agent** | 🚚 | Selects the optimal carrier fleet (Tractor trolley, Tata Ace, Pickup, 14ft Truck), enforces tarpaulin covers when rain hazard is elevated, and calculates distance-based freight. |
| **Negotiation Agent** | 🤝 | **True Net Margin Arbitration**: Evaluates $\text{Net} = (\text{Price} \times \text{Qty}) - \text{Transport} - \text{Storage}$ across all buyers to expose nominal high bids that are unprofitable after freight. |
| **Decision Agent** | 🎯 | Synthesizes all agent constraints into a concrete **Sell Now vs. Store** split, primary buyer selection, and the transparent **"Why This Decision?"** explainability matrix. |

---

## ✨ Key Features

1. **👨‍🌾 1-Click Hackathon Demo Presets:**
   - `🌧️ Shivamogga Tomato Monsoon Emergency`: High perishability, 82% rain hazard, cold storage buffer.
   - `📈 Kolar Potato Price Surge Arbitrage`: Low perishability, dry weather, price appreciation hedge.
   - `🚚 Mandya Onion Distance Dilemma`: High-bidding distant buyer vs. local farmgate collector trade-off.
2. **🤖 Live Multi-Agent Swarm Tracker:**
   - Real-time status badges (`✓ Completed`, `⟳ Analyzing...`, `○ Waiting`).
   - Inner thought logs and telemetry inspector for every agent.
   - Live inter-agent communication message bus.
3. **📊 Explainable Recommendation Dashboard:**
   - Split Strategy: `SELL NOW: 350 kg` | `STORE: 150 kg`.
   - Full Financial Ledger: Rupee-by-rupee breakdown of gross income, transport deduction, storage fees, and net realization.
   - **"Why this decision?" Matrix**: Evaluates Market Price, Weather Risk, Freight, Storage ROI, and Perishability.
   - **WhatsApp / SMS Card**: Single-click copyable vernacular summary ready for farmer mobile dispatch.
4. **🧠 Interactive System Graph:**
   - Visual flowchart of the agent communication topology with interactive node inspection.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite 8, Modern Vanilla CSS (No heavy framework dependencies, responsive design).
- **Agent Intelligence:** Modular Autonomous Reasoning Engine (`/src/agents/`).
- **Backend Ready:** Compatible with FastAPI, Google Colab (`pyngrok`), and Python multi-agent libraries.
- **Datasets:** Realistic Karnataka agricultural hubs (Shivamogga, Kolar, Mandya, Belagavi, Davanagere).

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/ashitharnayak2007-dotcom/agrilink-ai.git
cd agrilink-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 📁 Project Structure

```
agrilink-ai/
├── public/                     # Static assets & icons
├── src/
│   ├── agents/                 # Autonomous Multi-Agent Logic
│   │   ├── orchestrator.js     # Swarm Manager & Pipeline Coordinator
│   │   ├── cropAgent.js        # Perishability & Biological Urgency
│   │   ├── weatherAgent.js     # Rainfall & Climate Hazard Radar
│   │   ├── marketAgent.js      # Mandi Quotes & APMC Discovery
│   │   ├── storageAgent.js     # Cold Chain & Godown ROI Economics
│   │   ├── logisticsAgent.js   # Fleet Selection & Freight Calculator
│   │   ├── negotiationAgent.js # Net-Profit vs. Freight Arbitration
│   │   └── decisionAgent.js    # Split Strategy & Explainability Matrix
│   ├── components/             # UI Components
│   │   ├── Navbar.jsx          # Header, Tabs & Preset Switcher
│   │   ├── FarmerInputForm.jsx # Input Parameters & 1-Click Scenarios
│   │   ├── AgentPipelineTracker.jsx # Live Swarm Execution Dashboard
│   │   ├── RecommendationDashboard.jsx # Final Strategy & Financial Ledger
│   │   └── ArchitectureGraph.jsx # Interactive System Topology Flowchart
│   ├── data/
│   │   └── agriculturalData.js # Crops, Mandis, Storage, Logistics & Weather Data
│   ├── App.jsx                 # Application Router & State Manager
│   ├── App.css                 # Theme & Visual Styling
│   └── main.jsx                # React DOM Root
├── vercel.json                 # Vercel Deployment Configuration
└── package.json
```

---

## 👥 Hackathon Team Division

- **Frontend & UX:** Responsive Farmer Form, Live Agent Pipeline Tracker, Explainability Dashboard.
- **Agents & Logic:** 7 collaborative agents modeling biological, climatic, and financial trade-offs.
- **Data & Mandi Calibration:** Karnataka market rates, APMC buyer network, and freight fleet tariffs.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
