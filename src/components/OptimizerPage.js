import React, { useState, useEffect } from 'react';
import '../styles/OptimizerPage.css';
import NotificationIcon from '../notification.png';
import SettingsIcon from '../settings.png';
import TickIcon from '../tick-mark.png';

const { ipcRenderer } = window.require('electron');

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
    setCurrentStep(1);
  };

  useEffect(() => {
    if (currentStep === 3) {
      
      ipcRenderer.invoke('clean-temp-files').then(() => {
        console.log('Temporary files cleaned');
      }).catch((error) => {
        console.error('Error cleaning temporary files:', error);
      });
    }
  }, [currentStep]);

  if (currentStep === 3) {
    return (
      <div className="optimizer-container-1">
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
          <h1 className="welcome-message">Optimization Completed.</h1>
          <p className="description">Your Computer has been successfully optimized! Feel free to resume your work.</p>
          <img src={TickIcon} alt='tick' className="tick-icon" />
          <div className="main-buttons-1">
            <button className="learn-more-button">Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

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
        <p className="description">Click on the "Optimize Now" button to start the process of optimizing your computer and improving its performance.</p>
        <div className="steps-container">
          <div className={`step ${currentStep >= 1 ? 'completed' : ''}`}>
            <div className={`step-circle ${currentStep >= 1 ? 'completed' : currentStep === 1 ? 'in-progress' : ''}`}></div>
            <div className="step-description">
              <h3>1 Step</h3>
              <p>Improve PC's Performance</p>
              <p className={`status ${currentStep === 1 ? 'in-progress' : currentStep > 1 ? 'completed' : ''}`}>
                {currentStep > 1 ? 'Completed' : currentStep === 1 ? 'In Progress' : ''}
              </p>
            </div>
          </div>
          <div className={`step ${currentStep >= 2 ? 'completed' : ''}`}>
            <div className={`step-circle ${currentStep >= 2 ? 'completed' : currentStep === 2 ? 'in-progress' : ''}`}></div>
            <div className="step-description">
              <h3>2 Step</h3>
              <p>Speed up system's starting time</p>
              <p className={`status ${currentStep === 2 ? 'in-progress' : currentStep > 2 ? 'completed' : ''}`}>
                {currentStep > 2 ? 'Completed' : currentStep === 2 ? 'In Progress' : ''}
              </p>
            </div>
          </div>
          <div className={`step ${currentStep === 3 ? 'completed' : ''}`}>
            <div className={`step-circle ${currentStep === 3 ? 'completed' : ''}`}></div>
            <div className="step-description">
              <h3>3 Step</h3>
              <p>Boost and Increase PC's health and lifespan.</p>
              <p className={`status ${currentStep === 3 ? 'in-progress' : ''}`}>
                {currentStep === 3 ? 'In Progress' : ''}
              </p>
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
