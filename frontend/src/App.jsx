import React, { useState } from 'react';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import Rankings from './components/Rankings';
import Header from './components/layout/Header';
import TabNavigation from './components/layout/TabNavigation';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('analyze');

  return (
    <div className="app">
      <Header />

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="app-main">
        {activeTab === 'analyze' ? <ResumeAnalyzer /> : <Rankings />}
      </main>
    </div>
  );
}

export default App;
