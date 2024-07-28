import React, { useState, useEffect } from 'react';
import '../styles/OptimizerPage.css';
import NotificationIcon from '../notification.png';
import SettingsIcon from '../settings.png';

const OptimizerPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    if (isOptimizing && currentStep < 3) {
      const interval = setInterval(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isOptimizing, currentStep]);

  const handleOptimizeClick = () => {
    setIsOptimizing(true);
  };

  return (
    <div className="optimizer-container">
      <div className="top-bar">
        <button className="top-bar-item">
          <img src={NotificationIcon} alt="Notifications" className="top-bar-icon" />
          <span className="top-bar-text">Notifications</span>
        </button>
        <button className="top-bar-item">
          <img src={SettingsIcon} alt="Settings" className="top-bar-icon" />
          <span className="top-bar-text">Settings</span>
        </button>
      </div>
      <div className="main-content">
        <h1 className="welcome-message">Welcome to Performance Optimizer</h1>
        <p className="description">Start Optimizing your PC.</p>
        <div className="steps-container">
          <div className={`step ${currentStep >= 1 ? 'completed' : ''}`}>
            <div className={`step-circle ${currentStep >= 1 ? 'completed' : ''}`}></div>
            <div className="step-description">
              <h3>1 Step</h3>
              <p>Improve PC's Performance</p>
              <p className="status completed">{currentStep > 1 ? 'Completed' : currentStep === 1 ? 'Completed' : ''}</p>
            </div>
          </div>
          <div className={`step ${currentStep >= 2 ? 'completed' : ''}`}>
            <div className={`step-circle ${currentStep >= 2 ? 'completed' : ''}`}></div>
            <div className="step-description">
              <h3>2 Step</h3>
              <p>Speed up start time</p>
              <p className="status completed">{currentStep > 2 ? 'Completed' : currentStep === 2 ? 'Completed' : ''}</p>
            </div>
          </div>
          <div className={`step ${currentStep === 3 ? 'completed' : ''}`}>
            <div className={`step-circle ${currentStep === 3 ? 'completed' : 'in-progress'}`}></div>
            <div className="step-description">
              <h3>3 Step</h3>
              <p>Boost battery health and life</p>
              <p className="status in-progress">{currentStep === 3 ? 'In Progress' : ''}</p>
            </div>
          </div>
        </div>
        <button 
          className={`optimize-button ${isOptimizing ? 'disabled' : ''}`} 
          onClick={handleOptimizeClick}
          disabled={isOptimizing}
        >
          Optimize Now
        </button>
      </div>
    </div>
  );
};

export default OptimizerPage;
