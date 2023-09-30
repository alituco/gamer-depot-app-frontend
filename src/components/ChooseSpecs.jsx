import React from 'react'
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext.js';
import { auth } from '../Auth/firebase-auth/firebase.js';
import './ChooseSpecs.css';

const ChooseSpecs = (props) => {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

  const [ selectedChipset, setSelectedChipset ] = useState(null);
  const [ selectedSeries, setSelectedSeries ] = useState(null);
  const [ selectedCard, setSelectedCard ] = useState(null);
  const [ series, setSeries ] = useState([]);
  const [ models, setModels ] = useState([]);
  const [ addToCartMessage, setAddToCartMessage ] = useState(``);
  const [ selectedCardPrice, setSelectedCardPrice ] = useState(0);

  const selectedPart = props.selectedPart;


  const { uid } = useContext(AuthContext);
  



  

  function handleGetCardId(e) {
    setSelectedCard(e.target.value);
    setSelectedCardPrice()
  }

  async function handleAddToCardButton() {
    if (!uid || !selectedCard || (selectedCard == "Select...")) {
      console.error("Either the user is not logged in or no GPU has been selected.");
      setAddToCartMessage("Please log in or choose a part to add to your cart.")
      return;
    }
  
    try {
      console.log(`Trying to adding ${selectedCard} to ${uid} cart.`);
      const response = await fetch(`${API_URL}/addToCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: uid,
          model: selectedCard
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setAddToCartMessage(`Added ${selectedCard} to cart at price $${selectedCardPrice} successfully!`);
      } else {
        console.error("Failed to add item to cart.");
      }
  
    } catch (error) {
      setAddToCartMessage("Error. Please contact support @alialtaraif@gmail.com")
      console.error("Error:", error);
    }
  }
  

  
  function selectedPartMenu() {

    //DETERMINGING WHICH SELECT MENU TO DISPLAY
    if(selectedPart === "graphics-card") {
      return (

        <div className='select-box'>
          <div className='select-box-choose'>
              <div className='label-and-button'>
                  <label> CHIPSET </label>
                  <select className='select-dropdown-box' 
                  onChange={(e) => setSelectedChipset(e.target.value)}>
                    <option className='choose-item-label' value={null}> Select... </option>
                    <option value="AMD"> AMD </option>
                    <option value="NVIDIA"> Nvidia</option>
                  </select>
              </div>

              <div className='label-and-button'>
                  <label> SERIES </label>
                  <select className='select-dropdown-box' 
                  onChange={(e) => setSelectedSeries(e.target.value)}>
                    <option className='choose-item-label' value={null}> Select... </option>
                    {series.map((series) => (
                      <option value={series}> {series} </option>
                    ))}
                  </select>
              </div>

              <div className='label-and-button'>
                <label> MODEL </label>
                <select value={selectedCard} onChange={handleGetCardId} className='select-dropdown-box' >
                  <option className='choose-item-label' value={null}> Select... </option>
                  {models.map((model) => (
                    <option value={model}>
                    {model}
                    </option>
                  ))}
                </select>
              </div>
          </div>
              <button onClick={handleAddToCardButton} className='select-box-add-part-to-cart'>
                Add to <span style={{ fontStyle: 'italic' }}>selling</span> cart
              </button>
              <span className='add-to-cart-message'> {addToCartMessage} </span>
        </div>
      )
    } else if (selectedPart === "processor" || selectedPart === "memory") {
      return (
          <div className='coming-soon-container'>
              Feature coming soon.
          </div>
      );
  }
  }

  useEffect(() => {
    if (selectedChipset) {
      // Resetting everytime chipset is changed
      setSeries([]);
      setModels([]);
      fetch(`${API_URL}/api/series?chipset=${selectedChipset}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json(); // Return the promise
        })
        .then((data) => {
          setSeries(data);
        })
        .catch((err) => {
          console.error("error:", err);
        });
    }
  }, [selectedChipset]);

  useEffect(() => {
    if (selectedSeries) {
      setModels([]);
      fetch(`${API_URL}/api/models-by-series?series=${selectedSeries}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setModels(data);
        })
        .catch((err) => {
          console.error("error:", err);
        });
    }
  }, [selectedSeries]);

  useEffect(() => {
    if (selectedCard) {
      fetch(`${API_URL}/api/gpu-id?series=${selectedSeries}&model=${selectedCard}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error");
          }
          return response.json();
        })
        .then((data) => {
          setSelectedCardPrice(data.price);
        })
        .catch((err) => {
          console.log("Error getting price.");
        })
    }
  }, [selectedCard])
  
  
  return (

    <div className='choose-specifications-container'>
      {selectedPartMenu()}
    </div>

  )
}

export default ChooseSpecs;
