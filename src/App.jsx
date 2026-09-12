import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FarmerInputForm from './components/FarmerInputForm';
import AgentPipelineTracker from './components/AgentPipelineTracker';
import RecommendationDashboard from './components/RecommendationDashboard';
import ArchitectureGraph from './components/ArchitectureGraph';
import { runOrchestratorPipeline } from './agents/orchestrator';
import { DEMO_PRESETS } from './data/agriculturalData';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('input'); // 'input' | 'agents' | 'recommendation' | 'architecture'
  const [formData, setFormData] = useState({
    crop: 'Tomato',
    quantityKg: 500,
    location: 'Shivamogga',
    harvestTiming: 'Ready Today',
    storageAvailable: true,
    priority: 'balanced'
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [completedAgents, setCompletedAgents] = useState([]);
  const [traces, setTraces] = useState([]);
  const [decisionData, setDecisionData] = useState(null);

  const [colabUrl, setColabUrlState] = useState(() => localStorage.getItem('agrilink_colab_url') || '');

  const setColabUrl = (url) => {
    setColabUrlState(url);
    if (url) {
      localStorage.setItem('agrilink_colab_url', url);
    } else {
      localStorage.removeItem('agrilink_colab_url');
    }
  };

  // Execute the multi-agent pipeline
  const executeAnalysis = async (inputToUse = formData) => {
    setIsAnalyzing(true);
    setCurrentStageIndex(0);
    setCompletedAgents([]);
    setTraces([]);
    setActiveTab('agents');

    try {
      const result = await runOrchestratorPipeline(
        inputToUse,
        (stageIndex, agentResult, updatedTraces) => {
          setCurrentStageIndex(stageIndex);
          setCompletedAgents(prev => {
            const filtered = prev.filter(a => a.agentId !== agentResult.agentId);
            return [...filtered, agentResult];
          });
          setTraces(updatedTraces);
        },
        700, // smooth pacing for presentation
        colabUrl // pass configured Google Colab backend URL
      );

      setDecisionData(result.insights.decision.data);
      setIsAnalyzing(false);
      // Automatically transition to recommendation after brief pause for impact
      setTimeout(() => {
        setActiveTab('recommendation');
      }, 1200);
    } catch (err) {
      console.error('Pipeline error:', err);
      setIsAnalyzing(false);
    }
  };

  const handleSelectPreset = (preset) => {
    setFormData(preset.input);
    executeAnalysis(preset.input);
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectPreset={handleSelectPreset}
        presets={DEMO_PRESETS}
        colabUrl={colabUrl}
        setColabUrl={setColabUrl}
      />

      {/* Main View Router */}
      <main className="main-content">
        {activeTab === 'input' && (
          <FarmerInputForm
            formData={formData}
            setFormData={setFormData}
            onRunAnalysis={() => executeAnalysis(formData)}
            isAnalyzing={isAnalyzing}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {activeTab === 'agents' && (
          <AgentPipelineTracker
            currentStageIndex={currentStageIndex}
            completedAgents={completedAgents}
            traces={traces}
            isAnalyzing={isAnalyzing}
            onGoToRecommendation={() => setActiveTab('recommendation')}
          />
        )}

        {activeTab === 'recommendation' && (
          <RecommendationDashboard
            decisionData={decisionData}
            farmerInput={formData}
            onModifyInputs={() => setActiveTab('input')}
            onViewArchitecture={() => setActiveTab('architecture')}
          />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureGraph
            onStartRun={() => executeAnalysis(formData)}
          />
        )}
      </main>

      {/* Persistent Bottom Status Bar */}
      <footer className="footer-status-bar">
        <div className="footer-left">
          <span className="dot-active"></span>
          <span><strong>AgriLink AI</strong> • Autonomous Multi-Agent Decision System for Smallholder Farmers</span>
        </div>
        <div className="footer-center">
          Active Agents: <strong>Crop • Weather • Market • Storage • Logistics • Negotiation • Decision</strong>
        </div>
        <div className="footer-right">
          <span>Karnataka Mandi Feed: <strong>Connected</strong></span>
        </div>
      </footer>
    </div>
  );
}

export default App;
