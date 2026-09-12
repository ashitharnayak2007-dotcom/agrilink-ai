import React, { useState } from 'react';

export default function Navbar({
  activeTab,
  setActiveTab,
  onSelectPreset,
  presets,
  colabUrl,
  setColabUrl
}) {
  const [showColabModal, setShowColabModal] = useState(false);
  const [tempUrl, setTempUrl] = useState(colabUrl || '');

  const handleSaveColab = (e) => {
    e.preventDefault();
    setColabUrl(tempUrl.trim());
    setShowColabModal(false);
  };

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
        {/* Colab Connection Button */}
        <button
          type="button"
          className={`btn-colab-connect ${colabUrl ? 'connected' : ''}`}
          onClick={() => setShowColabModal(true)}
          title="Connect live Google Colab Python backend"
        >
          <span className="colab-dot"></span>
          <span>{colabUrl ? 'Colab Connected' : 'Connect Colab'}</span>
        </button>

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

      {/* Colab Settings Modal */}
      {showColabModal && (
        <div className="modal-overlay" onClick={() => setShowColabModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🔗 Connect Google Colab Python Backend</h3>
              <button className="btn-close-modal" onClick={() => setShowColabModal(false)}>✕</button>
            </div>
            <p className="modal-desc">
              Paste your public Ngrok or Localtunnel URL generated from your Google Colab notebook (e.g., <code>https://your-tunnel.ngrok-free.dev</code>).
            </p>
            <form onSubmit={handleSaveColab}>
              <div className="modal-input-wrap">
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://empathy-rinsing-obliged.ngrok-free.dev"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                />
              </div>
              <div className="modal-actions">
                {colabUrl && (
                  <button
                    type="button"
                    className="btn-disconnect"
                    onClick={() => {
                      setColabUrl('');
                      setTempUrl('');
                      setShowColabModal(false);
                    }}
                  >
                    Disconnect
                  </button>
                )}
                <button type="button" className="btn-outline" onClick={() => setShowColabModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save & Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
