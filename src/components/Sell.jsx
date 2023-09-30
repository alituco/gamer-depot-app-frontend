import React from 'react'
import ChooseSpecs from './ChooseSpecs'
import './Sell.css'
import ChooseItem from './ChooseItem'

const Sell = () => {
  return (
    <div className='sell-page'>
        <span className='sell-page-sell-text'> Sell </span>
        <div className='sell-page-inner-element'>
            <ChooseItem />
        </div>
    </div>
  )
}

export default Sell
