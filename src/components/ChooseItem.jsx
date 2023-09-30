import React, { useState, useEffect } from 'react';
import './ChooseItem.css';
import ChooseSpecs from './ChooseSpecs';

import gpuIcon from '../gpu-icon.jpg';
import cpuIcon from '../cpu-icon.png';
import ramIcon from '../ram-icon.jpg';

const ChooseItem = () => {
  const [selectedPart, setSelectedPart] = useState('graphics-card');

  useEffect(() => {
    // TODO: Add useEffect logic if needed
  }, [selectedPart]);

  const changePart = (event) => {
    setSelectedPart(event.target.name);
  };

  const components = [
    { name: 'graphics-card', icon: gpuIcon, label: 'Graphics Card' },
    { name: 'processor', icon: cpuIcon, label: 'Processor' },
    { name: 'memory', icon: ramIcon, label: 'Memory' }
  ];

  return (
    <div className='choose-item-container'>
      <span className='choose-item-text'>Choose component</span>
      <div className='choose-component-button-container'>
        {components.map(component => (
          <button key={component.name} onClick={changePart} name={component.name} className='component-button'>
            <span>
              <img name={component.name} src={component.icon} className='choose-component-icon' alt={component.label} />
            </span>
            <a className='choose-item-label' name={component.name}>{component.label}</a>
          </button>
        ))}
      </div>
      <ChooseSpecs selectedPart={selectedPart} />
    </div>
  );
}

export default ChooseItem;
