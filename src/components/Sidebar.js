import React from 'react';
import '../styles/Sidebar.css'; 
import sidebarLogo from '../disk_logo.png'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={sidebarLogo} alt="Sidebar Logo" className="sidebar-logo" />
        <div className="separator"></div> 
      </div>
      <ul>
        <li className="sidebar-item">
          <span className="icon">🏠</span> Home
        </li>
        <li className="sidebar-item">
          <span className="icon">⚙️</span> Optimizer
        </li>
        <li className="sidebar-item">
          <span className="icon">⬆️</span> Upgrade
        </li>
        <li className="sidebar-item">
          <span className="icon">🧹</span> Autoclean
        </li>
        <li className="sidebar-item">
          <span className="icon">🔒</span> Privacy
        </li>
        <li className="sidebar-item">
          <span className="icon">❓</span> Help
        </li>
        <li className="sidebar-item">
          <span className="icon">👤</span> Account
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
