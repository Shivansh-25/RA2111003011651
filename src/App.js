import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState(`{
    "data": ["M", "1", "334", "4", "B", "Z", "a"]
  }`);
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [instructionMessage, setInstructionMessage] = useState("");

  const handleSubmit = async () => {
    setStatusMessage("Sending request...");
    setInstructionMessage(""); // Clear the instruction message when submitting
    try {
      // Parse the JSON input from the textarea
      const parsedInput = JSON.parse(input);

      // Log the final payload to check if it's correct
      console.log("Final payload being sent:", parsedInput);

      // Send the POST request with the payload
      const res = await axios.post(
        "https://bajaj-shash.onrender.com/bfhl",
        parsedInput
      );
      setResponse(res.data);
      setStatusMessage("Response received successfully.");
      if (selectedFilters.length === 0) {
        setInstructionMessage("Please select the filters to view data.");
      }
    } catch (error) {
      setStatusMessage(
        "Error occurred while sending the request. Check if JSON is valid."
      );
      console.error("Error details:", error);
    }
  };

  // Render the response based on selected filters
  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    const dataToDisplay = {
      Numbers: numbers,
      Alphabets: alphabets,
      "Highest Lowercase Alphabet": highest_lowercase_alphabet,
    };

    return selectedFilters.map((filter) => (
      <div key={filter} className="response-section">
        <h3 className="response-header">{filter}</h3>
        <pre className="response-data">
          {JSON.stringify(dataToDisplay[filter], null, 2)}
        </pre>
      </div>
    ));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">RA2111003011651</h1>
      <textarea
        className="input-textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`{
  "data": ["M", "1", "334", "4", "B", "Z", "a"]
}`}
        rows="5"
        cols="50"
      />
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      <select
        className="filter-select"
        multiple
        value={selectedFilters}
        onChange={(e) => {
          const options = [...e.target.selectedOptions].map((o) => o.value);
          setSelectedFilters(options);
          if (response) {
            setInstructionMessage(
              options.length ? "" : "Please select the filters to view data."
            );
          }
        }}
      >
        <option value="Numbers">Numbers</option>
        <option value="Alphabets">Alphabets</option>
        <option value="Highest Lowercase Alphabet">
          Highest Lowercase Alphabet
        </option>
      </select>
      <p className="status-message">{statusMessage}</p>
      <p className="instruction-message">{instructionMessage}</p>
      {renderResponse()}
    </div>
  );
}

export default App;
