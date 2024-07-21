import React, { useState } from 'react';
import '../styles/Sidebar.css'; 
import sidebarLogo from '../disk_logo.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCogs, faArrowUp, faBroom, faLock, faQuestionCircle, faUser } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const handleClick = (index) => {
    setSelected(index);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={sidebarLogo} alt="Sidebar Logo" className="sidebar-logo" />
        <div className="separator"></div> 
      </div>
      <ul>
        <li 
          className={`sidebar-item ${selected === 0 ? 'selected' : ''}`}
          onClick={() => handleClick(0)}
        >
          <FontAwesomeIcon icon={faHome} className="icon" />
          Home
        </li>
        <li 
          className={`sidebar-item ${selected === 1 ? 'selected' : ''}`}
          onClick={() => handleClick(1)}
        >
          <FontAwesomeIcon icon={faCogs} className="icon" />
          Optimizer
        </li>
        <li 
          className={`sidebar-item ${selected === 2 ? 'selected' : ''}`}
          onClick={() => handleClick(2)}
        >
          <FontAwesomeIcon icon={faArrowUp} className="icon" />
          Upgrade
        </li>
        <li 
          className={`sidebar-item ${selected === 3 ? 'selected' : ''}`}
          onClick={() => handleClick(3)}
        >
          <FontAwesomeIcon icon={faBroom} className="icon" />
          Autoclean
        </li>
        <li 
          className={`sidebar-item ${selected === 4 ? 'selected' : ''}`}
          onClick={() => handleClick(4)}
        >
          <FontAwesomeIcon icon={faLock} className="icon" />
          Privacy
        </li>
        <li 
          className={`sidebar-item ${selected === 5 ? 'selected' : ''}`}
          onClick={() => handleClick(5)}
        >
          <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
          Help
        </li>
        <li 
          className={`sidebar-item ${selected === 6 ? 'selected' : ''}`}
          onClick={() => handleClick(6)}
        >
          <FontAwesomeIcon icon={faUser} className="icon" />
          Account
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
