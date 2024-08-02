import React, { useState } from "react";
import axios from "axios";
import './App.css'; 

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [instructionMessage, setInstructionMessage] = useState("");

  const handleSubmit = async () => {
    setStatusMessage("Sending request...");
    setInstructionMessage(""); // Clear the instruction message when submitting
    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post('https://bajaj-shash.onrender.com/bfhl', parsedInput);
      setResponse(res.data);
      setStatusMessage("Response received successfully.");
      if (selectedFilters.length === 0) {
        setInstructionMessage("Please select the filters to view data.");
      }
    } catch (error) {
      setStatusMessage("Error occurred while sending the request.");
      console.error(error);
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_alphabet } = response;
    const dataToDisplay = {
      Numbers: numbers,
      Alphabets: alphabets,
      "Highest Alphabet": highest_alphabet,
    };

    return selectedFilters.map((filter) => (
      <div key={filter} className="response-section">
        <h3 className="response-header">{filter}</h3>
        <pre className="response-data">{JSON.stringify(dataToDisplay[filter], null, 2)}</pre>
      </div>
    ));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Sahajdeep_Singh_11022003</h1>
      <textarea
        className="input-textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON here, e.g., { "data": ["M", "1", "334", "4", "B"] }'
        rows="5"
        cols="50"
      />
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
      <select
        className="filter-select"
        multiple
        value={selectedFilters}
        onChange={(e) => {
          const options = [...e.target.selectedOptions].map((o) => o.value);
          setSelectedFilters(options);
          if (response) {
            setInstructionMessage(options.length ? "" : "Please select the filters to view data.");
          }
        }}
      >
        <option value="Numbers">Numbers</option>
        <option value="Alphabets">Alphabets</option>
        <option value="Highest Alphabet">Highest Alphabet</option>
      </select>
      <p className="status-message">{statusMessage}</p>
      <p className="instruction-message">{instructionMessage}</p>
      {renderResponse()}
    </div>
  );
}

export default App;
