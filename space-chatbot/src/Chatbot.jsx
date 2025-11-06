import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Rule-based bot logic
  const getBotResponse = (message) => {
    message = message.toLowerCase();
    if (message.includes("planet")) return "There are 8 planets in our Solar System!";
    if (message.includes("moon")) return "The Moon is Earth's only natural satellite.";
    if (message.includes("mars")) return "Mars is called the Red Planet!";
    if (message.includes("black hole")) return "A black hole has gravity so strong that nothing can escape it!";
    if (message.includes("sun")) return "The Sun is a star at the center of our Solar System.";
    return "I am a space chatbot 🌌. Ask me about planets, moons, stars, or black holes!";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    const botMessage = getBotResponse(userMessage);
    setMessages((prev) => [...prev, { sender: "bot", text: botMessage }]);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🚀 Space Chatbot</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#3b82f6" : "#1f2937",
            }}
          >
            <b>{msg.sender === "user" ? "You" : "Bot"}:</b> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask me something about space..."
        />
        <button style={styles.button} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    fontFamily: "Arial, sans-serif",
    color: "#f0f0f0",
  },
  title: {
    textAlign: "center",
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    border: "1px solid #555",
    border
