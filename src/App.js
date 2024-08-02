import React, { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async () => {
    try {
        const parsedInput = JSON.parse(input);
        console.log(parsedInput)
        const res = await axios.post('https://bajaj-shash.onrender.com/bfhl', parsedInput);
        setResponse(res.data);
    } catch (error) {
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
      <div key={filter}>
        <h3>{filter}</h3>
        <pre>{JSON.stringify(dataToDisplay[filter], null, 2)}</pre>
      </div>
    ));
  };

  return (
    <div>
      <h1>Sahajdeep_Singh_11022003</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON here, e.g., { "data": ["M", "1", "334", "4", "B"] }'
        rows="5"
        cols="50"
      />
      <button onClick={handleSubmit}>Submit</button>
      <select
        multiple
        value={selectedFilters}
        onChange={(e) =>
          setSelectedFilters([...e.target.selectedOptions].map((o) => o.value))
        }
      >
        <option value="Numbers">Numbers</option>
        <option value="Alphabets">Alphabets</option>
        <option value="Highest Alphabet">Highest Alphabet</option>
      </select>
      {renderResponse()}
    </div>
  );
}

export default App;
