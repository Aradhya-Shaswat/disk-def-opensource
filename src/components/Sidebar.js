import React, { useState } from 'react';
import '../styles/Sidebar.css';
import sidebarLogo from '../disk_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCogs, faArrowUp, faBroom, faLock, faQuestionCircle, faUser } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ setCurrentPage }) => {
  const [selected, setSelected] = useState(0);

  const handleClick = (index, page) => {
    setSelected(index);
    setCurrentPage(page);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={sidebarLogo} alt="Sidebar Logo" className="sidebar-logo" />
        <div className="separator"></div>
      </div>
      <ul>
        <li className={`sidebar-item ${selected === 0 ? 'selected' : ''}`} onClick={() => handleClick(0, 'home')}>
          <div className="nav-link">
            <FontAwesomeIcon icon={faHome} className="icon" />
            Home
          </div>
        </li>
        <li className={`sidebar-item ${selected === 1 ? 'selected' : ''}`} onClick={() => handleClick(1, 'optimizer')}>
          <div className="nav-link">
            <FontAwesomeIcon icon={faCogs} className="icon" />
            Optimizer
          </div>
        </li>
        <li className={`sidebar-item ${selected === 2 ? 'selected' : ''}`} onClick={() => handleClick(2, 'upgrade')}>
          <div className="nav-link">
            <FontAwesomeIcon icon={faArrowUp} className="icon" />
            Upgrade
          </div>
        </li>
        <li className={`sidebar-item ${selected === 3 ? 'selected' : ''}`} onClick={() => handleClick(3, 'autoclean')}>
          <div className="nav-link">
            <FontAwesomeIcon icon={faBroom} className="icon" />
            Autoclean
          </div>
        </li>
        <li className={`sidebar-item ${selected === 4 ? 'selected' : ''}`} onClick={() => handleClick(4, 'privacy')}>
          <div className="nav-link">
            <FontAwesomeIcon icon={faLock} className="icon" />
            Privacy
          </div>
        </li>
        <li className={`sidebar-item ${selected === 5 ? 'selected' : ''}`} onClick={() => handleClick(5, 'help')}>
          <div className="nav-link">
            <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
            Help
          </div>
        </li>
        <li className={`sidebar-item ${selected === 6 ? 'selected' : ''}`} onClick={() => handleClick(6, 'account')}>
          <div className="nav-link">
            <FontAwesomeIcon icon={faUser} className="icon" />
            Account
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
