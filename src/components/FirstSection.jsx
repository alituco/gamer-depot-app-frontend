import React from 'react'
import ChooseItem from './ChooseItem.jsx'
import ProcessSection from './ProcessSection.jsx'
import './FirstSection.css'

const FirstSection = () => {
  return (
    <div className='bigger-container'>
      <div className='big-container'>
        <div className='small-container'>
          <div className='sub-title'>
              Sell your old computer parts in just a <span id='few-clicks'>few clicks</span>.
          </div>
          <ChooseItem />
        </div>
      </div>
      <ProcessSection />
    </div>
  )
}

export default FirstSection
