import React, { useState } from 'react';

function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unitWeight, setUnitWeight] = useState('kg');
  const [unitHeight, setUnitHeight] = useState('cm');
  const [bmi, setBMI] = useState(null);
  const [message, setMessage] = useState('');

  const calculateBMI = () => {
    const weightInKg = convertWeightToKg(parseFloat(weight), unitWeight);
    const heightInMeters = calculateHeightInMeters();

    if (isNaN(weightInKg) || isNaN(heightInMeters) || weightInKg <= 0 || heightInMeters <= 0) {
      setMessage('Please enter valid weight and height.');
    } else {
      const bmiValue = (weightInKg / (heightInMeters ** 2)).toFixed(1);
      setBMI(bmiValue);

      if (bmiValue < 18.5) {
        setMessage('You are underweight');
      } else if (bmiValue < 24.9) {
        setMessage('You are a healthy weight');
      } else if (bmiValue < 29.9){
        setMessage('You are overweight');
      } else{
        setMessage('You are in obesity')
      }
    }
  };
  const convertWeightToKg = (weight, unit) => {
    if (unit === 'lb') {
      // Convert pounds to kilograms
      return weight * 0.453592;
    }
    // If the unit is already 'kg', no conversion is needed
    return weight;
  };
  const calculateHeightInMeters = () => {
    switch (unitHeight) {
      case 'cm':
        return parseFloat(height) / 100;
      case 'm':
        return parseFloat(height);
      case 'ft':
        return parseFloat(height) * 0.3048;
      case 'in':
        return parseFloat(height) * 0.0254;
      default:
        return 0;
    }
  };

  const resetForm = () => {
    setWeight('');
    setHeight('');
    setBMI(null);
    setMessage('');
  };

  return (
    <div className="app">
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <div>
          <label>
            Weight:{' '}
            <select onChange={(e) => setUnitWeight(e.target.value)} value={unitWeight}>
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Height:{' '}
            <select onChange={(e) => setUnitHeight(e.target.value)} value={unitHeight}>
              <option value="cm">cm</option>
              <option value="m">m</option>
              <option value="ft">ft</option>
              <option value="in">in</option>
            </select>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
        </div>
        <button className='btn' type='submit' onClick={calculateBMI}>Calculate BMI</button>
        <button className='btn btn-outline' onClick={resetForm} type='reset'>Reset</button>
        <div className='center'>
          {bmi !== null && (
            <p>Your BMI: {bmi}</p>
          )}
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default BMICalculator;