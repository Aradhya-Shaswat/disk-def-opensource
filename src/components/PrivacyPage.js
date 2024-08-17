import React from 'react';
import '../styles/PrivacyPage.css';
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

const PrivacyPage = () => (
  <div>
    <TopBar />
  </div>
);

export default PrivacyPage;
