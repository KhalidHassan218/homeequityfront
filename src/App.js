import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
function App() {
  const [startValue, setStartValue] = useState(350000);
  const [startDate, setStartDate] = useState('2018KW02');
  const [currentDate, setCurrentDate] = useState('2023KW01');
  const [region, setRegion] = useState('GM0363');
  const [currentHomeValue, setCurrentHomeValue] = useState(null);

  const handleCalculate = () => {
    const data = {
      start_value: startValue,
      start_date: startDate,
      current_date: currentDate,
      region: region,
    };

    axios.post('https://home-equity.adaptable.app/calculate_home_value', data)
      .then(response => {
        setCurrentHomeValue(response.data.current_home_value);
      })
      .catch(error => {
        console.error('Error calculating home value:', error);
      });
  };

  return (
    <div>
      <input type="number" value={startValue} onChange={(e) => setStartValue(parseFloat(e.target.value))} />
      <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="text" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} />
      <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
      <button onClick={handleCalculate}>Calculate Home Value</button>
      {currentHomeValue !== null && <div>Current home value: {currentHomeValue} Euros</div>}
    </div>
  );
}

export default App;
