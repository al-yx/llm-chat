import { useState, useEffect, useRef } from "react";
import services from "../../services/chatApi";

import "./ChatPage.css";

const ChatPage = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatHistoryRef = useRef(null);

  const init = async () => {
    const models = await services.getModels();
    setModels(models);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  const handleModelClick = (model) => {
    setSelectedModel(model);
  };

  const handleChatSubmit = async () => {
    if (selectedModel && chat) {
      // Add user message to the chat history
      setMessages([...messages, { text: chat, sender: "user" }]);

      // loader
      setLoading(true);

      // Fetching response from the model you selected
      try {
        const response = await services.streamAnswer(selectedModel, chat);
        setMessages([
          ...messages,
          { text: chat, sender: "user" },
          { text: response, sender: "model" },
        ]);
      } catch (error) {
        console.error("Error fetching response:", error);
        setMessages([
          ...messages,
          { text: chat, sender: "user" },
          { text: "Error fetching response", sender: "model" },
        ]);
      } finally {
        // End loader
        setLoading(false);
      }

      // Clear the chat after the response
      setChat("");
    }
  };

  return (
    <div className="chat-container">
      <div className="models">
        {models.map((model) => (
          <div
            key={model}
            className={`avatar ${selectedModel === model ? "selected" : ""}`}
            onClick={() => handleModelClick(model)}
          >
            {model}
          </div>
        ))}
      </div>
      <div className="chat-interface">
        <div className="chat-history" ref={chatHistoryRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        {loading && <div className="spinner"></div>}
        <div className="display-flex">
          <input
            type="text"
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            placeholder="Type your question"
          />
          <button onClick={handleChatSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
