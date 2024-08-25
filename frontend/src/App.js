import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await fetch('YOUR_BACKEND_API_URL/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedInput)
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      alert('Invalid JSON input');
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(
      selectedOptions.includes(value)
        ? selectedOptions.filter(opt => opt !== value)
        : [...selectedOptions, value]
    );
  };

  const filteredResponse = response ? {
    ...(selectedOptions.includes('Alphabets') && { "alphabets": response.alphabets }),
    ...(selectedOptions.includes('Numbers') && { "numbers": response.numbers }),
    ...(selectedOptions.includes('Highest lowercase alphabet') && { "highest_lowercase_alphabet": response.highest_lowercase_alphabet })
  } : null;

  return (
    <div>
      <h1>21BCE3217</h1>
      <input 
        type="text" 
        value={jsonInput} 
        onChange={(e) => setJsonInput(e.target.value)} 
        placeholder='Enter JSON' 
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <label>
          <input 
            type="checkbox" 
            value="Alphabets" 
            onChange={handleOptionChange} 
          /> Alphabets
        </label>
        <label>
          <input 
            type="checkbox" 
            value="Numbers" 
            onChange={handleOptionChange} 
          /> Numbers
        </label>
        <label>
          <input 
            type="checkbox" 
            value="Highest lowercase alphabet" 
            onChange={handleOptionChange} 
          /> Highest lowercase alphabet
        </label>
      </div>
      <pre>{filteredResponse && JSON.stringify(filteredResponse, null, 2)}</pre>
    </div>
  );
}

export default App;
