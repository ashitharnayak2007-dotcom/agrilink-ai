import React, { useState } from 'react';
import { AGENT_PIPELINE_STAGES } from '../agents/orchestrator';

export default function AgentPipelineTracker({
  currentStageIndex,
  completedAgents,
  traces,
  isAnalyzing,
  onGoToRecommendation
}) {
  const [selectedAgentId, setSelectedAgentId] = useState('decision-agent');
  const [showTraceFeed, setShowTraceFeed] = useState(true);

  // Map each stage to current status
  const getStageStatus = (index) => {
    if (index < currentStageIndex) return 'COMPLETED';
    if (index === currentStageIndex) return isAnalyzing ? 'ANALYZING' : 'COMPLETED';
    return 'WAITING';
  };

  const selectedAgentResult = completedAgents.find(a => a.agentId === selectedAgentId) || completedAgents[completedAgents.length - 1];

  return (
    <div className="pipeline-tracker-container">
      {/* Top Banner */}
      <div className="pipeline-header-card">
        <div className="pipeline-title-group">
          <div className="robot-icon-wrap">🤖</div>
          <div>
            <h2 className="pipeline-main-title">Autonomous Multi-Agent Swarm Execution</h2>
            <p className="pipeline-subtitle">
              The Orchestrator coordinates 7 specialized agents. Each agent analyzes live parameters and hands off insights down the decision chain.
            </p>
          </div>
        </div>

        <div className="pipeline-status-badge">
          {isAnalyzing ? (
            <div className="badge-running">
              <span className="spinner-dots"></span>
              <span>Pipeline Active • Stage {currentStageIndex + 1} of {AGENT_PIPELINE_STAGES.length}</span>
            </div>
          ) : (
            <div className="badge-all-done">
              <span className="check-done-icon">✓</span>
              <span>All 8 Agent Tasks Completed</span>
            </div>
          )}
        </div>
      </div>

      <div className="pipeline-layout-grid">
        {/* Left Column: The Status Dashboard (as specified in prompt) */}
        <div className="pipeline-stages-card">
          <div className="stages-card-header">
            <h3 className="section-heading">🤖 AI AGENTS STATUS</h3>
            <span className="live-clock">{new Date().toLocaleTimeString()}</span>
          </div>

          <div className="agent-status-list">
            {AGENT_PIPELINE_STAGES.map((stage, idx) => {
              const status = getStageStatus(idx);
              const agentResult = completedAgents.find(a => a.agentId === stage.id);
              const isSelected = selectedAgentId === stage.id;

              return (
                <div
                  key={stage.id}
                  className={`agent-status-row status-${status.toLowerCase()} ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    if (agentResult) setSelectedAgentId(stage.id);
                  }}
                >
                  <div className="agent-info-left">
                    <span className="stage-symbol">
                      {status === 'COMPLETED' && <span className="sym-check">✓</span>}
                      {status === 'ANALYZING' && <span className="sym-spinner">⟳</span>}
                      {status === 'WAITING' && <span className="sym-wait">○</span>}
                    </span>
                    <span className="stage-icon">{stage.icon}</span>
                    <div>
                      <div className="stage-name">{stage.name}</div>
                      <div className="stage-role-hint">{stage.role}</div>
                    </div>
                  </div>

                  <div className="agent-status-right">
                    <span className={`status-pill pill-${status.toLowerCase()}`}>
                      {status === 'COMPLETED' && 'Completed'}
                      {status === 'ANALYZING' && 'Analyzing...'}
                      {status === 'WAITING' && 'Waiting'}
                    </span>
                    {agentResult && (
                      <span className="inspect-arrow">›</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action button to jump to final recommendation */}
          {!isAnalyzing && (
            <div className="pipeline-action-footer">
              <button
                type="button"
                className="btn-view-recommendation"
                onClick={onGoToRecommendation}
              >
                <span>View Final Strategy Recommendation</span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Active Agent Thoughts & Live Communication Trace */}
        <div className="pipeline-details-card">
          <div className="details-tab-nav">
            <button
              type="button"
              className={`detail-tab-btn ${!showTraceFeed ? 'active' : ''}`}
              onClick={() => setShowTraceFeed(false)}
            >
              🧠 Agent Reasoning & Telemetry
            </button>
            <button
              type="button"
              className={`detail-tab-btn ${showTraceFeed ? 'active' : ''}`}
              onClick={() => setShowTraceFeed(true)}
            >
              📡 Inter-Agent Communication Bus ({traces.length})
            </button>
          </div>

          <div className="details-content-body">
            {!showTraceFeed && selectedAgentResult ? (
              <div className="agent-telemetry-view">
                <div className="telemetry-header">
                  <span className="telemetry-icon">{selectedAgentResult.icon}</span>
                  <div>
                    <h4 className="telemetry-title">{selectedAgentResult.agentName}</h4>
                    <span className="telemetry-ts">Processed at {selectedAgentResult.timestamp}</span>
                  </div>
                </div>

                <div className="telemetry-summary-box">
                  <strong>Summary: </strong> {selectedAgentResult.summary}
                </div>

                <div className="thoughts-container">
                  <div className="thoughts-title">Inner Thoughts & Decision Chain:</div>
                  <ul className="thoughts-list">
                    {selectedAgentResult.thoughts?.map((thought, i) => (
                      <li key={i} className="thought-item">
                        <span className="thought-bullet">💭</span>
                        <span>{thought}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="payload-inspect-box">
                  <div className="payload-title">Agent Data Payload:</div>
                  <pre className="payload-json">
                    {JSON.stringify(selectedAgentResult.data, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="trace-feed-view">
                <div className="trace-list">
                  {traces.map((trace) => (
                    <div key={trace.id} className="trace-card">
                      <div className="trace-meta">
                        <span className="trace-route">
                          <strong>{trace.source}</strong> ➔ <strong>{trace.target}</strong>
                        </span>
                        <span className="trace-time">{trace.timestamp}</span>
                      </div>
                      <div className="trace-msg">{trace.message}</div>
                      {trace.payload && (
                        <div className="trace-subtag">
                          Payload attached: {Object.keys(trace.payload).slice(0, 4).join(', ')}...
                        </div>
                      )}
                    </div>
                  ))}
                  {isAnalyzing && (
                    <div className="trace-streaming-indicator">
                      <span className="pulse-ping"></span>
                      <span>Listening for next agent message packet...</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
