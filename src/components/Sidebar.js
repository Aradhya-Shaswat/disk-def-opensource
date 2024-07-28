import React from 'react';
import '../styles/Sidebar.css';
import sidebarLogo from '../disk_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCogs, faArrowUp, faBroom, faLock, faQuestionCircle, faUser } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const handleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={sidebarLogo} alt="Sidebar Logo" className="sidebar-logo" />
        <div className="separator"></div>
      </div>
      <ul>
        <li
          className={`sidebar-item ${currentPage === 'home' ? 'selected' : ''}`}
          onClick={() => handleClick('home')}
        >
          <div className="nav-link">
            <FontAwesomeIcon icon={faHome} className="icon" />
            Home
          </div>
        </li>
        <li
          className={`sidebar-item ${currentPage === 'optimizer' ? 'selected' : ''}`}
          onClick={() => handleClick('optimizer')}
        >
          <div className="nav-link">
            <FontAwesomeIcon icon={faCogs} className="icon" />
            Optimizer
          </div>
        </li>
        <li
          className={`sidebar-item ${currentPage === 'upgrade' ? 'selected' : ''}`}
          onClick={() => handleClick('upgrade')}
        >
          <div className="nav-link">
            <FontAwesomeIcon icon={faArrowUp} className="icon" />
            Upgrade
          </div>
        </li>
        <li
          className={`sidebar-item ${currentPage === 'autoclean' ? 'selected' : ''}`}
          onClick={() => handleClick('autoclean')}
        >
          <div className="nav-link">
            <FontAwesomeIcon icon={faBroom} className="icon" />
            Autoclean
          </div>
        </li>
        <li
          className={`sidebar-item ${currentPage === 'privacy' ? 'selected' : ''}`}
          onClick={() => handleClick('privacy')}
        >
          <div className="nav-link">
            <FontAwesomeIcon icon={faLock} className="icon" />
            Privacy
          </div>
        </li>
        <li
          className={`sidebar-item ${currentPage === 'help' ? 'selected' : ''}`}
          onClick={() => handleClick('help')}
        >
          <div className="nav-link">
            <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
            Help
          </div>
        </li>
        <li
          className={`sidebar-item ${currentPage === 'account' ? 'selected' : ''}`}
          onClick={() => handleClick('account')}
        >
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
