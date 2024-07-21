import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
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
