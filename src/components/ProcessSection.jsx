import React from 'react'


const ProcessSection = () => {
  return (
    <div className='process-section'>
        <div className='process-container'>
          <div className='process-title'>How it Works</div>
          <div className='process-steps'>
            <div className='step'>
              <div className='step-icon'>1</div>
              <div className='step-desc'>Select your component and add it to your selling cart.</div>
            </div>
            <div className='step'>
              <div className='step-icon'>2</div>
              <div className='step-desc'>Place your order. We'll contact you via WhatsApp to confirm.</div>
            </div>
            <div className='step'>
              <div className='step-icon'>3</div>
              <div className='step-desc'>Your GPU will be picked up from your location within 48 hours.</div>
            </div>
            <div className='step'>
              <div className='step-icon'>4</div>
              <div className='step-desc'>After testing, you'll receive your payment via Benefit Pay (Zelle).</div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ProcessSection
