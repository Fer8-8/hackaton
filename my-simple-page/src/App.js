import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    // Replace this with your OpenAI API key
    const apiKey = "YOUR_OPENAI_API_KEY";

    const apiURL = "https://api.openai.com/v1/chat/completions";

    try {
      const response = await axios.post(
        apiURL,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system", // You can use 'user' or 'assistant'
              content: inputText,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const gptResponse = response.data.choices[0].message.content;
      setResponseText(gptResponse);
    } catch (error) {
      setResponseText("Error: Could not fetch the response.");
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="App">
      <h1>Chat with GPT</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your message here..."
        rows="5"
        cols="40"
      />
      <br />
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Loading..." : "Send"}
      </button>
      <div className="response">
        <h3>Response:</h3>
        <p>{responseText}</p>
      </div>
    </div>
  );
}

export default App;
