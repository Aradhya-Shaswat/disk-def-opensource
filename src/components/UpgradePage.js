import React from 'react';
import '../styles/UpgradePage.css';
import NotificationIcon from '../notification.png';
import SettingsIcon from '../settings.png';

const TopBar = () => (
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
);

const UpgradePage = () => (
  <div className="upgrade-page">
    <TopBar />
    <div className="upgrade-container">
      <h1 className="upgrade-title">Our Premium Plan</h1>
      <p className="upgrade-description">
        Upgrade to disk defender professional to fix your PC issues automatically
      </p>
      <div className="plans-container">
        <div className="plan basic">
          <h2>$25 <span className="per-month">Per/month</span></h2>
          <h3>Basic</h3>
          <ul>
            <li>Lorem ipsum dolor</li>
            <li>sit amet</li>
          </ul>
          <button className="upgrade-button">Upgrade</button>
        </div>
        <div className="plan standard">
          <h2>$70 <span className="per-month">Per/month</span></h2>
          <h3>Standard <span className="popular-badge">Popular</span></h3>
          <ul>
            <li>Lorem ipsum dolor</li>
            <li>Ipsum dolor</li>
            <li>Amet ipsum dolor</li>
          </ul>
          <button className="upgrade-button">Upgrade</button>
        </div>
        <div className="plan professional">
          <h2>$110 <span className="per-month">Per/month</span></h2>
          <h3>Professional</h3>
          <ul>
            <li>Lorem ipsum dolor</li>
            <li>Sit amet</li>
            <li>Lorem ipsum dolor</li>
            <li>Sit amet</li>
          </ul>
          <button className="upgrade-button">Upgrade</button>
        </div>
      </div>
    </div>
  </div>
);

export default UpgradePage;
