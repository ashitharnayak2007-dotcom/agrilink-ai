import React from 'react';
import { CROPS, LOCATIONS, DEMO_PRESETS } from '../data/agriculturalData';

export default function FarmerInputForm({
  formData,
  setFormData,
  onRunAnalysis,
  isAnalyzing,
  onSelectPreset
}) {
  const selectedCropMeta = CROPS[formData.crop] || CROPS.Tomato;

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="farmer-input-container">
      {/* Quick Scenario Preset Banner for Judges */}
      <div className="preset-banner">
        <div className="preset-banner-header">
          <span className="sparkle-icon">✨</span>
          <strong>1-Click Scenarios for Hackathon Presentation:</strong>
          <span className="preset-hint">Instant test cases with real constraints</span>
        </div>
        <div className="preset-buttons-grid">
          {DEMO_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className="preset-card-btn"
              onClick={() => onSelectPreset(preset)}
            >
              <div className="preset-card-title">{preset.title}</div>
              <div className="preset-card-tag">{preset.tag}</div>
              <div className="preset-card-desc">{preset.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="form-card main-form-card">
        <div className="form-header">
          <div className="form-title-wrap">
            <span className="form-icon">👨‍🌾</span>
            <div>
              <h2 className="form-title">Farmer Input</h2>
              <p className="form-subtitle">Enter your harvest parameters. Our 7 autonomous agents will find your best selling strategy.</p>
            </div>
          </div>
          <div className="status-indicator">
            <span className="pulse-circle"></span> System Ready
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onRunAnalysis(); }}>
          <div className="form-grid">
            {/* 1. Crop Selection */}
            <div className="form-group">
              <label htmlFor="crop-select" className="form-label">
                <span>🌾 Crop</span>
                <span className="label-badge">{selectedCropMeta.category}</span>
              </label>
              <select
                id="crop-select"
                className="form-control form-select"
                value={formData.crop}
                onChange={(e) => handleChange('crop', e.target.value)}
              >
                {Object.keys(CROPS).map((cropKey) => (
                  <option key={cropKey} value={cropKey}>
                    {CROPS[cropKey].icon} {CROPS[cropKey].name}
                  </option>
                ))}
              </select>
              <div className="field-hint">
                Perishability: <strong>{selectedCropMeta.perishabilityRating}</strong> • Standard Mandi Rate: <strong>₹{selectedCropMeta.standardRatePerKg}/kg</strong>
              </div>
            </div>

            {/* 2. Quantity */}
            <div className="form-group">
              <label htmlFor="quantity-input" className="form-label">
                <span>⚖️ Quantity</span>
                <span className="label-badge">{selectedCropMeta.packagingUnit}</span>
              </label>
              <div className="input-with-unit">
                <input
                  id="quantity-input"
                  type="number"
                  min="50"
                  max="20000"
                  step="50"
                  className="form-control"
                  value={formData.quantityKg}
                  onChange={(e) => handleChange('quantityKg', Number(e.target.value))}
                  required
                />
                <span className="input-unit-tag">kg</span>
              </div>
              <div className="field-hint">
                Equivalent to ~{Math.round(formData.quantityKg / 25)} standard farm crates
              </div>
            </div>

            {/* 3. Location */}
            <div className="form-group">
              <label htmlFor="location-select" className="form-label">
                <span>📍 Location</span>
                <span className="label-badge">Karnataka Hub</span>
              </label>
              <select
                id="location-select"
                className="form-control form-select"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    📍 {loc} District
                  </option>
                ))}
              </select>
              <div className="field-hint">
                Connects to local APMC mandis & cold logistics network
              </div>
            </div>

            {/* 4. Harvest Date / Timing */}
            <div className="form-group">
              <label htmlFor="harvest-timing" className="form-label">
                <span>📅 Harvest Date</span>
                <span className="label-badge">Urgency Factor</span>
              </label>
              <select
                id="harvest-timing"
                className="form-control form-select"
                value={formData.harvestTiming}
                onChange={(e) => handleChange('harvestTiming', e.target.value)}
              >
                <option value="Ready Today">Ready Today (Immediate Action)</option>
                <option value="In 2 Days">In 2 Days (Harvesting Soon)</option>
                <option value="In 5 Days">In 5 Days (Upcoming Harvest)</option>
              </select>
              <div className="field-hint">
                Determines transit buffer before shelf-life deterioration
              </div>
            </div>

            {/* 5. Storage Available */}
            <div className="form-group">
              <label className="form-label">
                <span>🏪 Storage Available?</span>
                <span className="label-badge">Cold / Dry Godown</span>
              </label>
              <div className="toggle-group">
                <button
                  type="button"
                  className={`toggle-option ${formData.storageAvailable ? 'active' : ''}`}
                  onClick={() => handleChange('storageAvailable', true)}
                >
                  ✓ Yes (Evaluate Facilities)
                </button>
                <button
                  type="button"
                  className={`toggle-option ${!formData.storageAvailable ? 'active' : ''}`}
                  onClick={() => handleChange('storageAvailable', false)}
                >
                  ✕ No (Direct Liquidation)
                </button>
              </div>
              <div className="field-hint">
                When enabled, Storage Agent calculates daily ROI break-even
              </div>
            </div>

            {/* 6. Strategic Preference */}
            <div className="form-group">
              <label htmlFor="priority-select" className="form-label">
                <span>🎯 Strategic Goal</span>
                <span className="label-badge">Decision Weight</span>
              </label>
              <select
                id="priority-select"
                className="form-control form-select"
                value={formData.priority || 'balanced'}
                onChange={(e) => handleChange('priority', e.target.value)}
              >
                <option value="balanced">Balanced (Optimal Profit vs Risk)</option>
                <option value="maximize_profit">Maximize Profit (Tolerate longer distance)</option>
                <option value="minimize_risk">Minimize Risk (Fast local clearance)</option>
              </select>
              <div className="field-hint">
                Guides Negotiation Agent during multi-buyer arbitration
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="form-actions">
            <button
              type="submit"
              className="btn-analyze"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <span className="spinner-icon"></span>
                  <span>Agents Communicating...</span>
                </>
              ) : (
                <>
                  <span>⚡ RUN MULTI-AGENT ANALYSIS</span>
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Feature Value Props footer cards */}
      <div className="value-props-grid">
        <div className="value-prop-card">
          <div className="vp-icon">🌾</div>
          <div className="vp-title">Crop Biological Analysis</div>
          <div className="vp-text">Calculates daily spoilage curves and moisture vulnerability.</div>
        </div>
        <div className="value-prop-card">
          <div className="vp-icon">🌦️</div>
          <div className="vp-title">Hyperlocal Weather Risk</div>
          <div className="vp-text">Monitors 72-hour rain probability to prevent farmgate rots.</div>
        </div>
        <div className="value-prop-card">
          <div className="vp-icon">🤝</div>
          <div className="vp-title">True Net-Margin Arbitration</div>
          <div className="vp-text">Subtracts freight & storage to find real take-home cash.</div>
        </div>
      </div>
    </div>
  );
}
