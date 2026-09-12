import React from 'react';

export default function Navbar({ activeTab, setActiveTab, onSelectPreset, presets }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="logo-icon-wrapper">
          <span className="logo-emoji">🌾</span>
          <span className="logo-pulse"></span>
        </div>
        <div className="brand-text">
          <div className="brand-title">AgriLink <span className="highlight-ai">AI</span></div>
          <div className="brand-subtitle">Autonomous Multi-Agent Farmer Advisory</div>
        </div>
      </div>

      <nav className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'input' ? 'active' : ''}`}
          onClick={() => setActiveTab('input')}
        >
          👨‍🌾 Farmer Input
        </button>
        <button
          className={`nav-tab ${activeTab === 'agents' ? 'active' : ''}`}
          onClick={() => setActiveTab('agents')}
        >
          🤖 Agent Pipeline
        </button>
        <button
          className={`nav-tab ${activeTab === 'recommendation' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommendation')}
        >
          📊 Strategy Plan
        </button>
        <button
          className={`nav-tab ${activeTab === 'architecture' ? 'active' : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          🧠 System Graph
        </button>
      </nav>

      <div className="navbar-actions">
        <div className="preset-dropdown-container">
          <span className="preset-label">⚡ Judge Demos:</span>
          <select 
            className="preset-select"
            onChange={(e) => {
              if (e.target.value) {
                const preset = presets.find(p => p.id === e.target.value);
                if (preset) onSelectPreset(preset);
              }
            }}
            defaultValue=""
          >
            <option value="" disabled>Select Quick Scenario...</option>
            {presets.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>
        <div className="badge-hackathon">
          <span className="dot-live"></span>
          Multi-Agent v1.0
        </div>
      </div>
    </header>
  );
}
